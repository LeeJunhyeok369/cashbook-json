import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setAuthToken } from "../Hooks/LocalStorage";
import { LoginApi, UserInfoApi } from "../api/api.Auth";
import Input from "../components/Input";
import useAuthStore from "../zustand/store.Auth";
import useUserStore from "../zustand/store.User";

const LoginContainer = styled.form`
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
    cursor: "pointer";
  }
`;

export default function Login() {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useUserStore();

  const userIdRef = useRef(null);
  const userPwRef = useRef(null);

  const [isFormValid, setIsFormValid] = useState(false);

  const checkFormValidity = () => {
    const userId = userIdRef.current?.value;
    const userPw = userPwRef.current?.value;
    setIsFormValid(userId?.trim() !== "" && userPw?.trim() !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = userIdRef.current.value;
    const userPw = userPwRef.current.value;
    console.log("UserId:", userId, "UserPw:", userPw);
    const response = await LoginApi(userId, userPw);

    if (response.data?.success) {
      setAuthToken(response.data.accessToken);
      setToken(response.data.accessToken);
      const userInfo = await UserInfoApi(response.data.accessToken);
      console.log(userInfo);
      setUser(userInfo);
      navigate("/");
    }
  };

  return (
    <LoginContainer onSubmit={handleSubmit} isFormValid={isFormValid}>
      <h3>로그인</h3>
      <Input
        forwardedRef={userIdRef}
        label="아이디"
        onChange={checkFormValidity}
      />
      <Input
        forwardedRef={userPwRef}
        label="비밀번호"
        type="password"
        onChange={checkFormValidity}
      />
      <button id="save" type="submit" disabled={!isFormValid}>
        로그인
      </button>
      <Link to="/join">회원가입</Link>
    </LoginContainer>
  );
}
