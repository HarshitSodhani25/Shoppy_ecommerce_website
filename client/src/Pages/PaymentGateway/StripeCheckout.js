import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./StripeCheckout.css";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../../features/order/orderSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51NbHKvSHF6YwTbleAzW8Qkxj9JzqnyPr5kKICiT7AG1yd9nee2qICmGJE9zvD4TvYPPFcsI91EkOY8Xb3PM49UpZ00lvRuOvAX");

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectCurrentOrder)

  useEffect(() => {
    if(currentOrder){
      // Create PaymentIntent as soon as the page loads
      fetch("/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalAmount: currentOrder.totalSum, orderId: currentOrder.id}),
        metadata: {
          order_id: currentOrder.id 
          //this info will go to stripe => and then to our webhook
          //so we can conclude that payment was successfull, even if client closes the payment window 
        }
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [currentOrder]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="StripeCheckout">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}