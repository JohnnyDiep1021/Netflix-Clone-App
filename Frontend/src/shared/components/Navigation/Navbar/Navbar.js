import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { useHttpClient } from "../../../hooks/http-hook";
import { authAction } from "../../../store/auth";

import UserProfile from "../../../../HomePage/components/UserProfile/UserProfile";
import SearchEngine from "../../../../HomePage/components/SearchEngine/SearchEngine";
import Button from "../../UI/Button/Button";
import NotificationsIcon from "@mui/icons-material/Notifications";

import "./Navbar.scss";

const Navbar = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { sendRequest } = useHttpClient();
  const [userProfile, setUserProfile] = useState();
  const [showProfile, setShowProfile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const fetchInitData = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/me`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` }
        );
        console.log(responseData);
        setUserProfile(responseData.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchInitData();
  }, [token, sendRequest]);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  const logoutHandler = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/logout`,
        "POST",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(responseData);
      dispatch(authAction.logout());
    } catch (err) {}
  };
  const showProfileHandler = () => {
    setShowProfile(true);
  };
  const hideProfileHandler = () => {
    setShowProfile(false);
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
        </div>
        <div className="right">
          <SearchEngine />
          {/* <Search className="icon" /> */}
          {/* <span>KID</span> */}
          {/* <Button className="btn-icon">
            <NotificationsIcon />
          </Button> */}
          <div className="menu-container">
            <div className="profile-img" onClick={showProfileHandler}>
              {userProfile && (
                <img src={userProfile.profileImg.file} alt="profile" />
              )}
            </div>
            <ul className="opt-list">
              <li className="opt-list_item">
                <Button className="btn" onClick={logoutHandler}>
                  Logout
                </Button>
              </li>
            </ul>
            {userProfile && (
              <UserProfile
                user={userProfile}
                show={showProfile}
                onClose={hideProfileHandler}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
