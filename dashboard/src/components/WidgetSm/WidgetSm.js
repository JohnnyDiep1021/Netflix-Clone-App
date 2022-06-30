import React from "react";

import { Visibility } from "@mui/icons-material";
import "./WidgetSm.scss";

const WidgetSm = () => {
  return (
    <div className="widgetSm-container">
      <span className="widgetSm-title">New Join Members</span>
      <ul className="widgetSm-list">
        <li className="widgetSm-list-item">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSm-img"
          />
          <div className="widgetSm-user">
            <span className="widgetSm-username">Johnny Diep</span>
            <span className="widgetSm-usertitle">Web Developer</span>
          </div>
          <button className="widgetSm-btn">
            <Visibility className="widgetSm-btn-icon" />
            Display
          </button>
        </li>
        <li className="widgetSm-list-item">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSm-img"
          />
          <div className="widgetSm-user">
            <span className="widgetSm-username">Johnny Diep</span>
            <span className="widgetSm-usertitle">Web Developer</span>
          </div>
          <button className="widgetSm-btn">
            <Visibility className="widgetSm-btn-icon" />
            Display
          </button>
        </li>
        <li className="widgetSm-list-item">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSm-img"
          />
          <div className="widgetSm-user">
            <span className="widgetSm-username">Johnny Diep</span>
            <span className="widgetSm-usertitle">Web Developer</span>
          </div>
          <button className="widgetSm-btn">
            <Visibility className="widgetSm-btn-icon" />
            Display
          </button>
        </li>
        <li className="widgetSm-list-item">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSm-img"
          />
          <div className="widgetSm-user">
            <span className="widgetSm-username">Johnny Diep</span>
            <span className="widgetSm-usertitle">Web Developer</span>
          </div>
          <button className="widgetSm-btn">
            <Visibility className="widgetSm-btn-icon" />
            Display
          </button>
        </li>
      </ul>
    </div>
  );
};

export default WidgetSm;
