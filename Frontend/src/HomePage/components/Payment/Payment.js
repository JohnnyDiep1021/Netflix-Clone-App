import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import StripeCheckout from "react-stripe-checkout";

import Button from "../../../shared/components/UI/Button/Button";

import "./Payment.scss";

function Payment(props) {
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);
  const { sendRequest } = useHttpClient();
  const [product, setProduct] = useState({
    name: "Netflix premium membership",
    price: 10,
    productBy: "Netflix",
  });

  console.log();
  const proceedPayment = async (stripeToken) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/payment`,
        "POST",
        JSON.stringify({
          stripeToken,
          product,
        }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      // console.log(responseData);
      if (responseData.success) {
        history.push("/");
      }
    } catch (err) {}
  };
  return (
    <StripeCheckout
      stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
      token={proceedPayment}
      name="Netflix Upgrade Membership"
      amount={product.price * 100}
    >
      <Button className="btn btn-bubble">Upgrade to premium</Button>
    </StripeCheckout>
  );
}

export default Payment;
