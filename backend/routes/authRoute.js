import { Router } from 'express';
import User from '../models/User.js'; 
import pkg from 'jsonwebtoken';
const { sign } = pkg;  
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
import authTokenHandler from '../middlewares/authMiddleware.js';
dotenv.config();

const router = Router();

// Helper function to set tokens as cookies
const setTokensAsCookies = (res, newAuthToken, newRefreshToken) => {
  const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'None',
  };

  res.cookie('authToken', newAuthToken, { ...cookieOptions, maxAge: 10 * 60 * 1000 }); // 10 minutes
  res.cookie('refreshToken', newRefreshToken, { ...cookieOptions, maxAge: 30 * 60 * 1000 }); // 30 minutes
};

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

router.get('/test', async (req, res) => {
  res.json({
      message: "Auth api is working"
  })
})

function createResponse(ok, message, data) {
  return {
      ok,
      message,
      data,
  };
}

// Register new user
router.post('/signup', async (req, res) => {
  try {
      const { username, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(409).json(createResponse(false, 'Email already exists'));
      }

      const hashedPassword = await bcrypt.hash(password, 10);  // Make sure to hash password
      const newUser = new User({
          username,
          email,
          password: hashedPassword
      });

      await newUser.save();
      res.status(201).json(createResponse(true, 'User registered successfully'));
  }
  catch (err) {
      console.log(err);
      res.status(500).json(createResponse(false, 'Internal server error'));
  }
})

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
      console.log('user not found');
      return res.status(400).json(createResponse(false, 'Invalid credentials'));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
      console.log('password not matched');
      return res.status(400).json(createResponse(false, 'Invalid credentials'));
  }

  const authToken = sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });
  const refreshToken = sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '30m' });
  res.cookie('authToken', authToken,  { httpOnly: true, secure: true, sameSite: 'None' });
  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'None' });

  res.status(200).json(createResponse(true, 'Login successful', {
      authToken,
      refreshToken
  }));
})

router.get('/checklogin', authTokenHandler, async (req, res) => {
  res.json({
      userId: req.userId,
      ok: true,
      message: 'User authenticated successfully'
  })
})

router.get('/logout', authTokenHandler, async (req, res) => {
  res.clearCookie('authToken');
  res.clearCookie('refreshToken');
  res.json({
      ok: true,
      message: 'User logged out successfully'
  })
})

// Google Login Route
router.post('/google-login', async (req, res) => {
  const { tokenId } = req.body; // This is the ID token received from the frontend after Google login

  try {
      // Verify the Google ID token
      const ticket = await client.verifyIdToken({
          idToken: tokenId,
          audience: process.env.GOOGLE_CLIENT_ID,  // Your Google OAuth client ID
      });

      const { email, name, picture } = ticket.getPayload();  // Get user info from the token

      // Check if the user already exists
      let user = await User.findOne({ email });
      if (!user) {
          // If user doesn't exist, create a new one
          user = new User({
              username: name,
              email,
              password: '',  // No password for Google login users
              profilePicture: picture,  // Optionally store Google profile picture
          });

          await user.save();  // Save the new user to the database
      }

      // Generate JWT tokens
      const authToken = sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });
      const refreshToken = sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30m' });

      // Set tokens as cookies
      setTokensAsCookies(res, authToken, refreshToken);

      res.status(200).json({
          message: 'Google login successful',
          user: {
              id: user._id,
              username: user.username,
              email: user.email,
              profilePicture: user.profilePicture,  // Include profile picture
          },
          ok: true,
      });
  } catch (error) {
      res.status(400).json({ message: 'Google login failed', error: error.message, ok: false });
  }
});

export default router;