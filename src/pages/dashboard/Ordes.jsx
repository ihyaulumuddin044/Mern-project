import React from "react";
// import { AuntContext } from "../../context/AuntProvider";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Ordes = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("access-token");
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:6001/payments?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });

  // format date
  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
    
  }
  return (
    <div className="max-w-screen-2xl countainer mx-auto xl:px-24 px-4">
      <div className="bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-32 flex flex-col  justify-center items-center ">
          {/* text */}
          <div className="px-4 space-y-7">
            <h2 className="md:text-5xl text-3xl font-bold md:leading-snug leading-snug m-0 ">
              Track All Your
              <span className="text-green"> Order</span>
            </h2>
          </div>
        </div>
      </div>

      {/* table */}
      <div>
        {orders.length > 0 ? (
          <div>
            <div className="">
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead className="bg-green text-white rounded-sm">
                    <tr>
                      <th>#</th>
                      <th>Order Date</th>
                      <th>TransitionId</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{formatDate(item.createdAt)}</td>
                        <td className="font-medium">{item.transactionId}</td>
                        <td>$ {item.price}</td>
                        {/* <td>${calculateTotalPrice(item).toFixed(2)}</td> */}
                        <td>{item.status}</td>
                        <td>
                          <Link to="/contact"
                            className="btn btn-sm border-none text-red bg-transparent"
                            // onClick={() => handleDelete(item)}
                          >
                            contact
                            {/* <FaTrash /> */}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {/* foot */}
                </table>
              </div>
            </div>
            <hr />
          </div>
        ) : (
          <div className="text-center mt-20">
            <p>Cart is empty. Please add products.</p>
            {/* <Link to="/menu"><button className="btn bg-green text-white mt-3">Back to Menu</button></Link> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Ordes;
