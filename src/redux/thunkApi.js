import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSilce";

export const fetchMessagesByRoom = createAsyncThunk(
  "messages/fetchMessagesByRoom",
  async ({ roomId, offset = 0, limit = 10 }, { dispatch }) => {
    const result = await dispatch(
      apiSlice.endpoints.getMessagesByRoom.initiate(
        { roomId, offset, limit },
        { forceRefetch: true }
      )
    );
    return {
      messages: result.data,
      roomId: roomId,
    };
  }
);
export const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",
  async (_, { dispatch }) => {
    const result = await dispatch(
      apiSlice.endpoints.getRoomsChat.initiate(_, { forceRefetch: true })
    );
    return result.data;
  }
);
export const fetchRoomId = createAsyncThunk(
  "room/fetchRoomId",
  async ({ roomId }, { dispatch }) => {
    const result = await dispatch(
      apiSlice.endpoints.getRoomById.initiate(
        { roomId },
        { forceRefetch: true }
      )
    );
    return result.data;
  }
);
