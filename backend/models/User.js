import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  city:{
        type: String,
    },
  contact:{
        type: String,
    },
},{
  timestamps: true
});

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model('User', userSchema);
export default User;