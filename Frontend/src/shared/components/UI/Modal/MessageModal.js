import React from "react";

import { ANIMATION_STYLE, ANIMATION_TIMEOUT } from "../../../util/util";
import Modal from "./Modal";
import Button from "../Button/Button";

export const MessagePopupModal = (props) => {
  return (
    <Modal
      element="warning"
      onClose={props.onClose}
      header="Message"
      headerClass="msg-header"
      contentClass={props.contentClass}
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

export const MessageCornerModal = (props) => {
  return (
    <Modal
      element="message"
      contentClass={props.contentClass}
      show={!!props.show}
      message={props.message}
      aniClassNames={ANIMATION_STYLE.popup}
      aniTiming={ANIMATION_TIMEOUT.popupAniTiming}
    >
      <p>{props.message}</p>
    </Modal>
  );
};
