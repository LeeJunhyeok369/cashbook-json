import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Join from "../pages/Join";
import Login from "../pages/Login";
import Mypage from "../pages/Mypage";

const RouterData = [
  {
    id: 0,
    path: "/",
    label: "Home",
    element: <Home />,
    withAuth: true,
  },
  {
    id: 1,
    path: "/detail/:id",
    label: "Detail",
    element: <Detail />,
    withAuth: true,
  },
  {
    id: 2,
    path: "/login",
    label: "로그인",
    element: <Login />,
    withAuth: false,
  },
  {
    id: 3,
    path: "/join",
    label: "회원가입",
    element: <Join />,
    withAuth: false,
  },
  {
    id: 4,
    path: "/mypage",
    label: "마이페이지",
    element: <Mypage />,
    withAuth: true,
  },
];

export default RouterData;
