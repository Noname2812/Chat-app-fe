import { createSlice } from "@reduxjs/toolkit";
import { sendMessages } from "../asyncThunk/chatThunk";
import { HubConnection } from "../../lib/HubConnection";

const initialState = {
  chatting: "Completed",
};

const chatSlices = createSlice({
  name: "chatReducers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendMessages.pending, (state, action) => {
      state.chatting = "Pending";
    });
    builder.addCase(sendMessages.rejected, (state, action) => {
      state.chatting = "Completed";
    });
    builder.addCase(sendMessages.fulfilled, (state, action) => {
      HubConnection.chat({
        roomId: action.payload.data?.messages?.[0]?.roomChatId,
        from: action.payload.data?.messages?.[0]?.userId,
      });
      state.chatting = "Completed";
    });
  },
});
export const {} = chatSlices.actions;
export default chatSlices.reducer;
export const getChatState = (state) => state.chat;
