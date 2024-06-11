import React from "react";
import styled from "styled-components";

const Percentage = styled.div`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${(props) => props.color};
  transition: width 0.3s;
`;

export default function PercentageBar({ width, color }) {
  return <Percentage width={width} color={color}></Percentage>;
}
