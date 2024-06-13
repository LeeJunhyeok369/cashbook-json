import axios from "axios";
import Swal from "sweetalert2";

const AUTH_HOST = "https://moneyfulpublicpolicy.co.kr";

export const LoginApi = async (id, pw) => {
  try {
    const response = await axios.post(AUTH_HOST + "/login", {
      id: id,
      password: pw,
    });
    Swal.fire({
      icon: "success",
      title: "로그인 완료",
      text: response.data.nickname + "님 환영합니다!",
    });
    return response;
  } catch (error) {
    Swal.fire({
      icon: "warning",
      title: "로그인 실패",
      text: "아이디나 비밀번호가 틀렸습니다.",
    });
    return error;
  }
};

export const JoinApi = async (id, pw, nickname) => {
  try {
    const response = await axios.post(AUTH_HOST + "/register", {
      id: id,
      password: pw,
      nickname: nickname,
    });
    Swal.fire({
      icon: "success",
      title: "회원가입이 완료",
      text: nickname + "님 환영합니다! 로그인 후 이용 가능합니다.",
    });
    return response;
  } catch (error) {
    Swal.fire({
      icon: "warning",
      title: "에러",
      text: "존재하는 아이디 이거나 닉네임 입니다.",
    });
    return error;
  }
};

export const UserInfoApi = async (token) => {
  try {
    const response = await axios.get(AUTH_HOST + "/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
export const UserInfoUpdateApi = async (token, img, name) => {
  try {
    const formData = new FormData();
    formData.append("avatar", img);
    formData.append("nickname", name);

    const response = await axios.patch(AUTH_HOST + "/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire({
      icon: "success",
      title: "사용자 정보 수정 완료",
      text: name + "님의 사용자 정보가 수정되었습니다.",
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user info:", error);
    throw error;
  }
};
