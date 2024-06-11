import React from "react";
import styled from "styled-components";
import InputForm from "./InputForm";

const Title = styled.h1`
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.3rem;
  text-align: center;
  line-height: 3rem;
  padding: 0 10%;
  font-weight: bold;
  word-break: keep-all;
`;

const LeftStyle = styled.div`
  width: 30%;
  height: 100%;
  background-color: #d5e3ff;
`;

export default function LeftForm() {
  return (
    <LeftStyle>
      <Title>개인 지출 관리 애플리케이션</Title>
      <InputForm />
    </LeftStyle>
  );
}
