import { createSlice } from "@reduxjs/toolkit";
import { fetchRoomId, fetchRooms } from "../asyncThunk/roomThunk";
import { toast } from "react-toastify";
import { replaceMessagesToRoom } from "../../utils/functionHelper";
import { cloneDeep } from "lodash";

const initialState = {
  rooms: [],
  isLoadingRoom: false,
  isLoadingRoomSelected: false,
  roomSelected: null,
};
const roomSlices = createSlice({
  name: "roomReducers",
  initialState,
  reducers: {
    setRoomSelected: (state, action) => {
      state.roomSelected = action.payload;
    },
    createNewRoom: (state, action) => {
      state.rooms.push(action.payload);
      state.roomSelected = action.payload;
    },
    addNewRoom: (state, action) => {
      const temp = cloneDeep(state.rooms);
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
      const temp = cloneDeep(state.rooms);
      if (temp.findIndex((x) => x.id === action.payload.id) < 0) {
        const rooms = temp.filter((x) => x.id > 0);
        state.rooms = [action.payload, ...rooms];
      } else {
        state.rooms = replaceMessagesToRoom({
          rooms: temp,
          messages: action.payload?.messages,
          roomId: action.payload?.id,
        });
      }
      if (state.roomSelected?.id < 0) {
        state.roomSelected = action.payload;
      }
    });
    builder.addCase(fetchRoomId.rejected, (state, action) => {
      state.isLoadingRoomSelected = false;
      toast.error("call api failed !");
    });
  },
});
export const { setRoomSelected, createNewRoom, addNewRoom } =
  roomSlices.actions;
export default roomSlices.reducer;
export const getRoomsState = (state) => state.room;
