import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import {
  FaEdit,
  FaLocationArrow,
  FaPlus,
  FaPlusCircle,
  FaQuestionCircle,
  FaRegUser,
  FaShoppingBag,
  FaUser,
} from "react-icons/fa";

import Logo from "../../public/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import Modal from "../component/Modal";
import Signup from "../component/Signup";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <MdDashboard />
        Home
      </Link>
    </li>
    <li>
      <Link to="/menus">
        <FaCartShopping />
        menus
      </Link>
    </li>
    <li>
      <Link to="/menus">
        <FaLocationArrow />
        Order Tracing
      </Link>
    </li>
    <li>
      <Link to="/menus">
        <FaQuestionCircle />
        Customers Support
      </Link>
    </li>
  </>
);
const DahsboardLayout = () => {
  const {loading} = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  return (
    <div>

      {
        isAdmin ? (<div>
          <div className="drawer sm:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col sm:items-center sm:justify-center">
              {/* Page content here */}
              <div className="flex justify-between items-center mx-4">
                <label
                  htmlFor="my-drawer-2"
                  className="btn btn-primary drawer-button lg:hidden"
                >
                  <MdDashboardCustomize />
                </label>
                <button className="btn rounded-full px px-6 bg-green text-white sm:hidden">
                  <FaRegUser />
                  Logout
                </button>
              </div>
              <div className="mt-5 md:mt-2 mx-4">
                <Outlet />
              </div>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <li>
                  <Link to="/dashboard" className="flex justify-start">
                    <img src={Logo} className="w-30" />
                    <span className="badge badge-primary">admin</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <MdDashboard />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <FaShoppingBag />
                    Manege Booking
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <FaPlusCircle />
                    Add Menu
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <FaEdit />
                    Manage item
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/dashboard/users">
                    <FaUser />
                    All Users
                  </Link>
                </li>
                {/* shared nav links */}
                {sharedLinks}
              </ul>
            </div>
          </div>
        </div>) : (loading ? <Login/> : <div className="h-screen flex justify-center items-center"><Link to="/"><button className="btn bg-green text-white">Back to Home</button></Link></div>)
    }
    </div>
  );
};

export default DahsboardLayout;
