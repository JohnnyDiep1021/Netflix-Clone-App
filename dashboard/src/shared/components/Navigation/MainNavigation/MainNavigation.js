import React, { useState } from "react";

import { Settings, Notification, Globe } from "../../Icon/Icons";
import "./MainNavigation.scss";

const MainNavigation = (props) => {
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  window.onscroll = () => {
    setIsNavScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={`main-nav ${isNavScrolled && "scroll-active"}`}>
      <div className="nav-container">
        <div className="left">
          <span className="logo">admin board</span>
        </div>
        <div className="right">
          <div className="nav-i-container">
            <Notification className="i-nav" />
            <span className="i-badge">2</span>
          </div>
          <div className="nav-i-container">
            <Globe className="i-nav" />
            <span className="i-badge">2</span>
          </div>
          <div className="nav-i-container">
            <Settings className="i-nav" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
