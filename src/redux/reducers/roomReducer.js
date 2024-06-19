import { createSlice } from "@reduxjs/toolkit";
import { fetchRoomId, fetchRooms } from "../asyncThunk/roomThunk";
import { toast } from "react-toastify";
import { replaceMessagesToRoom } from "../../utils/functionHelper";

const initialState = {
  rooms: [],
  isLoadingRoom: false,
  isLoadingRoomSelected: false,
};
const roomSlices = createSlice({
  name: "roomReducers",
  initialState,
  reducers: {
    setRoomIdSelected: (state, action) => {
      state.roomIdSelectd = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRooms.pending, (state, action) => {
      state.isLoadingRoom = true;
    });
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.isLoadingRoom = false;
      state.rooms = action.payload.data.rooms;
    });
    builder.addCase(fetchRooms.rejected, (state, action) => {
      state.isLoadingRoom = false;
      toast.error("call api failed !");
    });
    builder.addCase(fetchRoomId.pending, (state, action) => {
      state.isLoadingRoomSelected = true;
    });
    builder.addCase(fetchRoomId.fulfilled, (state, action) => {
      state.isLoadingRoomSelected = false;
      state.rooms = replaceMessagesToRoom(
        state.rooms,
        action.payload?.roomId,
        action.payload?.messages
      );
    });
    builder.addCase(fetchRoomId.rejected, (state, action) => {
      state.isLoadingRoomSelected = false;
      toast.error("call api failed !");
    });
  },
});
export const {} = roomSlices.actions;
export default roomSlices.reducer;
export const getRoomsState = (state) => state.room;
