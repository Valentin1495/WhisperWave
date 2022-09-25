import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { auth } from "../firebase";

const user = auth.currentUser;

interface friendType {
  uid: string;
  displayName: string;
  photoURL: string;
}

export interface ChatState {
  friend: friendType;
  chatId: string | null;
}

const initialState: ChatState = {
  friend: { uid: "", displayName: "", photoURL: "" },
  chatId: "",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeFriend: (state, action) => {
      state.friend = action.payload;
      if (user !== null && user.uid > action.payload.uid) {
        state.chatId = user.uid + action.payload.uid;
      }
      if (user !== null && user.uid < action.payload.uid) {
        state.chatId = action.payload.uid + user.uid;
      }
    },
  },
});

export const { changeFriend } = chatSlice.actions;

export default chatSlice.reducer;
