import React from "react";
import Chats from "./Chats";
import Navbar from "./Navbar";
import Search from "./Search";

const Sidebar = () => {
  return (
    <div className="basis-1/3 bg-[#3e3c61]">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
