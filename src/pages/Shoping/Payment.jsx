import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import useCart from "../../hooks/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_Sripe_PK);
// console.log(import.meta.env.VITE_Sripe_PK);

const Payment = () => {
  const [cart] = useCart();
  console.log(cart);

  // calculate total price
  
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28 ">
      <Elements stripe={stripePromise}>
        <CheckoutForm cart={cart} />
      </Elements>
    </div>
  );
};

export default Payment;
