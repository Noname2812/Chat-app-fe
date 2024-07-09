import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../api/userApi";

export const updateProfile = createAsyncThunk(
  "room/fetchRoomId",
  async (body, { dispatch }) => {
    const result = await userApi.update(body);
    return result.data;
  }
);
export const getListAddFriendRequests = createAsyncThunk(
  "room/fetchRoomId",
  async ({ offset, limit }, { dispatch }) => {
    const result = await userApi.getListAddFriendRequests({ offset, limit });
    return result.data;
  }
);
export const acceptAddFriendRequest = createAsyncThunk(
  "room/acceptRequestAddFriend",
  async ({ userId, friendId }, { dispatch }) => {
    try {
      const result = await userApi.acceptAddFriendRequest({ userId, friendId });
      return result.data;
    } catch (error) {
      throw error.respone;
    }
  }
);
