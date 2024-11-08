import React, { useContext } from "react";
import { AuntContext } from "../context/AuntProvider";
import { Link } from "react-router-dom";

const Profile = ({ user }) => {
  // console.log(user.photoURL);\
  const { logout } = useContext(AuntContext);
  const hendleLogout = () => {
    logout()
      .then(() => {
        alert("logout successfully");
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div>
      <div className="drawer drawer-end z-40">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full z-0">
              {user.photoURL ? (
                <img alt="" src={user.photoURL} />
              ) : (
                <img
                  alt=""
                  src="https://i.ibb.co/4pVJy6S/user.png"
                />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <a href="/update-profile">Profile</a>
            </li>
            <li>
              <Link to="/order">Order</Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <Link to="/dashboard">dasboard</Link>
            </li>
            <li>
              <a onClick={hendleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
