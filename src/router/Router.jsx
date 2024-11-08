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
import Addmenu from "../pages/dashboard/admin/Addmenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Payment from "../pages/Shoping/Payment";
import Ordes from "../pages/dashboard/Ordes";

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
        path: "/order",
        element: <Ordes />,
      },
      {
        path: "process-payment",
        element: <Payment />,
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
      {
        path: "add-menu",
        element: <Addmenu/>,
      },
      {
        path: "manage-items",
        element: <ManageItems/>,
      },
      {
        path: "update-menu/:id",
        element: <UpdateMenu/>, 
        loader: ({params}) => fetch(`http://localhost:6001/menu/${params.id}`),
      }
    ],
  },
]);


export default router;
