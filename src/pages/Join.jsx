import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { JoinApi } from "../api/api.Auth";
import Input from "../components/Input";

const JoinContainer = styled.form`
  width: 500px;
  padding: 50px 30px;
  background-color: #f5f5f5;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  > h3 {
    color: #000;
    text-align: center;
    line-height: 50px;
    font-size: 2rem;
  }

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
  > a {
    width: 100%;
    text-align: center;
    height: 50px;
    line-height: 50px;
    background-color: #333;
    color: #fff;
    border: 0;
    border-radius: 1rem;
    margin-top: 1rem;
    font-size: 1.05rem;
    display: block;
    text-decoration: none;
    cursor: pointer;
  }
`;

export default function Join() {
  const navigate = useNavigate();

  const userIdRef = useRef(null);
  const userPwRef = useRef(null);
  const userPwChkRef = useRef(null);
  const userNameRef = useRef(null);

  const [isFormValid, setIsFormValid] = useState(false);

  const checkFormValidity = () => {
    const userId = userIdRef.current?.value;
    const userPw = userPwRef.current?.value;
    const userPwChk = userPwChkRef.current?.value;
    const userName = userNameRef.current?.value;
    setIsFormValid(
      userId?.trim().length >= 4 &&
        userPw?.trim().length >= 6 &&
        userPwChk === userPw &&
        userName?.trim().length >= 2
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = userIdRef.current.value;
    const userPw = userPwRef.current.value;
    const userName = userNameRef.current.value;
    console.log("UserId:", userId, "UserPw:", userPw, "UserName:", userName);
    const response = await JoinApi(userId, userPw, userName);
    if (response.data?.success) {
      navigate("/login");
    }
  };

  return (
    <JoinContainer onSubmit={handleSubmit} isFormValid={isFormValid}>
      <h3>회원가입</h3>
      <Input
        forwardedRef={userIdRef}
        label="아이디"
        placeholder="4자 이상"
        onChange={checkFormValidity}
      />
      <Input
        forwardedRef={userPwRef}
        label="비밀번호"
        type="password"
        placeholder="6자 이상"
        onChange={checkFormValidity}
      />
      <Input
        forwardedRef={userPwChkRef}
        label="비밀번호 확인"
        type="password"
        onChange={checkFormValidity}
      />
      <Input
        forwardedRef={userNameRef}
        label="닉네임"
        placeholder="2자 이상"
        onChange={checkFormValidity}
      />
      <button id="save" type="submit" disabled={!isFormValid}>
        회원가입
      </button>
      <Link to="/login">로그인</Link>
    </JoinContainer>
  );
}
