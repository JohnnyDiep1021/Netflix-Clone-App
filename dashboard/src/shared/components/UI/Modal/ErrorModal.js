import React from "react";

import Modal from "./Modal";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

import "./ErrorModal.scss";

const ErrorModal = (props) => {
  if (props.type === "popup") {
    return (
      <Modal
        element="popup"
        onClose={props.onClose}
        header="An Error Occurred!"
        show={!!props.error}
        footer={
          <Button onClick={props.onClose} className="btn-popup btn--danger">
            Okay
          </Button>
        }
      >
        <p>{props.error}</p>
      </Modal>
    );
  }
  let errorMsg;
  switch (props.content) {
    case "password":
      errorMsg = (
        <div className="inline-message" onClick={props.onlosek}>
          <b>{props.error}</b>
          <span> Please try again!</span>
        </div>
      );
      break;
    case "email":
      errorMsg = (
        <div className="inline-message" onClick={props.onClose}>
          <p>
            {props.error} Please try again or
            <Link to="/register" target="_blank">
              Create a new account
            </Link>
            .
          </p>
        </div>
      );
      break;
    default:
      errorMsg = (
        <div className="inline-message" onClick={props.onClose}>
          {props.error}
        </div>
      );
  }
  return errorMsg;
};

export default ErrorModal;
