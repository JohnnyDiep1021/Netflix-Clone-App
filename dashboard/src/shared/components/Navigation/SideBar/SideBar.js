import React from "react";

import {
  AddCircle,
  PlayCircleOutline,
  AddCircleOutline,
  List,
} from "@mui/icons-material";
import {
  Home,
  Sale,
  Analytics,
  User,
  Product,
  Transaction,
  Report,
  Email,
  Feedback,
  Message,
  Manage,
} from "../../../../shared/components/Icon/Icons";
import { NavLink } from "react-router-dom";
import "./SideBar.scss";

const SideBar = () => {
  return (
    <div className={`sidebar `}>
      <div className="sidebar-container">
        <div className="sidebar-menu">
          <h3 className="menu-title">Dashboard</h3>
          <ul className="menu-list">
            <li className="menu-item">
              <NavLink to="/" exact>
                <Home className="item-icon" /> Home
              </NavLink>
            </li>
            {/* <li className="menu-item">
              <Analytics className="item-icon" />
              Analytics
            </li>
            <li className="menu-item">
              <Sale className="item-icon" /> Sales
            </li> */}
          </ul>
        </div>
        <div className="sidebar-menu">
          <h3 className="menu-title">Quick Menu</h3>
          <ul className="menu-list">
            <li className="menu-item">
              <NavLink to="/users">
                <User className="item-icon" /> Users
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink to="/movies" exact>
                <PlayCircleOutline className="item-icon" />
                Movies
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink to="/lists">
                <List className="item-icon" />
                Movie List
              </NavLink>
            </li>
            {/* <li className="menu-item">
              <Transaction className="item-icon" /> Transactions
            </li>
            <li className="menu-item">
              <Report className="item-icon" /> Reports
            </li> */}
          </ul>
        </div>
        {/* <div className="sidebar-menu">
          <h3 className="menu-title">Notifications</h3>
          <ul className="menu-list">
            <li className="menu-item">
              <Email className="item-icon" /> Mail
            </li>
            <li className="menu-item">
              <Feedback className="item-icon" />
              Feedback
            </li>
            <li className="menu-item">
              <Message className="item-icon" /> Messages
            </li>
          </ul>
        </div>
        <div className="sidebar-menu">
          <h3 className="menu-title">Staff</h3>
          <ul className="menu-list">
            <li className="menu-item">
              <Manage className="item-icon" /> Manage
            </li>
            <li className="menu-item">
              <Analytics className="item-icon" />
              Analytics
            </li>
            <li className="menu-item">
              <Report className="item-icon" /> Reports
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default SideBar;
