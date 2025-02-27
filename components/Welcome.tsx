"use client";
import React from "react";
import { useSession } from "next-auth/react";
import SignInButton from "./SignInButton";

const Welcome = () => {
  const { data: session } = useSession(); // Fetch session data

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
        {session ? (
          <>
            <h1 className="text-2xl font-bold">Welcome, {session.user?.name}!</h1>
            <p className="text-gray-600 mt-2">Glad to have you back!</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold">Welcome to HTML ChatBot!</h1>
            <p className="text-gray-600 mt-2">Please log in to continue.</p>
            <div className="mt-4">
              <SignInButton />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Welcome;
