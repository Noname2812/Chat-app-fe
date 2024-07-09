import { combineReducers } from "@reduxjs/toolkit";
import authReducers from "./authReducers";
import chatReducers from "./chatReducers";
import roomReducers from "./roomReducer";
import friendReducer from "./friendReducer";

const rootReducer = combineReducers({
  auth: authReducers,
  chat: chatReducers,
  room: roomReducers,
  friend: friendReducer,
});
export default rootReducer;
