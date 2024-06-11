import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setNowMonth as setNowMonthAction } from "../redux/slice/nowMonthSlice";
import MonthBtn from "./MonthBtn";

const MonthMenus = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export default function DateSelect() {
  const nowMonth = useSelector((state) => state.nowMonth.nowMonth);
  const dispatch = useDispatch();

  const setNowMonth = (month) => {
    dispatch(setNowMonthAction(month));
  };

  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <MonthMenus>
      {months.map((month) => (
        <MonthBtn
          key={month}
          nowMonth={nowMonth}
          setNowMonth={setNowMonth}
          Month={month}
        />
      ))}
    </MonthMenus>
  );
}
