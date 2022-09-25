import React from "react";
import Input from "./Input";
import Messages from "./Messages";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Chat = () => {
  const friendName = useSelector(
    (state: RootState) => state.chat.friend.displayName
  );

  return (
    <div className="basis-2/3">
      <div className="bg-[#5d5b8d] h-20">{friendName}</div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
