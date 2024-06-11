import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { getLocalStorege } from "../Hooks/LocalStorage";
import { setData as setDataAction } from "../redux/slice/historySlice";
const Wrap = styled.div`
  max-width: 100%;
  background-color: #fff;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @font-face {
    font-family: "Pretendard-Regular";
    src: url("/assets/fonts/Pretendard-Regular.woff") format("woff");
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: "Pretendard-SemiBold";
    src: url("/assets/fonts/Pretendard-SemiBold.woff") format("woff");
    font-weight: 500;
    font-style: normal;
  }

  * {
    font-family: "Pretendard-Regular";
  }
`;

export default function DefaultLayout() {
  const data = useSelector((state) => state.history.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedData = getLocalStorege("data");
    if (savedData) {
      dispatch(setDataAction(savedData));
    } else {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, []);

  return (
    <Wrap>
      <Outlet />
    </Wrap>
  );
}
