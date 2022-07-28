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
          <div>
            <Link
              to={props.to}
              exact={props.exact}
              onClick={props.onClick}
              className={`${props.className}`}
              target={props.target}
            >
              {props.children}
            </Link>
          </div>
        );
      case "navLink":
        return (
          <div>
            <NavLink
              to={props.to}
              exact={props.exact}
              onClick={props.onClick}
              className={`${props.className}`}
              target={props.target}
            >
              {props.children}
            </NavLink>
          </div>
        );
      default:
    }
  }
  if (props.element === "sub-btn") {
    return (
      <div>
        <span className="btn-title">title</span>
        <button
          className={props.className}
          type={props.type || "button"}
          onClick={props.onClick}
          disabled={props.disabled}
          alt={props.alt}
        >
          {props.children}
        </button>
        ;
      </div>
    );
  }
  return (
    // <div>
    // <title>title</title>
    <button
      className={props.className}
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      alt={props.alt}
    >
      {props.children}
    </button>
    // </div>
  );
};

export default Button;
