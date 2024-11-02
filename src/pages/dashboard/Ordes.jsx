import React from "react";
// import { AuntContext } from "../../context/AuntProvider";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const Ordes = () => {
  const {user} = useAuth
  const token = localStorage.getItem('access-token')
  const {refetch,data: orders = []} = useQuery({
      queryKey: ['payments', user?.email],
      queryFn: async () => {
          const res = await fetch(`http://localhost:6001/payments?email=${user?.email}`, {
            headers: {
              authorization: `bearer ${token}`
            }
          })
          return res.json()
        },
  })
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
      {(orders.length > 0) ? <div>
        <div className="">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-green text-white rounded-sm">
                <tr>
                  <th>#</th>
                  <th>Food</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="font-medium">{item.name}</td>
                    <td>
                      <button
                        className="btn btn-xs"
                        // onClick={() => handleDecrease(item)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={() => console.log(item.quantity)}
                        className="w-10 mx-2 text-center overflow-hidden appearance-none"
                      />
                      <button
                        className="btn btn-xs"
                        // onClick={() => handleIncrease(item)}
                      >
                        +
                      </button>
                    </td>
                    <td>${calculateTotalPrice(item).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-sm border-none text-red bg-transparent"
                        // onClick={() => handleDelete(item)}
                      >
                        {/* <FaTrash /> */}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* foot */}
            </table>
          </div>
        </div>
        <hr />
        <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
          <div className="md:w-1/2 space-y-3">
            <h3 className="text-lg font-semibold">Customer Details</h3>
            <p>Name: {user?.displayName || "None"}</p>
            <p>Email: {user?.email}</p>
            <p>
              User_id: <span className="text-sm">{user?.uid}</span>
            </p>
          </div>
          <div className="md:w-1/2 space-y-3">
            <h3 className="text-lg font-semibold">Shopping Details</h3>
            {/* <p>Total Items: {cart.length}</p> */}
            <p>
              Total Price:{" "}
              <span id="total-price">${orderTotal.toFixed(2)}</span>
            </p>
            <button className="btn btn-md bg-green text-white px-8 py-1">
              Procceed to Checkout
            </button>
          </div>
        </div>
      </div> : <div className="text-center mt-20">
        <p>Cart is empty. Please add products.</p>
        {/* <Link to="/menu"><button className="btn bg-green text-white mt-3">Back to Menu</button></Link> */}
      </div>
      }
      </div>
    </div>
  );
};

export default Ordes;
