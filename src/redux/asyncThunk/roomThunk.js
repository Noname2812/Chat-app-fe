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
  async ({ roomId, offset, limit }, { dispatch }) => {
    const result = await roomApi.getRoomById({ id: roomId, offset, limit });
    return result.data?.data?.room;
  }
);
