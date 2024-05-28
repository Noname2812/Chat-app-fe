import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducers";
import { useDispatch, useSelector, useStore } from "react-redux";
import { apiSlice } from "../api/apiSilce";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});
export const useAppDispatch = useDispatch.withTypes();
export const useAppSelector = useSelector.withTypes();
export const useAppStore = useStore.withTypes();
