import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Payment from "./Payment";

import Modal from "../../../shared/components/UI/Modal/Modal";

const stripeTestPromise = loadStripe(`${process.env.STRIPE_PUBLIC_KEY}`);

function StripeContainer() {
  return (
    <Modal show={true}>
      {/* <Elements stripe={stripeTestPromise}>
      </Elements> */}
      <Payment />
    </Modal>
  );
}

export default StripeContainer;
