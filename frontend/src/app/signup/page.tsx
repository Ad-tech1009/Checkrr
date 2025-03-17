"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate input
    if (!username || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    setErrorMessage("");

    try {
      const res = await axios.post("http://localhost:5000/auth/signup", {
        username,
        email,
        password,
      });

      console.log("User created:", res.data);

      // Redirect or take other actions after signup
    } catch (error) {
      console.error("Signup failed", error);
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data?.message || "Server error");
      } else {
        setErrorMessage("Server error");
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const responseGoogle = async (credentialResponse: any) => {
    try {
      const tokenId = credentialResponse.credential;
      const res = await axios.post("http://localhost:5000/auth/google-login", { tokenId });

      console.log("Google login successful:", res.data);

      // Redirect or take other actions after successful login/signup
    } catch (error) {
      console.error("Google signup failed", error);
      setErrorMessage("Google login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Checkrr Logo"
            width={150}
            height={50}
            className="mx-auto mb-4 cursor-pointer"
          />
        </Link>
        <h1 className="text-2xl font-bold text-center mb-4">Signup</h1>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
          >
            Signup
          </button>
        </form>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <GoogleLogin
          onSuccess={responseGoogle}
          onError={() => console.log("Google login failed")}
          useOneTap
          theme="outline"
          shape="pill"
          size="large"
          text="signup_with"
        />
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}