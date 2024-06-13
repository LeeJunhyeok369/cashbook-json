import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserInfoApi, UserInfoUpdateApi } from "../api/api.Auth";
import Input from "../components/Input";
import InputImage from "../components/InputImage";
import useAuthStore from "../zustand/store.Auth";
import useUserStore from "../zustand/store.User";
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
  const { token } = useAuthStore();
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  const userNameRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const checkFormValidity = () => {
    const userName = userNameRef.current?.value;
    setIsFormValid(userName?.trim().length >= 2);
  };

  const handleImageChange = (image) => {
    setSelectedImage(image);
    setIsFormValid(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await UserInfoUpdateApi(
      token,
      selectedImage || user.avatar,
      userNameRef.current?.value
    );
    if (response.success) {
      const userInfo = await UserInfoApi(token);
      await setUser(userInfo);

      navigate("/");
    }
  };

  return (
    <MypageContainer onSubmit={handleSubmit}>
      <Nav />
      <MypageInner isFormValid={isFormValid}>
        <InputImage image={user.avatar} onImageChange={handleImageChange} />
        <Input
          forwardedRef={userNameRef}
          label="닉네임"
          placeholder="2자 이상"
          onChange={checkFormValidity}
        />
        <button id="save" type="submit" disabled={!isFormValid}>
          수정하기
        </button>
      </MypageInner>
    </MypageContainer>
  );
}
