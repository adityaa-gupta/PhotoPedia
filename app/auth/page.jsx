"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "@/hooks/useAuth";
import { toastSuccess, toastError } from "@/utils/toast"; // Ensure you have toastError for error handling
import Image from "next/image";

const Auth = () => {
  const { signUp, signIn } = useAuth("/projects");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to manage error messages

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error on new attempt
    try {
      await signIn(username, password);
      toastSuccess("Signed in successfully");
    } catch (err) {
      setError("Failed to sign in. Please check your credentials.");
      toastError("Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error on new attempt
    try {
      await signUp(username, password);
      toastSuccess("Signed up successfully");
    } catch (err) {
      setError("Failed to sign up. Please try again.");
      toastError("Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    initial: { opacity: 0, x: 100 },
    enter: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
  };

  const imageVariants = {
    initial: { opacity: 0, x: -100 },
    enter: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 100, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black to-blue-900 text-white p-8">
      <div className="flex flex-col md:flex-row items-center gap-8 w-full p-8 rounded-lg shadow-lg">
        
        {/* Text Column */}
        <div className="flex flex-col items-center w-full text-center">
          <h1 className="text-4xl font-extrabold md:text-6xl mb-4">
            {isLogedIn ? "Sign In" : "Sign Up"} to PhotoPedia
          </h1>
          <p className="text-xl md:text-2xl mb-2">
            {isLogedIn
              ? "Welcome back! Log in to explore and share."
              : "Join us to start managing and sharing your photos."}
          </p>
          {error && <p className="text-red-500 mb-4">{error}</p>} {/* Error Message */}

          <AnimatePresence mode="wait">
            <motion.form
              key={isLogedIn ? "signInForm" : "signUpForm"}
              className="flex flex-col justify-center items-center bg-gray-700 p-6 rounded-md w-full max-w-md space-y-6 shadow-inner"
              onSubmit={isLogedIn ? handleSignIn : handleSignUp}
              variants={formVariants}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <div className="w-full">
                <label
                  htmlFor="username"
                  className="text-blue-600 font-semibold text-lg"
                >
                  Username
                </label>
                <input
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-md bg-black text-yellow-300 placeholder-yellow-400"
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  disabled={loading}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="password"
                  className="text-blue-600 font-semibold text-lg"
                >
                  Password
                </label>
                <input
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-md bg-black text-yellow-300 placeholder-yellow-400"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  disabled={loading}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-300 ease-in-out shadow-lg"
                type="submit"
                disabled={loading}
              >
                {loading ? "Processing..." : isLogedIn ? "Sign In" : "Sign Up"}
              </button>
              <button
                type="button"
                className="text-gray-700 hover:text-blue-600 font-semibold transition"
                onClick={() => setIsLogedIn((prev) => !prev)}
              >
                {isLogedIn ? "New here? Create an account" : "Already have an account? Sign In"}
              </button>
            </motion.form>
          </AnimatePresence>
        </div>

        {/* Image Column */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogedIn ? "moments" : "organize"}
            className="flex justify-center w-full md:w-1/2"
            variants={imageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <Image
              src={isLogedIn ? "/moments.svg" : "/organize.svg"}
              alt="Illustration"
              width={400}
              height={400}
              className="rounded-lg"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Auth;
