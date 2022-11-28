import { Link, NavLink } from "react-router-dom";

import { Tooltip } from "@mui/material";

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
        if (props.toolTip) {
          return (
            <div>
              <Tooltip
                title={
                  <span style={{ fontSize: props.toolTip?.fontSize || "14px" }}>
                    {props.toolTip?.title || ""}
                  </span>
                }
                placement={props.toolTip?.placement || "top"}
                arrow
              >
                <Link
                  to={props.to}
                  exact={props.exact}
                  onClick={props.onClick}
                  className={`${props.className}`}
                  target={props.target}
                >
                  {props.children}
                </Link>
              </Tooltip>
            </div>
          );
        }
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
      </div>
    );
  }
  if (props.toolTip) {
    return (
      <Tooltip
        title={
          <span style={{ fontSize: props.toolTip?.fontSize || "14px" }}>
            {props.toolTip?.title || ""}
          </span>
        }
        placement={props.toolTip?.placement || "top"}
        arrow
      >
        <button
          className={props.className}
          type={props.type || "button"}
          onClick={props.onClick}
          disabled={props.disabled}
          alt={props.alt}
        >
          {props.children}
        </button>
      </Tooltip>
    );
  }
  return (
    <button
      className={props.className}
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      alt={props.alt}
    >
      {props.children}
    </button>
  );
};

export default Button;
