import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/Shoping/Menu";
import Signup from "../component/Signup";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CardPage from "../pages/Shoping/CardPage";
import DahsboardLayout from "../layout/DahsboardLayout";
import PrivateRouter from "../PrivateRouters/PrivateRouter";
import Dashboard from "../pages/dashboard/admin/dashboard";
import Users from "../pages/dashboard/admin/Users";
import Login from "../component/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/card-page",
        element: <CardPage />,
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DahsboardLayout />
      </PrivateRouter>
    ),
    children: [
      {
        // Menggunakan relative path
        path: "users",
        element: <Users />,
      },
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },
]);


export default router;
