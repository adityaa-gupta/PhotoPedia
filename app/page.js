import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="flex-col flex p-4 gap-5 text-center md:flex-row md:mt-12">
      <div>
        <h1 className="text-10xl font-bold text-yellow-400 mb-4 md:text-6xl md:font-extrabold md:mb-6">
          Welcome to Event Management App
        </h1>
        <div className="flex flex-col justify-center items-center gap-1">
          <img src="calender.svg" alt="" className="mb-5 md:w-96" />
        </div>
      </div>
      <div className="md:flex md:flex-col md:gap-4 md:mt-8">
        <h1 className="text-2xl font-bold md:text-8xl md:p-4 ">
          Fix a Date Event
        </h1>
        <p className="text-black-500 text-xl text-center mb-8 md:text-3xl">
          Manage your events with ease. Create, update, and delete events in
          real-time.
        </p>
        <Link
          className="bg-white hover:bg-gray-200 text-blue-500 font-medium py-2 px-4 rounded-md shadow-md hover:shadow-lg
          md:text-3xl md:font-bold md:w "
          href="/auth"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;