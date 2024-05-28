import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: undefined,
  friendsOnline: [],
};
const authSlices = createSlice({
  name: "authReducers",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
    getFriendsOnline: (state, action) => {
      state.friendsOnline = action.payload.filter(
        (user) => user.userId !== state.user.id
      );
    },
  },
});
export const { loginSuccess, getFriendsOnline } = authSlices.actions;
export default authSlices.reducer;
export const getAuthState = (state) => state.auth;
