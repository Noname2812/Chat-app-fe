import { createSlice } from "@reduxjs/toolkit";
import { HubConnection } from "../../lib/HubConnection";
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
    setNewToken: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.user = { ...state.user, accessToken, refreshToken };
    },
    logout: (state) => {
      state.user = undefined;
      HubConnection.disconnect();
    },
    getFriendsOnline: (state, action) => {
      state.friendsOnline = action.payload.filter(
        (user) => user.userId !== state.user.id
      );
    },
  },
});
export const { loginSuccess, getFriendsOnline, setNewToken, logout } =
  authSlices.actions;
export default authSlices.reducer;
export const getAuthState = (state) => state.auth;
