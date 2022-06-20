import react, { useState, useEffect } from "react";
import reactDom from "react-dom";

import "./Modal.scss";

const Backdrop = (props) => {
  return reactDom.createPortal(
    <div className={`backdrop`} onClick={props.onClose}></div>,
    document.getElementById("backdrop-hook")
  );
};

const ModalOverlay = (props) => {
  let content;
  switch (props.element) {
    case "popup":
      content = (
        <div
          className={`modal popup ${props.className} ${
            !props.show && "popup-hidden"
          }`}
          style={props.style}
        >
          <header className={`modal__header ${props.headerClass}`}>
            <h2>{props.header || "Warning"}</h2>
          </header>
          <form
            onSubmit={
              props.onSubmit
                ? props.onSubmit
                : (event) => event.preventDefault()
            }
          >
            <div className={`modal__content ${props.contentClass}`}>
              {props.children}
            </div>
            <footer className={`modal__footer ${props.footerClass}`}>
              {props.footer}
            </footer>
          </form>
        </div>
      );
      break;
    default:
      content = (
        <div
          className={`modal ${!props.show && "popup-hidden"} ${
            props.className
          }`}
          style={props.style}
        >
          {props.children}
        </div>
      );
  }
  return reactDom.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  // console.log(props.onClose, props.show);
  const [isRemoved, setIsRemoved] = useState(false);
  useEffect(() => {
    // console.log(props.isClose);
    let timer;
    if (!props.show) {
      // console.log(`check`);
      timer = setTimeout(() => {
        setIsRemoved(false);
      }, 350);
    } else setIsRemoved(true);
    return () => {
      // console.log(`Clean up side-effect!`);
      clearTimeout(timer);
    };
  }, [props.show]);
  // console.log(isRemoved);
  return (
    <react.Fragment>
      {props.show && <Backdrop onClose={props.onClose} />}
      {isRemoved && <ModalOverlay {...props}>{props.children}</ModalOverlay>}
    </react.Fragment>
  );
};

export default Modal;
