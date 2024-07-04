import { createSlice } from "@reduxjs/toolkit";
import { HubConnection } from "../../lib/HubConnection";
import { updateProfile } from "../asyncThunk/userThunk";
import { toast } from "react-toastify";
const initialState = {
  user: undefined,
  isChanging: false,
  listFriends: [],
};
const authSlices = createSlice({
  name: "authReducers",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = {
        ...action.payload?.data?.user,
        token: action.payload?.data?.token,
        refreshToken: action.payload?.data?.refreshToken,
      };
      state.listFriends = action.payload?.data?.friends;
    },
    setNewToken: (state, action) => {
      const { token, refreshToken } = action.payload;
      state.user = { ...state.user, token, refreshToken };
    },
    logout: (state) => {
      state.user = undefined;
      HubConnection.disconnect();
    },
    getFriendsOnline: (state, action) => {
      state.listFriends = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfile.pending, (state, action) => {
      state.isChanging = true;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.isChanging = false;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      const temp = { ...state.user };
      state.user = { ...temp, ...action.payload?.data?.user };
      toast.success(action.payload?.data?.message);
      state.isChanging = false;
    });
  },
});
export const { loginSuccess, getFriendsOnline, setNewToken, logout } =
  authSlices.actions;
export default authSlices.reducer;
export const getAuthState = (state) => state.auth;
