import { useQuery } from "@tanstack/react-query";
import React from "react";
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
      <div>
        <h5>all users</h5>
        <h5>total user: {users.length}</h5>
      </div>
    </div>
  );
};

export default Users;
