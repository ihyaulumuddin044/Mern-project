import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/Shoping/Menu";
import Signup from "../component/Signup";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CardPage from "../pages/Shoping/CardPage";
import DahsboardLayout from "../layout/DahsboardLayout";
// import PrivateRouter from "../PrivateRouters";


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
        element:<Menu />,
      },
      {
        path: "/card-page",
        element:<CardPage />,
      },
      {
        path: "/update-profile",
        element:<UpdateProfile />,
      },

    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <DahsboardLayout />,
  },
]);

export default router;
