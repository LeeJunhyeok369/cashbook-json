import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { setAuthToken } from "../Hooks/LocalStorage";
import useAuthStore from "../zustand/store.Auth";
import useUserStore from "../zustand/store.User";

const NavBar = styled.div`
  width: calc(100% - 4rem);
  height: 50px;
  background-color: rgb(76, 117, 206);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  /* border-bottom: 1px solid #ccc; */
  > div {
    display: flex;
    align-items: center;
    color: #fff;
  }
  > div > button {
    all: unset;
    color: #fff;
    cursor: pointer;
    margin-left: 1.5rem;
  }
  > div > div#img {
    width: 35px;
    height: 35px;
    margin-right: 10px;
    border-radius: 35px;
    overflow: hidden;
  }
  > div > div#img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  > a {
    all: unset;
    color: #fff;
    cursor: pointer;
  }
`;

export default function Nav() {
  const { token, setToken } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserStore();

  const Logout = async () => {
    await setAuthToken(null);
    await setToken(null);
    Swal.fire({
      icon: "success",
      title: "로그아웃",
      text: "로그아웃이 되었습니다.",
    });
    navigate("/login");
  };

  return (
    <NavBar>
      {location.pathname == "/mypage" ? (
        <Link to={"/"}>홈</Link>
      ) : (
        <Link to={"/mypage"}>마이페이지</Link>
      )}
      <div>
        <div id="img">
          <img
            src={
              user.avatar == null ? "/image/default-profile.jpg" : user.avatar
            }
            alt=""
          />
        </div>
        <p>{user.nickname}님 환영합니다.</p>
        <button onClick={Logout}>로그아웃</button>
      </div>
    </NavBar>
  );
}
