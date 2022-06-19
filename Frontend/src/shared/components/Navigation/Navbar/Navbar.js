import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Search, Notification, ArrowDown } from "../../Icon/MovieIcons";
import "./Navbar.scss";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  console.log(isScrolled);
  return (
    <div className={`${isScrolled ? "navbar scrolled" : "navbar"}`}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <NavLink to="/" className="link">
            <span>Homepage</span>
          </NavLink>
          <NavLink to="/series" className="link">
            <span>Series</span>
          </NavLink>
          <NavLink to="/movies" className="link">
            <span>Movies</span>
          </NavLink>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <Search className="icon" />
          <span>KID</span>
          <Notification className="icon" />
          <img
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt="profile"
          />
          <div className="profile">
            <ArrowDown className="icon" />

            <div className="options">
              <span>Settings</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
