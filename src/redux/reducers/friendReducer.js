import { createSlice } from "@reduxjs/toolkit";
import {
  acceptAddFriendRequest,
  getListAddFriendRequests,
} from "../asyncThunk/userThunk";
import { toast } from "react-toastify";

const initialState = {
  listAddFriendRequests: [],
  updating: "pending" | "completed" | "error",
};
const friendSlices = createSlice({
  name: "friendReducers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListAddFriendRequests.fulfilled, (state, action) => {
      state.listAddFriendRequests = action.payload?.data;
    });
    builder.addCase(getListAddFriendRequests.rejected, (state, action) => {
      console.log("error");
    });
    builder.addCase(acceptAddFriendRequest.fulfilled, (state, action) => {
      state.updating = "completed";
    });
    builder.addCase(acceptAddFriendRequest.rejected, (state, action) => {
      state.updating = "error";
    });
  },
});
// export const {} = friendSlices.actions;
export default friendSlices.reducer;
export const getFriendState = (state) => state.friend;
