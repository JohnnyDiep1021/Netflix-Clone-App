import react from "react";
import reactDom from "react-dom";
import { CSSTransition } from "react-transition-group";

import { ANIMATION_TIMEOUT, ANIMATION_STYLE } from "../../../util/util";

import "./Modal.scss";

const Backdrop = (props) => {
  if (props.inline)
    return <div className={`backdrop`} onClick={props.onClose}></div>;

  return reactDom.createPortal(
    <div className={`backdrop`} onClick={props.onClose}></div>,
    document.getElementById("backdrop-hook")
  );
};

const ModalOverlay = (props) => {
  let content;
  switch (props.element) {
    case "warning":
      content = (
        <div className={`modal popup ${props.className}`} style={props.style}>
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
    case "message":
      content = (
        <div className={`modal msg ${props.className}`} style={props.style}>
          <div className={`modal__content ${props.contentClass}`}>
            {props.children}
          </div>
        </div>
      );
      break;
    default:
      content = (
        <div
          // className={`modal ${!props.show && "popup-hidden"} ${
          //   props.className
          // }`}
          className={`modal ${props.className}`}
          style={props.style}
        >
          {props.children}
        </div>
      );
      if (props.inline) return content;
  }
  return reactDom.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  // console.log(props.onClose, props.show);

  return (
    <react.Fragment>
      <CSSTransition
        in={props.show && !props.message}
        mountOnEnter
        unmountOnExit
        timeout={ANIMATION_TIMEOUT.popupAniTiming}
        classNames={ANIMATION_STYLE.popup}
      >
        <Backdrop onClose={props.onClose} inline={props.inline} />
      </CSSTransition>
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={props.aniTiming || ANIMATION_TIMEOUT.slideAniTiming}
        classNames={props.aniClassNames || ANIMATION_STYLE.slide}
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </react.Fragment>
  );
};

export default Modal;
