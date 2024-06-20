import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const chatSlices = createSlice({
  name: "chatReducers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
export const {} = chatSlices.actions;
export default chatSlices.reducer;
export const getChatState = (state) => state.chat;
