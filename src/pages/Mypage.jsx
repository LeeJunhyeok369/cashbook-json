import React, { useRef, useState } from "react";
import styled from "styled-components";
import Input from "../components/Input";
import InputImage from "../components/InputImage";
import useAuthStore from "../zustand/store.Auth";
import Nav from "./../components/Nav";

const MypageContainer = styled.form`
  width: 500px;
  background-color: #f5f5f5;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;
const MypageInner = styled.div`
  padding: 10px;
  > button#save {
    width: 100%;
    text-align: center;
    height: 50px;
    line-height: 50px;
    background-color: ${({ isFormValid }) =>
      isFormValid ? "#5383e8" : "#ccc"};
    color: #fff;
    border: 0;
    border-radius: 1rem;
    margin-top: 1rem;
    font-size: 1.05rem;
    cursor: ${({ isFormValid }) => (isFormValid ? "pointer" : "not-allowed")};
  }
`;

export default function Mypage() {
  const userNameRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const { token } = useAuthStore();

  const checkFormValidity = () => {
    const userName = userNameRef.current?.value;
    setIsFormValid(userName?.trim().length >= 2);
  };

  // useEffect(async () => {
  // setUserInfo(await UserInfoApi(token));
  // console.log("userInfo", userInfo);
  // }, []);

  return (
    <MypageContainer>
      <Nav />
      <MypageInner isFormValid={isFormValid}>
        <InputImage />
        <Input
          forwardedRef={userNameRef}
          label="닉네임"
          placeholder="2자 이상"
          onChange={checkFormValidity}
        />
        <button id="save" type="submit">
          수정하기
        </button>
      </MypageInner>
    </MypageContainer>
  );
}
