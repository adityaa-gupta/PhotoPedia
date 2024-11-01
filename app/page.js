import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-6 gap-10 text-center min-h-screen bg-black text-yellow-400 font-sans">
      <div className="md:w-1/2">
        <h1 className="text-5xl md:text-6xl font-heading font-extrabold mb-6">
          Welcome to <span className="text-blue-500">Photo Management App</span>
        </h1>
        <div className="flex justify-center mb-8">
          <Image
            src="/cameraMan.svg"
            alt="Camera Man"
            width={400}
            height={400}
            className="w-full max-w-xs md:max-w-md"
          />
        </div>
      </div>
      <div className="md:w-1/2 flex flex-col items-center md:items-start gap-6">
        <h2 className="text-4xl font-elegant tracking-wide mx-auto md:text-6xl font-bold text-yellow-400 mb-4">
          Organize Your Photos
        </h2>
        <p className="text-gray-300 font-sans text-lg md:text-2xl max-w-md mx-auto mb-8">
          Keep all your photos in one place and easily share them with friends and family.
        </p>
        <Link
          href="/auth"
          className="bg-yellow-400 hover:bg-yellow-600 mx-auto text-black font-semibold py-3 px-8 rounded-md shadow-lg hover:shadow-2xl transition-all duration-300 text-lg md:text-2xl"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;
