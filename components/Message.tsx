import { FieldValue } from "firebase/firestore";
import React from "react";

interface msgType {
  date: FieldValue;
  id: string;
  image?: string;
  senderId: string;
  text: string;
}

const Message = ({ msg }: { msg: msgType }) => {
  return <div>{msg.text}</div>;
};

export default Message;
