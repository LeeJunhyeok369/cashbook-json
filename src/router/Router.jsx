import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import DefaultLayout from "../layout/DefaultLayout";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Join from "../pages/Join";
import Login from "../pages/Login";
import Mypage from "../pages/Mypage";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/detail/:id",
        element: (
          <ProtectedRoute>
            <Detail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/join",
        element: <Join />,
      },
      {
        path: "/mypage",
        element: (
          <ProtectedRoute>
            <Mypage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
