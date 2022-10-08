import {
  ChatBubbleBottomCenterTextIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import * as EmailValidator from "email-validator";
import { useDispatch } from "react-redux";
import { changeFriend } from "../slices/chatSlice";

const Search = () => {
  const [email, setEmail] = useState("");
  const [friend, setFriend] = useState<DocumentData>();

  const user = auth.currentUser;
  const dispatch = useDispatch();
  const combinedId =
    user!.uid > friend?.uid ? user?.uid + friend?.uid : friend?.uid + user?.uid;

  const isValid = (mail: string) => {
    if (!EmailValidator.validate(mail)) {
      alert("Not a valid email");
      setEmail("");
      return false;
    }
    return true;
  };

  const searchFriend = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    const isUser = snapshot.docs.find((doc) => doc.data().email === email);
    if (!isUser) {
      alert("User not found");
    }

    const q = query(collection(db, "users"), where("email", "==", email));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setFriend(doc.data());
    });

    setEmail("");
  };

  useEffect(() => {
    getDoc(doc(db, "messages", combinedId)).then((result) => {
      if (result.exists()) {
        setFriend(undefined);
        alert("Friend already exists");
      }
    });
  }, [combinedId, db]);

  const enter = (e: React.KeyboardEvent) => {
    if (e.code === "Enter" && isValid(email)) {
      searchFriend();
    }
  };

  const startChat = async () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );

    if (input) {
      isValid(input);

      const snapshot = await getDocs(collection(db, "users"));
      const isUser = snapshot.docs.find((doc) => doc.data().email === input);
      if (!isUser) {
        alert("User not found");
      }

      const q = query(collection(db, "users"), where("email", "==", input));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setFriend(doc.data());
      });
    }
  };

  const addFriend = async () => {
    await setDoc(doc(db, "messages", combinedId), { messages: [] });

    await setDoc(
      doc(db, "chats", user!.uid),
      {
        [combinedId]: {
          friendInfo: {
            uid2: user!.uid,
            uid: friend?.uid,
            email: friend?.email,
            displayName: friend?.displayName,
            photoURL: friend?.photoURL,
          },
          date: serverTimestamp(),
        },
      },
      { merge: true }
    );

    await setDoc(
      doc(db, "chats", friend!.uid),
      {
        [combinedId]: {
          friendInfo: {
            uid2: friend!.uid,
            uid: user?.uid,
            email: user?.email,
            displayName: user?.displayName,
            photoURL: user?.photoURL,
          },
          date: serverTimestamp(),
        },
      },
      { merge: true }
    );

    setEmail("");
    setFriend(undefined);

    const mate = await getDoc(doc(db, "chats", user!.uid));

    dispatch(changeFriend(mate.data()![combinedId].friendInfo));
  };

  return (
    <div>
      <div className="px-4 text-lg my-3">
        <ChatBubbleBottomCenterTextIcon
          onClick={startChat}
          className="cursor-pointer h-8 w-8 mx-auto sm:hidden text-gray-300"
        />
        <input
          type="text"
          placeholder="Find your Friends..."
          className="hidden sm:inline-block bg-transparent outline-none placeholder-gray-300
          placeholder:text-sm text-white w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={enter}
        />
      </div>
      {friend && (
        <div
          onClick={addFriend}
          className="cursor-pointer flex 
          justify-start items-center gap-x-1.5 p-3"
        >
          {friend.photoURL?.[35] === "-" ? (
            <img
              src={friend.photoURL}
              alt="friend"
              className="rounded-full h-12 w-12 mx-auto md:mx-0"
            />
          ) : (
            <UserCircleIcon className="h-12 -ml-1 cursor-pointer text-white" />
          )}
          <span className="text-white text-lg hidden sm:inline truncate">
            {friend.displayName}
          </span>
        </div>
      )}
    </div>
  );
};

export default Search;
