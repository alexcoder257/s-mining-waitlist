import { combineReducers } from "@reduxjs/toolkit";
import counterSlice from "./features/counter/counterSlice";

export const rootReducers = combineReducers({
  counter: counterSlice,
});