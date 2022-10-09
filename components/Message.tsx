import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { auth } from "../firebase";
import { RootState } from "../store";

interface msg {
  date: Timestamp;
  id: string;
  image?: string;
  senderId: string;
  text: string;
}

const Message = ({ msg }: { msg: msg }) => {
  const user = auth.currentUser;

  const friendPhoto = useSelector(
    (state: RootState) => state.chat.friend.photoURL
  );

  const msgRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    msgRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  // useEffect(() => {
  //   msgRef.current?.complete &&
  //     msgRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [msg]);

  const src = msg.senderId === user?.uid ? user.photoURL! : friendPhoto;

  return (
    <div
      className={`flex gap-2 sm:gap-5 mb-5 px-1.5 sm:px-2.5  ${
        msg.senderId === user?.uid && "flex-row-reverse"
      }`}
    >
      {src?.[35] === "-" ? (
        <img
          src={src}
          alt="profile picture"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
        />
      ) : (
        <UserCircleIcon className="h-10 w-10 sm:h-12 sm:w-12 -ml-1" />
      )}

      <div
        className={`max-w-[80%] gap-y-1.5 sm:gap-y-2.5 flex flex-col ${
          msg.senderId === user?.uid && "items-end"
        }`}
      >
        {msg.text && (
          <>
            <p
              className={`bg-white p-1.5 sm:p-2.5 text-sm sm:text-base max-w-max w-3/4 sm:w-4/5 break-all ${
                msg.senderId === user?.uid
                  ? "bg-[#8da4f1] text-white rounded-tl-md rounded-br-md rounded-bl-md"
                  : "rounded-tr-md rounded-br-md rounded-bl-md"
              }`}
            >
              {msg.text}
            </p>

            {!msg.image && (
              <span
                ref={msgRef}
                className="text-gray-500 font-light text-[10px] sm:text-xs"
              >
                {moment(msg.date.toDate()).format("LLL")}
              </span>
            )}
          </>
        )}
        {msg.image && (
          <>
            <img
              src={msg.image}
              alt="message image"
              className="w-2/3 sm:w-1/2 rounded-md"
              onLoad={() =>
                msgRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            />
            <span
              ref={msgRef}
              className="text-gray-500 font-light text-[10px] sm:text-xs"
            >
              {moment(msg.date.toDate()).format("LLL")}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Message;
