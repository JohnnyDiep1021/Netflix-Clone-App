import { Link } from "react-router-dom";

import "./Button.scss";

const Button = (props) => {
  if (props.href) {
    return (
      <a
        className={`${props.className}`}
        href={props.href}
        target={props.target}
        onClick={props.onClick}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        onClick={props.onClick}
        className={`${props.className} ${props.approved && "approved"} ${
          props.declined && "declined"
        } ${props.pending && "pending"} ${props.edit && "edit"}`}
        target={props.target}
      >
        {props.approved && "Approve"} {props.declined && "Declined"}
        {props.pending && "Pending"}
        {props.edit && "Edit"}
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`${props.className} ${props.approved && "approved"} ${
        props.declined && "declined"
      } ${props.pending && "pending"} ${props.edit && "edit"}`}
      type={props.type || "button"}
      onClick={props.onClick}
      onBlur={props.onBlur}
      disabled={props.disabled}
    >
      {props.approved && "Approve"} {props.declined && "Declined"}
      {props.pending && "Pending"}
      {props.edit && "Edit"}
      {props.children}
    </button>
  );
};

export default Button;
