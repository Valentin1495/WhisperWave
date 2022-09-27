import { createSlice } from "@reduxjs/toolkit";

interface friendType {
  uid: string;
  displayName: string;
  photoURL: string;
}

export interface ChatState {
  friend: friendType;
  chatId: string | undefined;
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
      state.chatId =
        action.payload.uid > action.payload.uid2
          ? action.payload.uid + action.payload.uid2
          : action.payload.uid2 + action.payload.uid;
    },
  },
});

export const { changeFriend } = chatSlice.actions;

export default chatSlice.reducer;
