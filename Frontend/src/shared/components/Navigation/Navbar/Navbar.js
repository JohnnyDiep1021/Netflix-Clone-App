import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { movieAction } from "../../../store/movie";
import { useDispatch } from "react-redux";

import Button from "../../UI/Button/Button";
import { Search, Notification, ArrowDown } from "../../Icon/MovieIcons";
import "./Navbar.scss";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const homeClickHandler = () => {
    dispatch(movieAction.setType(""));
    dispatch(movieAction.setGenre(""));
  };
  const seriesClickHandler = () => {
    dispatch(movieAction.setType("series"));
    dispatch(movieAction.setGenre(""));
  };
  const moviesClickHandler = () => {
    dispatch(movieAction.setType("movies"));
    dispatch(movieAction.setGenre(""));
  };

  return (
    <div className={`${isScrolled ? "navbar scrolled" : "navbar"}`}>
      <div className="container">
        <div className="left">
          <NavLink to="/" onClick={homeClickHandler} exact>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
          </NavLink>

          <Button
            element="navLink"
            to="/"
            exact
            className="link"
            onClick={homeClickHandler}
          >
            <span>Homepage</span>
          </Button>
          <Button
            element="navLink"
            to="/series"
            className="link"
            onClick={seriesClickHandler}
          >
            <span>Series</span>
          </Button>
          <Button
            element="navLink"
            to="/movies"
            className="link"
            onClick={moviesClickHandler}
          >
            <span>Movies</span>
          </Button>
          <Button
            element="navLink"
            to="/watchlist"
            className="link"
            onClick={moviesClickHandler}
          >
            <span>My Watch List</span>
          </Button>
          {/* <span>New and Popular</span>
          <span>My List</span> */}
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
