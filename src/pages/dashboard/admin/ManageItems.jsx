import React from "react";
import useMenu from "../../../hooks/useMenu";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageItems = () => {
  const [menu, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();

  const handleDelete = (item) => {
    // console.log(item);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        // console.log(res);
        if (res) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };
  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Manage All <span className="text-green">Menu Item</span>
      </h2>

      {/* menu table items */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <Link to={`/dashboard/update-menu/${item._id}`}>
                      <button className="btn btn-ghost btn-xs bg-orange-500 text-white center">
                        <FaEdit />
                      </button>
                    </Link>
                  </td>
                  <th>
                    <button
                      onClick={() => handleDelete(item)}
                      className="btn btn-ghost btn-xs text-red"
                    >
                      <FaTrashAlt />
                    </button>
                  </th>
                </tr>
              ))}
              {/* row 1 */}
            </tbody>
            {/* foot */}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
