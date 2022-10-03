import React from "react";

import "./LoadingSpinner.scss";

const LoadingSpinner = (props) => {
  return (
    <div
      className={`${props.asOverlay && "loading-spinner__overlay"} ${
        props.inherit && "bg-inherit"
      }`}
      style={props.style}
    >
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
