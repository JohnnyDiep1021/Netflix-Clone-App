import React, { useState } from "react";
import { useSelector } from "react-redux";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import StripeCheckout from "react-stripe-checkout";

import Modal from "../../../shared/components/UI/Modal/Modal";
import Button from "../../../shared/components/UI/Button/Button";

import "./Payment.scss";

function Payment(props) {
  const token = useSelector((state) => state.auth.token);
  const { sendRequest } = useHttpClient();
  const [product, setProduct] = useState({
    name: "Netflix premium membership",
    price: 10,
    productBy: "Netflix",
  });

  console.log(process.env.STRIPE_PUBLIC_KEY);
  const proceedPayment = async (stripeToken) => {
    try {
      console.log(stripeToken);
      const responseData = sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/payment`,
        "POST",
        JSON.stringify({
          token: stripeToken,
          product,
        }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(responseData);
    } catch (err) {}
  };
  return (
    <Modal show={false}>
      <StripeCheckout
        // stripeKey={`${process.env.STRIPE_PUBLIC_KEY}`}
        stripeKey={`${process.env.STRIPE_PUBLIC_KEY}`}
        token={proceedPayment}
        name="Netflix Upgrade Membership"
        amount={product.price * 100}
      >
        <Button className="btn">Pay $10</Button>
      </StripeCheckout>
    </Modal>
  );
}

export default Payment;
