import { createAsyncThunk } from "@reduxjs/toolkit";
import { roomApi } from "../../api/roomApi";

export const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",
  async (_, { dispatch }) => {
    const result = await roomApi.getAllRoom();
    return result.data;
  }
);
export const fetchRoomId = createAsyncThunk(
  "room/fetchRoomId",
  async ({ roomId }, { dispatch }) => {
    const result = await roomApi.getRoomById(roomId);
    return {
      roomId,
      messages: result.data?.data,
    };
  }
);
