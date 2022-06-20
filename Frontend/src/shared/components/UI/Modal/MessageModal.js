import React from "react";

import Modal from "./Modal";
import Button from "../Button/Button";

const MessageModal = (props) => {
  return (
    <Modal
      element="popup"
      onClose={props.onClose}
      header="Message"
      headerClass="msg-header"
      show={!!props.message}
      footer={
        <Button onClick={props.onClose} className="btn-popup btn--sucess">
          Okay
        </Button>
      }
    >
      <p>{props.message}</p>
    </Modal>
  );
};

export default MessageModal;
