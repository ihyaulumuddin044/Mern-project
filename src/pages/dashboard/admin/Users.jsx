import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaTrashAlt, FaUser, FaUsers } from "react-icons/fa"
// import User from '../../../../../Foodis-server/api/models/User'
// import axios from 'axios'

const Users = () => {
  // const axiosSecure = useAxiosSecure()
  const { refact, data: users = [] } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:6001/user`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      console.log();
      // const data = await res.json();
      // console.log('Data fetched from API:', data); // Tambahkan ini untuk memeriksa respons
      // return data;
      return res.json();
    },
  });
  console.log(users);
  return (
    <div>
      <div className="flex justify-between items-center m-4">
        <h5>all users</h5>
        <h5>total user: {users.length}</h5>
      </div>
      {/* table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            {/* head */}
            <thead className="bg-green font-bold text-white">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{
                    user.role === "admin" ? "admin" : (
                      <button className="btn btn-circle btn-xs bg-orange-500 text-white"><FaUsers /></button>
                    )
                    }</td>
                  <td>
                    <button className="btn btn-ghost btn-xs bg-red"><FaTrashAlt className="text-white"/> </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
