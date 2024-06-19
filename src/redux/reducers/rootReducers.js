import { combineReducers } from "@reduxjs/toolkit";
import authReducers from "./authReducers";
import chatReducers from "./chatReducers";
import roomReducers from "./roomReducer";

const rootReducer = combineReducers({
  auth: authReducers,
  chat: chatReducers,
  room: roomReducers,
});
export default rootReducer;
