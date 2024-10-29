import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FaPaypal } from "react-icons/fa";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [cardError, setCardError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log(error);
      setCardError(error.message);
    } else {
      console.log(paymentMethod);
      setCardError("payment success");
    }
    // console.log("payment success");
  };
  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8">
      {/* left content */}
      <div className="sm:w-1/2 w-full space-y-3">
        <h4 className="text-lg font-semibold"> Order Summary </h4>
        <p>Total price: ${price}</p>
        <p>Total items: {cart.length}</p>
      </div>

      {/* right content */}
      <div className="sm:w-1/3 w-full space-y-3 card bg-base-100 max-w-sm shrink-0 shadow-xl px-4 py-8">
        <h4 className="text-lg font-semibold"> Process Your Payment </h4>
        <h5>Credit/Debit Card</h5>
        {/* stripe form payment */}
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={!stripe}
            className="btn btn-sm mt-5  btn-primary w-full text-white my-4"
          >
            Pay
          </button>
        </form>
        {cardError ? <p className="text-red italic text-bold">{cardError} </p> : ""}

        {/* paypal */}

        <div className="mt-5 text-center">
          <hr />
          <button
            type="submit"
            disabled={!stripe}
            className="btn btn-sm mt-5 bg-orange-500 text-white"
          >
            <FaPaypal /> Pay with Paypal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
