import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {FaHeart} from 'react-icons/fa'
import { AuntContext } from "../context/AuntProvider";
const Cards = ({ item }) => {
  const {name, image, price, recipe, _id } = item
    const[isHeartFilltered, setIsHeartFilled] = useState(false);
    const {user} = useContext(AuntContext)
    // console.log(user)
    // handleAddToCart
    const handleAddToCart = (item) => {
        // console.log("added to cart", item);
        if (user && user?.email) {
            // add to cart
            const cartItem = {menuItenId: _id, name, quantity: 1,image, price, email: user.email};
            console.log(cartItem)
        } else {
          
        }
    }

    const handleHeartClick = () => {
        setIsHeartFilled(!isHeartFilltered);
    }
  return (
    <div  className="card bg-base-100 w-96 shadow-xl relative">
        <div className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${isHeartFilltered ? "text-rose-500" : "text-white"}`}
        onClick={handleHeartClick}
        >
            <FaHeart className="h-5 w5 cursor-pointer"/>
        </div>
      <Link key={item._id} to={`/menu/${item._id}`}>
        <figure>
          <img src={item.image} 
          alt=""
          className="hover:scale-105 transition-all duration-200 md:h-72" />
        </figure>
      </Link>
      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        <p>descpription of the foods</p>
        {/* <p>{item.recipe}</p> */}
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">${""}</span> {item.price}
          </h5>
          <button className="btn bg-green text-white" onClick={() => handleAddToCart(item)}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
