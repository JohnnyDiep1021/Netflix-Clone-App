import react, { useState } from "react";
import { NavLink } from "react-router-dom";

import SideDrawer from "./SideDrawer";
import MainHeader from "./MainHeader";
import Navbar from "./Navbar";
import Button from "../UI/Button/Button";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import "./MainNavigation.scss";

const MainNavigation = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawerHandler = (event) => {
    isDrawerOpen ? setIsDrawerOpen(false) : setIsDrawerOpen(true);
  };
  const closeDrawerHandler = (event) => {
    setIsDrawerOpen(false);
  };

  return (
    <react.Fragment>
      <SideDrawer active={isDrawerOpen}>
        <nav className="main-navigation__drawer-nav">
          <Navbar />
        </nav>
        <Button className=" btn-icon btn-close" onClick={closeDrawerHandler}>
          <CloseIcon />
        </Button>
      </SideDrawer>

      <MainHeader>
        <NavLink to="/home" className="main-navigation__home-nav">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </NavLink>
        <nav className="main-navigation__header-nav">
          <Navbar />
        </nav>
        <Button
          className={`main-navigation__menu-btn ${
            isDrawerOpen && "menu-active"
          }`}
          onClick={openDrawerHandler}
        >
          <MenuIcon />
        </Button>
      </MainHeader>
    </react.Fragment>
  );
};

export default MainNavigation;
