import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";

const Signin = () => {
  const provider = new GoogleAuthProvider();

  const signin = () => {
    signInWithRedirect(auth, provider);
  };

  return (
    <div className="flex flex-col items-center p-20 gap-y-5">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png"
        alt="WhatsApp Logo"
        className="h-64 w-64 sm:h-80 sm:w-80 object-contain"
      />

      <button
        onClick={signin}
        className="sm:text-2xl px-6 py-3 relative rounded group text-white inline-block"
      >
        <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-lime-600 to-green-500"></span>
        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-lime-600 to-green-500"></span>
        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-lime-600 to-green-500"></span>
        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-lime-600 from-green-500"></span>
        <span className="relative">Sign in with Google</span>
      </button>
    </div>
  );
};

export default Signin;
