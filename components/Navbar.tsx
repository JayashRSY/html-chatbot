"use client";
import React from "react";
import SignInButton from "./SignInButton";

const Navbar = () => {

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">HTML ChatBot</h1>
          </div>

          <SignInButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
