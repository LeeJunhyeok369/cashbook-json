import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nowMonth: 1,
};

const nowMonthSlice = createSlice({
  name: "nowMonth",
  initialState,
  reducers: {
    setNowMonth(state, action) {
      state.nowMonth = action.payload;
    },
  },
});

export const { setNowMonth } = nowMonthSlice.actions;
export default nowMonthSlice.reducer;
