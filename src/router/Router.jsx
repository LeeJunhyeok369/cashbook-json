import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import DefaultLayout from "../layout/DefaultLayout";
import RouterData from "./RouterData";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: RouterData.map((route) => {
      if (route.withAuth) {
        return {
          path: route.path,
          element: <ProtectedRoute>{route.element}</ProtectedRoute>,
        };
      } else {
        return {
          path: route.path,
          element: route.element,
        };
      }
    }),
  },
]);

export default router;
