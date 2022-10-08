import React from "react";
import Friends from "./Friends";
import Navbar from "./Navbar";
import Search from "./Search";

const Sidebar = () => {
  return (
    <div className="1/5 sm:w-1/3 bg-[#3e3c61]">
      <Navbar />
      <Search />
      <Friends />
    </div>
  );
};

export default Sidebar;
