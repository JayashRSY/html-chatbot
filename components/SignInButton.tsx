"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function SignInButton() {
  const { data: session } = useSession();
  console.log("🚀 ~ SignInButton ~ session:", session);
  const [loadingMessage, setLoadingMessage] = useState("");

  const handleSignIn = async () => {
    setLoadingMessage("Signing you in...");
    await signIn();
    setLoadingMessage("");
  };

  const handleSignOut = async () => {
    setLoadingMessage("Signing you out...");
    await signOut();
    setLoadingMessage("");
  };

  return (
    <>
      {loadingMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-16 h-16 border-8 border-t-8 border-white border-t-transparent rounded-full animate-spin"></div>
          <div className="text-white text-lg ml-4">{loadingMessage}</div>
        </div>
      )}
      {session ? (
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="text-lg font-semibold px-2">
              Signed in as
            </span>{" "}
            {session?.user?.image && (
              <Image
                src={session?.user?.image}
                alt="User Avatar"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
            )}
            <span className="text-lg font-semibold px-2">
              {session?.user?.email}
            </span>{" "}
            <br />
            <button
              onClick={handleSignOut}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Sign out
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <span className="text-lg font-semibold px-2">Not signed in</span> <br />
          <button
            onClick={handleSignIn}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Sign in
          </button>
        </div>
      )}
    </>
  );
}
