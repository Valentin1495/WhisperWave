import React, { useEffect, useState } from "react";
import Input from "./Input";
import Messages from "./Messages";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import TimeAgo from "timeago-react";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
  deleteDoc,
  deleteField,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const Chat = () => {
  const [chat, setChat] = useState<DocumentData>();

  const friendName = useSelector(
    (state: RootState) => state.chat.friend.displayName
  );
  const friendEmail = useSelector(
    (state: RootState) => state.chat.friend.email
  );

  const lastActive = useSelector(
    (state: RootState) => state.chat.friend.lastActive
  );

  const friendUid = useSelector((state: RootState) => state.chat.friend.uid);

  const chatId = useSelector((state: RootState) => state.chat.chatId);

  const user = auth.currentUser;

  const deleteChat = async () => {
    await updateDoc(doc(db, "chats", user!.uid), {
      [chatId!]: deleteField(),
    });
    await updateDoc(doc(db, "chats", friendUid), {
      [chatId!]: deleteField(),
    });
    await deleteDoc(doc(db, "messages", chatId!));
  };

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", user!.uid), (snapshot) => {
      setChat(snapshot.data()?.[chatId!]);
    });

    return () => {
      unsub();
    };
  }, [db, chatId]);

  return (
    <div className="basis-4/5 sm:basis-2/3">
      <div className="bg-[#5d5b8d] text-gray-300 h-20 flex items-center px-3">
        {chat && (
          <div className="flex items-center w-full">
            <div className="flex-1">
              <h3>
                {friendName} ( {friendEmail} )
              </h3>
              <span>
                Last active: <TimeAgo datetime={lastActive} />
              </span>
            </div>
            <TrashIcon
              onClick={deleteChat}
              className="h-6 w-6 cursor-pointer"
            />
          </div>
        )}
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
