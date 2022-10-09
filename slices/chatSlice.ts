import { createSlice } from "@reduxjs/toolkit";

interface friend {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
}

export interface ChatState {
  friend: friend;
  chatId: string | undefined;
}

const initialState: ChatState = {
  friend: { uid: "", displayName: "", photoURL: "", email: "" },
  chatId: "",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeFriend: (state, action) => {
      state.friend = action.payload;
      state.chatId =
        action.payload.uid > action.payload.uid2
          ? action.payload.uid + action.payload.uid2
          : action.payload.uid2 + action.payload.uid;
    },
  },
});

export const { changeFriend } = chatSlice.actions;

export default chatSlice.reducer;
