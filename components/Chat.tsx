import { useSession } from "next-auth/react";
import React, { useState } from "react";
import ChatInput from "./ChatInput";
import { signIn } from "next-auth/react";

const Chat = () => {
  const { data } = useSession();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await signIn();
    setLoading(false);
  };

  return (
    <>
      {data ? (
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <ChatInput />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <h2 className="text-2xl font-bold mb-4">
            Please Login to Start Chatting
          </h2>
          <button
            onClick={handleSignIn}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
          {loading && <div className="loader">Loading...</div>}
        </div>
      )}
    </>
  );
};

export default Chat;
