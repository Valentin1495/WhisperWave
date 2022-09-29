import React from "react";
import Input from "./Input";
import Messages from "./Messages";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Chat = () => {
  const friendName = useSelector(
    (state: RootState) => state.chat.friend.displayName
  );
  const friendEmail = useSelector(
    (state: RootState) => state.chat.friend.email
  );

  return (
    <div className="basis-4/5 sm:basis-2/3">
      <div className="bg-[#5d5b8d] text-gray-300 h-20 text-center leading-[80px]">
        {friendEmail && friendName ? `${friendName} ( ${friendEmail} )` : ""}
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
