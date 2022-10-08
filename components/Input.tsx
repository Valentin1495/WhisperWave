import { PhotoIcon } from "@heroicons/react/24/outline";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { auth, db, storage } from "../firebase";
import { RootState } from "../store";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Input = () => {
  const [img, setImg] = useState<File>();
  const [text, setText] = useState("");
  const chatId = useSelector((state: RootState) => state.chat.chatId);
  const friendUid = useSelector((state: RootState) => state.chat.friend.uid);
  const user = auth.currentUser;

  const sendMsg = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!img) {
      await updateDoc(doc(db, "messages", chatId!), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: user?.uid,
          date: Timestamp.now(),
        }),
      });
    } else {
      const storageRef = ref(storage, uuidv4());

      uploadBytes(storageRef, img).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          await updateDoc(doc(db, "messages", chatId!), {
            messages: arrayUnion({
              id: uuidv4(),
              text,
              image: url,
              senderId: user?.uid,
              date: Timestamp.now(),
            }),
          });
        });
      });
    }

    await updateDoc(doc(db, "chats", user!.uid), {
      [chatId! + ".lastMessage"]: text,
      [chatId! + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "chats", friendUid), {
      [chatId! + ".lastMessage"]: text,
      [chatId! + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(undefined);
  };

  return (
    <form
      className="h-12 sm:h-20 bg-white flex items-center px-1.5 sm:px-3"
      onSubmit={sendMsg}
    >
      <input
        type="text"
        placeholder="Say Something..."
        className="w-full flex-1 outline-none pr-1.5 sm:pr-3 placeholder:text-sm sm:placeholder:text-base"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <input
        type="file"
        id="img"
        className="hidden"
        onChange={(e) => setImg(e.target.files?.[0])}
      />
      <label htmlFor="img">
        <PhotoIcon className="h-6 w-6 mr-1 text-gray-400 cursor-pointer" />
      </label>
      <button
        type="submit"
        className="bg-[#8da4f1] text-xs sm:text-base text-white px-1.5 py-0.5 rounded-sm disabled:cursor-not-allowed disabled:hover:opacity-80"
        disabled={!text.trim() && !img}
      >
        Send
      </button>
    </form>
  );
};

export default Input;
