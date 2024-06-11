import React from "react";
import styled from "styled-components";
import DateSelect from "./DateSelect";
import MonthHistory from "./MonthHistory";

const RightStyle = styled.div`
  width: 70%;
  height: 100%;
  background-color: #f7f7f9;
  overflow: hidden;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

export default function RightList() {
  return (
    <RightStyle>
      <DateSelect />
      <MonthHistory />
    </RightStyle>
  );
}
