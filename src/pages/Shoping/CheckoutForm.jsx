import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FaPaypal } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
// import { trace } from "../../../../Foodis-server/api/routes/menuRouters";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof price !== "number" || price <= 1) {
      console.log("price is not valid");
      return;
    }
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      // console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    // criate card element
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
      // console.log(paymentMethod);
      setCardError("payment success");
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonimous",
            email: user?.email || "unknown",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }
    console.log(paymentIntent);
    if (paymentIntent.status === "succeeded") {
      console.log(paymentIntent.id);
      setCardError(` your transactionid is: ${paymentIntent.id}`);

      // paymen info data
      const paymentInfo = {
        email: user.email,
        transactionId: paymentIntent.id,
        price,
        quantity: cart.length,
        status: "Order",
        itemName: cart.map((item) => item.name),
        cartItem: cart.map((item) => item._id),
        menuItem: cart.map((item) => item.menuItemId),
      };
      console.log(paymentInfo);

      // send payment info to the server
      axiosSecure
        .post("/payments", paymentInfo)
        .then((res) => {
          console.log(res.data);
          alert("payment success");
          navigate("/order");
        })
        .catch((error) => {
          console.error(
            "Error sending payment info to server:",
            error.response ? error.response.data : error.message
          );
          alert("Failed to process payment. Please try again." + error.message);
        });
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
        {cardError ? (
          <p className="text-red italic text-bold">{cardError} </p>
        ) : (
          ""
        )}

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
