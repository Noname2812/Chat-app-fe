import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const chatSlices = createSlice({
  name: "chatReducers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder
    //   .addCase(fetchMessagesByRoom.pending, (state) => {
    //     state.isLoadingMessages = true;
    //   })
    //   .addCase(fetchMessagesByRoom.fulfilled, (state, action) => {
    //     state.isLoadingMessages = false;
    //     console.log(action.payload?.data);
    //     // const older = state.rooms.filter(
    //     //   (r) => r.id !== action.payload?.data?.room.id
    //     // );
    //     // const rooms = [action.payload?.data?.room, ...older];
    //     // state.rooms = rooms;
    //   })
    //   .addCase(fetchMessagesByRoom.rejected, (state, action) => {
    //     state.isLoadingMessages = false;
    //     toast.error(action.payload?.errors.message);
    //   })
    //   .addCase(fetchRooms.pending, (state) => {
    //     state.isLoadingRooms = true;
    //   })
    //   .addCase(fetchRooms.fulfilled, (state, action) => {
    //     state.isLoadingRooms = false;
    //     state.rooms = action.payload?.data.rooms;
    //   })
    //   .addCase(fetchRooms.rejected, (state, action) => {
    //     state.loading = false;
    //     toast.error(action.payload?.errors.message);
    //   })
    //   .addCase(fetchRoomId.fulfilled, (state, action) => {
    //     const older = state.rooms.filter(
    //       (r) => r.id !== action.payload?.data?.room.id
    //     );
    //     const rooms = [action.payload?.data?.room, ...older];
    //     state.rooms = rooms;
    //   });
  },
});
export const {} = chatSlices.actions;
export default chatSlices.reducer;
export const getChatState = (state) => state.chat;
