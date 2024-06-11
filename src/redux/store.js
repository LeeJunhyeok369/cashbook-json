import { configureStore } from "@reduxjs/toolkit";
import historyReducer from "./slice/historySlice";
import nowMonthReducer from "./slice/nowMonthSlice";

const store = configureStore({
  reducer: {
    history: historyReducer,
    nowMonth: nowMonthReducer,
  },
});

export default store;
