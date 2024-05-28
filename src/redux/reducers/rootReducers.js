import { combineReducers } from "@reduxjs/toolkit";
import authReducers from "./authReducers";
import chatReducers from "./chatReducers";
import { apiSlice } from "../../api/apiSilce";
const rootReducer = combineReducers({
  auth: authReducers,
  chat: chatReducers,
  [apiSlice.reducerPath]: apiSlice.reducer,
});
export default rootReducer;
