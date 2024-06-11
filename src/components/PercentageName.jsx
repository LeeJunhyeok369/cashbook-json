import React from "react";
import styled from "styled-components";

const NameTag = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px;
  margin-top: 20px;
  > span {
    color: #555;
  }
`;

const ColorBox = styled.div`
  background-color: ${(props) => props.color};
  width: 25px;
  height: 10px;
  margin-right: 10px;
`;

export default function PercentageName({ category, percentage, sum, color }) {
  return (
    <NameTag>
      <ColorBox color={color} />
      <span>
        {category}: {sum}원 ({percentage.toFixed(2)}%)
      </span>
    </NameTag>
  );
}
