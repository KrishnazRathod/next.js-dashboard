import { combineReducers, configureStore } from "@reduxjs/toolkit";
import DashboardSlice from "../DashboardSlice";

export const rootReducer = combineReducers({
  DashboardSlice,
});
const store = configureStore({
  reducer: rootReducer,
});
export default store;
