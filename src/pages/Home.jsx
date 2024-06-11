import React from "react";
import styled from "styled-components";
import LeftForm from "./../components/LeftForm";
import RightList from "./../components/RightList";

const Flex = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const InnerWrap = styled.div`
  width: 80%;
  min-width: 1100px;
  height: 85%;
  min-height: 700px;
  background-color: #fff;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

export default function Home() {
  return (
    <InnerWrap>
      <Flex>
        <LeftForm />
        <RightList />
      </Flex>
    </InnerWrap>
  );
}
