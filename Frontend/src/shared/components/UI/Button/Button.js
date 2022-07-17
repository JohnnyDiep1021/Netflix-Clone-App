import { Link, NavLink } from "react-router-dom";

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
    switch (props.element) {
      case "link":
        return (
          <Link
            to={props.to}
            exact={props.exact}
            onClick={props.onClick}
            className={`${props.className}`}
            target={props.target}
          >
            {props.children}
          </Link>
        );
      case "navLink":
        return (
          <NavLink
            to={props.to}
            exact={props.exact}
            onClick={props.onClick}
            className={`${props.className}`}
            target={props.target}
          >
            {props.children}
          </NavLink>
        );
    }
  }
  return (
    <button
      className={props.className}
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
