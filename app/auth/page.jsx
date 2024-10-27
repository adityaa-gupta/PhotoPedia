"use client";

import React, { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { toastSuccess } from "@/utils/toast";

// import useAuth from "@hooks/useAuth";
// import useAuthStore from "@store/useAuthStore";
// import { toast } from "react-toastify";

const Auth = () => {
  const { signUp, signIn } = useAuth("/projects");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogedIn, setISLogedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  // const user = useAuthStore((state) => state.user);

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);
    signIn(username, password);
    setUsername("");
    setPassword("");
    toastSuccess("Sign In successfully");
    setLoading(false);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    signUp(username, password);
    setUsername("");
    setPassword("");
    toastSuccess("Sign Up successfully");
    setLoading(false);
  };

  return (
    <div>
      <div
        className="bg-white mb-5 py-3 text-center text-3xl font-bold text-blue-500 md:text-5xl 
      md:font-extrabold md:mb-8 "
      >
        <h1>{isLogedIn ? "Sign In" : "Sign Up"}</h1>
      </div>

      <div className="flex flex-col  md:flex-row  ">
        <div>
          <img
            src={isLogedIn ? "login.svg" : "signup.svg"}
            className="w-50"
            alt=""
          />
        </div>
        <div className="flex justify-center items-center ">
          <div className="   px-3 pt-6 pb-8 m-4 md:px-5 md:pt-8 md:pb-10 md:m-6">
            <div className="mb-4 p-3 bg-white rounded-md md:mb-4 md:p-4 md:rounded-lg shadow">
              <label
                className="text-blue-600   font-bold mb-2 md:text-2xl "
                htmlFor="username"
              >
                Username
              </label>
              <input
                className=" appearance-none  w-full py-1 px-1 text-gray-700 md:text-xl leading-tight outline-none "
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                disabled={loading}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4 p-3 bg-white rounded-md md:mb-4 md:p-4 md:rounded-lg shadow">
              <label
                className="text-blue-600   font-bold mb-2 md:text-2xl"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="appearance-none  w-full py-1 px-1 text-gray-700 md:text-xl leading-tight outline-none "
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between  ">
              {isLogedIn ? (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5
                   rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={handleSignIn}
                >
                  {loading ? "Please wait you are being redirected" : "Sign In"}
                </button>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={handleSignUp}
                >
                  {loading ? "Please wait you are being redirected" : "Sign Up"}
                </button>
              )}
              <button
                type="button"
                className="inline-block align-baseline font-bold text-xl text-gray-500 hover:text-gray-800 cursor-pointer"
                onClick={() => setISLogedIn((val) => !val)}
              >
                {!isLogedIn
                  ? "  Already have an account ? SignIn"
                  : "Create your new account"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;