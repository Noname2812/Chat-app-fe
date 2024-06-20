import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../api/userApi";

export const updateProfile = createAsyncThunk(
  "room/fetchRoomId",
  async (body, { dispatch }) => {
    const result = await userApi.update(body);
    return result.data;
  }
);
