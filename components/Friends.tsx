import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useDispatch } from "react-redux";
import { changeFriend } from "../slices/chatSlice";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { signOut } from "firebase/auth";

const Friends = () => {
  const [chats, setChats] = useState<DocumentData>();
  const user = auth.currentUser;
  const dispatch = useDispatch();
  const signout = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", user!.uid), (snapshot) =>
      setChats(snapshot.data())
    );

    return () => {
      unsub();
    };
  }, [db, user?.uid]);

  return (
    <div className="pb-3 overflow-auto scrollbar-hide">
      {chats &&
        Object.entries(chats)
          .sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              key={chat[0]}
              className="flex items-center justify-center sm:justify-start gap-x-3 px-2 sm:px-3 py-3 cursor-pointer hover:bg-[#2f2d52]"
              onClick={() => dispatch(changeFriend(chat[1].friendInfo))}
            >
              {chat[1].friendInfo?.photoURL?.[35] === "-" ? (
                <img
                  src={chat[1].friendInfo?.photoURL}
                  alt="pic"
                  className="rounded-full h-12 w-12 object-cover"
                />
              ) : (
                <UserCircleIcon
                  onClick={signout}
                  className="h-12 w-12 sm:h-14 sm:w-14 sm:-ml-1 cursor-pointer text-white"
                />
              )}
              <div className="hidden sm:block w-2/3">
                <span className="text-white text-lg hidden md:inline truncate">
                  {chat[1].friendInfo?.displayName}
                </span>
                <span className="text-white text-lg hidden sm:inline md:hidden truncate">
                  {chat[1].friendInfo?.displayName.split(" ")[0]}
                </span>
                <p className="text-sm text-gray-300 hidden sm:block truncate">
                  {chat[1].lastMessage}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Friends;
