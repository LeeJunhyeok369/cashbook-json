import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyleHistory = styled(Link)`
  width: 94%;
  background-color: #ffffff;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3%;
  margin-top: 1.3rem;
  border-radius: 15px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #5383e8;
  text-decoration: none;

  > div {
    width: 80%;
  }

  span {
    font-size: 1rem;
    line-height: 10px;
    color: #ddd;
  }

  p {
    line-height: 30px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default function History({ id, date, item, amount, description }) {
  const dateArr = date.split("-");

  return (
    <StyleHistory to={"/detail/" + id} id={id}>
      <div>
        <span>
          {dateArr[0]}년 {dateArr[1]}월 {dateArr[2]}일
        </span>
        <p>
          {item} - {description}
        </p>
      </div>
      <h5>{amount} 원</h5>
    </StyleHistory>
  );
}
