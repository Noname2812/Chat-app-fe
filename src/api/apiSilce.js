import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { store } from "../redux/store";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5264/api" }),
  endpoints: (builder) => ({
    getMessagesByRoom: builder.query({
      query: ({ roomId, offset, limit }) => ({
        url: `/room/${roomId}?offset=${offset ?? 0}&limit=${limit ?? 10}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${store.getState().auth.user.token}`,
        },
      }),
    }),
    getRoomsChat: builder.query({
      query: () => ({
        url: "/room/all",
        method: "GET",
        headers: {
          Authorization: `Bearer ${store.getState().auth.user.token}`,
        },
      }),
    }),
    getRoomById: builder.query({
      query: ({ roomId }) => ({
        url: `/room/${roomId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${store.getState().auth.user.token}`,
        },
      }),
    }),
  }),
});
export const {
  useGetMessagesByRoomQuery,
  useGetRoomsChatQuery,
  useGetRoomById,
} = apiSlice;
