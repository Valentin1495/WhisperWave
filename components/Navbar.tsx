import {
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";

const Navbar = () => {
  const signout = () => {
    signOut(auth);
  };

  const user = auth.currentUser;

  return (
    <div className="h-20 flex items-center bg-[#2f2d52] px-3">
      <div className="flex items-center flex-1">
        {user?.photoURL ? (
          <img
            src={user?.photoURL}
            alt="Profile Picture"
            className="w-12 h-12 rounded-full object-cover mx-auto md:mx-0 cursor-pointer"
            onClick={signout}
          />
        ) : (
          <UserCircleIcon
            onClick={signout}
            className="h-12 -ml-1 mx-auto md:mx-0 cursor-pointer"
          />
        )}

        <span className="md:inline hidden text-lg text-white truncate ml-1.5">
          {user?.displayName}
        </span>
      </div>

      <button
        onClick={signout}
        className="hidden md:inline-block bg-[#5d5b8d] rounded-full p-1 cursor-pointer"
      >
        <ArrowRightOnRectangleIcon className="h-5 w-5 text-white" />
      </button>
    </div>
  );
};

export default Navbar;
