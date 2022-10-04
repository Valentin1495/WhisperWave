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
      <div className="flex items-center flex-1 justify-center sm:justify-start">
        {user?.photoURL?.[35] === "-" ? (
          <img
            src={user?.photoURL}
            alt="Profile Picture"
            className="w-12 h-12 rounded-full object-cover cursor-pointer"
            onClick={signout}
          />
        ) : (
          <UserCircleIcon
            onClick={signout}
            className="h-12 -ml-1 cursor-pointer text-[#ddddf7]"
          />
        )}

        <span className="text-lg text-[#ddddf7] ml-1.5 hidden md:inline truncate">
          {user?.displayName}
        </span>
        <span className="text-lg text-[#ddddf7] ml-1.5 hidden sm:inline md:hidden truncate">
          {user?.displayName?.split(" ")[0]}
        </span>
      </div>

      <button
        onClick={signout}
        className="bg-[#5d5b8d] rounded-full p-1 cursor-pointer hidden sm:inline-flex"
      >
        <ArrowRightOnRectangleIcon className="h-5 w-5 text-[#ddddf7]" />
      </button>
    </div>
  );
};

export default Navbar;
