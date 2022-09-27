import { FieldValue } from "firebase/firestore";
import React from "react";
import { useSelector } from "react-redux";
import { auth } from "../firebase";
import { RootState } from "../store";

interface msgType {
  date: FieldValue;
  id: string;
  image?: string;
  senderId: string;
  text: string;
}

const Message = ({ msg }: { msg: msgType }) => {
  const user = auth.currentUser;
  const friendPhoto = useSelector(
    (state: RootState) => state.chat.friend.photoURL
  );

  return (
    <div
      className={`flex gap-5 mb-5 p-2.5 ${
        msg.senderId === user?.uid && "flex-row-reverse"
      }`}
    >
      <div>
        <img
          src={msg.senderId === user?.uid ? user.photoURL! : friendPhoto}
          alt="profile picture"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="text-gray-500 font-light">just now</span>
      </div>
      <div
        className={`max-w-[80%] gap-y-2.5 flex flex-col ${
          msg.senderId === user?.uid && "items-end"
        }`}
      >
        <p
          className={`bg-white p-2.5 max-w-max ${
            msg.senderId === user?.uid
              ? "bg-[#8da4f1] text-white rounded-tl-md rounded-br-md rounded-bl-md"
              : "rounded-tr-md rounded-br-md rounded-bl-md"
          }`}
        >
          {msg.text}
        </p>
        {msg.image && (
          <img
            src={msg.image}
            alt="message image"
            className="w-1/2 rounded-md"
          />
        )}
      </div>
    </div>
  );
};

export default Message;
