import React, { useContext } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuntContext } from "../../context/AuntProvider";

const CardPage = () => {
  const [card, refetch] = useCart();
  const {user} = useContext(AuntContext)

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:6001/cards/${item._id}`, { method: "DELETE" })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div className="section-container">
      {/* benner */}
      <div className="bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-32 flex flex-col  justify-center items-center ">
          {/* text */}
          <div className="px-4 space-y-7">
            <h2 className="md:text-5xl text-3xl font-bold md:leading-snug leading-snug m-0 ">
              Items Added To Cart
              <span className="text-green"> Food</span>
            </h2>
          </div>
        </div>
      </div>
      {/* table for card */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-green rounded-full text-white">
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Items Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {card.map((item, index) => (
                <tr key={item._id}>
                  <th>
                    <td>{index + 1}</td>
                  </th>
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
                  <td className="font-medium">
                    {item.name}
                    <br />
                    <span className="badge badge-ghost badge-sm"></span>
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <th>
                    <button
                      className="btn btn-ghost text-red btn-xs"
                      onClick={() => handleDelete(item)}
                    >
                      <FaTrash />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            {/* <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th></th>
              </tr>
            </tfoot> */}
          </table>
        </div>
      </div>
      {/* customer details */}
      <div className="my-12 flex md:flex-row flex-col justify-between">
        <div className="md:w-1/2 space-y-3">
        <h3>Customer Details :</h3>
        <p>Name: {user.displayName}</p>
        <p>Emai: {user.email}</p>
        <p>User Id: {user.uid}</p>
        </div>
        <div className="md:w-1/2 space-y-3">
        <h3>Order Details :</h3>
        <p >Total Items: <span className="text-red">{card.length}</span> </p>
        <p>Total Price: $00.00</p>
        <button className="btn bg-green text-white ">Procceed checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
