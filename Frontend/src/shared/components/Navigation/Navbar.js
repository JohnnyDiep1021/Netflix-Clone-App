import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useHttpClient } from "../../hooks/http-hook";
import { uiAction } from "../../store/ui";
import { authAction } from "../../store/auth";

// import StripeContainer from "../../../HomePage/components/Payment/StripeContainer";
import Payment from "../../../HomePage/components/Payment/Payment";
import UserProfile from "../../../HomePage/components/UserProfile/UserProfile";
import SearchEngine from "../../../HomePage/components/SearchEngine/SearchEngine";

import Button from "../UI/Button/Button";
import NotificationsIcon from "@mui/icons-material/Notifications";

import "./Navbar.scss";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const profileImg = useSelector((state) => state.ui.profileImg);

  const { sendRequest } = useHttpClient();
  const [userProfile, setUserProfile] = useState();
  const [showProfile, setShowProfile] = useState(false);
  // const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const fetchInitData = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/me`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` }
        );
        // console.log(responseData);
        setUserProfile(responseData.user);
        dispatch(uiAction.setProfileImg(responseData.user.profileImg.file));
        dispatch(
          uiAction.setProfileImgRef(responseData.user.profileImg.fileRef)
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchInitData();
  }, [token, sendRequest, dispatch]);
  // window.onscroll = () => {
  //   setIsScrolled(window.pageYOffset === 0 ? false : true);
  //   return () => (window.onscroll = null);
  // };
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
      // console.log(responseData);
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
    // <ul className={`${isScrolled ? "navbar scrolled" : "navbar"}`}>
    <ul className="navbar">
      <div className="right right__side-drawer">
        <div className="menu-container">
          <li className="profile-img" onClick={showProfileHandler}>
            {profileImg && <img src={profileImg} alt="profile" />}
            {userProfile && userProfile.payment && (
              <Button className="btn btn-bubble label">Premium</Button>
            )}
          </li>
          {userProfile && !userProfile.payment && (
            <li className="navbar-item">
              <Payment />
            </li>
          )}
          {userProfile && (
            <UserProfile
              user={userProfile}
              show={showProfile}
              onClose={hideProfileHandler}
            />
          )}
        </div>

        <SearchEngine />
      </div>
      <div className="left">
        <li className="navbar-item">
          <NavLink to="/home" className="navbar-item__home-link">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
          </NavLink>
        </li>
        <li className="navbar-item">
          <Button
            element="navLink"
            to="/home"
            className="link"
            onClick={props.onCloseDrawer}
          >
            <span>Homepage</span>
          </Button>
        </li>
        <li className="navbar-item">
          <Button
            element="navLink"
            to={`/category/movies?genre=`}
            className="link"
            onClick={props.onCloseDrawer}
          >
            <span>Movies</span>
          </Button>
        </li>
        <li className="navbar-item">
          <Button
            element="navLink"
            to={`/category/series?genre=`}
            className="link"
            onClick={props.onCloseDrawer}
          >
            <span>Series</span>
          </Button>
        </li>
        <li className="navbar-item">
          <Button
            element="navLink"
            to="/watchlist"
            className="link"
            onClick={props.onCloseDrawer}
          >
            <span>My Watch List</span>
          </Button>
        </li>
        {userProfile && !userProfile.payment && (
          <li className="navbar-item payment">
            <Payment />
          </li>
        )}
        <Button className="btn" onClick={logoutHandler}>
          Logout
        </Button>
      </div>

      <div className="right">
        <SearchEngine />
        {/* <Button className="btn-icon">
          <NotificationsIcon />
        </Button> */}
        <div className="menu-container">
          <li className="profile-img" onClick={showProfileHandler}>
            {profileImg && <img src={profileImg} alt="profile" />}
            {userProfile && userProfile.payment && (
              <Button className="btn btn-bubble label">Premium</Button>
            )}
          </li>
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
    </ul>
  );
};

export default Navbar;
