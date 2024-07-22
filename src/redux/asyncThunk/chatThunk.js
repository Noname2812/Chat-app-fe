import { createAsyncThunk } from "@reduxjs/toolkit";
import { chatApi } from "../../api/chatApi";
import { fetchRoomId } from "./roomThunk";

export const sendMessages = createAsyncThunk(
  "chat/sendmessages",
  async (value, { dispatch }) => {
    try {
      const roomId = value.roomId;
      if (roomId < 0) {
        delete value.roomId;
      }
      const res = await chatApi.chat({
        ...value,
      });
      if (roomId < 0) {
        dispatch(fetchRoomId({ roomId: res.data?.data?.roomId }));
      }
      return res.data;
    } catch (error) {
      throw error?.respone;
    }
  }
);
