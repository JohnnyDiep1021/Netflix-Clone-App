import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import SearchEngine from "../../../../HomePage/components/SearchEngine/SearchEngine";
import Button from "../../UI/Button/Button";
import { Notification, ArrowDown } from "../../Icon/MovieIcons";
import "./Navbar.scss";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={`${isScrolled ? "navbar scrolled" : "navbar"}`}>
      <div className="container">
        <div className="left">
          <NavLink to="/home">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
          </NavLink>

          <Button element="navLink" to="/home" className="link">
            <span>Homepage</span>
          </Button>
          <Button
            element="navLink"
            to={`/category/movies?genre=`}
            className="link"
          >
            <span>Movies</span>
          </Button>
          <Button
            element="navLink"
            to={`/category/series?genre=`}
            className="link"
          >
            <span>Series</span>
          </Button>
          <Button element="navLink" to="/watchlist" className="link">
            <span>My Watch List</span>
          </Button>
          {/* <span>New and Popular</span>
          <span>My List</span> */}
        </div>
        <div className="right">
          <SearchEngine />
          {/* <Search className="icon" /> */}
          {/* <span>KID</span> */}
          <Notification className="icon" />
          <img
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt="profile"
          />
          <div className="profile">
            <ArrowDown className="icon" />

            <div className="options">
              {/* <span>Settings</span> */}
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
