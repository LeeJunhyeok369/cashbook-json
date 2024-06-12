import React from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuthStore from "../zustand/store";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuthStore();
  console.log(token);
  if (!token) {
    Swal.fire({
      icon: "warning",
      title: "비로그인",
      text: "로그인 후 이용 가능한 서비스 입니다.",
    });
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
