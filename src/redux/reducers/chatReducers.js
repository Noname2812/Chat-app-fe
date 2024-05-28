import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchMessagesByRoom, fetchRoomId, fetchRooms } from "../thunkApi";

const initialState = {
  hubConnection: undefined,
  rooms: [],
  isLoadingMessages: false,
  isLoadingRooms: false,
};

const chatSlices = createSlice({
  name: "chatReducers",
  initialState,
  reducers: {
    setConnectionSignalr: (state, action) => {
      state.hubConnection = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesByRoom.pending, (state) => {
        state.isLoadingMessages = true;
      })
      .addCase(fetchMessagesByRoom.fulfilled, (state, action) => {
        state.isLoadingMessages = false;
        const older = state.rooms.filter(
          (r) => r.id !== action.payload?.data?.room.id
        );
        const rooms = [action.payload?.data?.room, ...older];
        state.rooms = rooms;
      })
      .addCase(fetchMessagesByRoom.rejected, (state, action) => {
        state.isLoadingMessages = false;
        toast.error(action.payload?.errors.message);
      })
      .addCase(fetchRooms.pending, (state) => {
        state.isLoadingRooms = true;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.isLoadingRooms = false;
        state.rooms = action.payload?.data.rooms;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload?.errors.message);
      })
      .addCase(fetchRoomId.fulfilled, (state, action) => {
        const older = state.rooms.filter(
          (r) => r.id !== action.payload?.data?.room.id
        );
        const rooms = [action.payload?.data?.room, ...older];
        state.rooms = rooms;
      });
  },
});
export const { setConnectionSignalr } = chatSlices.actions;
export default chatSlices.reducer;
export const getChatState = (state) => state.chat;
