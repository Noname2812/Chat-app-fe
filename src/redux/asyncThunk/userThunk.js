import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../api/userApi";

export const updateProfile = createAsyncThunk(
  "user/fetchRoomId",
  async (body, { dispatch }) => {
    const result = await userApi.update(body);
    return result.data;
  }
);
export const getListAddFriendRequests = createAsyncThunk(
  "user/getListAddFriendRequests",
  async ({ offset, limit }, { dispatch }) => {
    const result = await userApi.getListAddFriendRequests({ offset, limit });
    return result.data;
  }
);
export const acceptAddFriendRequest = createAsyncThunk(
  "user/acceptRequestAddFriend",
  async ({ userId, friendId }, { dispatch }) => {
    try {
      const result = await userApi.acceptAddFriendRequest({ userId, friendId });
      return result.data;
    } catch (error) {
      throw error.respone;
    }
  }
);
