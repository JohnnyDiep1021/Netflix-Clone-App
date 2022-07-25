import React from "react";

import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";

import Button from "../../shared/components/UI/Button/Button";

import "./User.scss";

const User = () => {
  return (
    <div className="user-container">
      <div className="user-title-container">
        <h1 className="user-title">Edit User</h1>
        <Button className="user-btn-add" to="/newUser">
          Create
        </Button>
      </div>
      <div className="user-control-container">
        <div className="user-show-container">
          <div className="user-show-top">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="user-show-img"
            />
            <div className="user-show-info">
              <span className="user-show-username">Johnny Diep</span>
              <span className="user-show-title">Software Engineer</span>
            </div>
          </div>
          <div className="user-show-bottom">
            <span className="user-show-title">Account Details</span>
            <div className="user-show-info">
              <PermIdentity className="user-show-icon" />
              <span className="user-show-info-title">johnny1121</span>
            </div>
            <div className="user-show-info">
              <CalendarToday className="user-show-icon" />
              <span className="user-show-info-title">10.12.1999</span>
            </div>
            <span className="user-show-title">Contact Details</span>

            <div className="user-show-info">
              <PhoneAndroid className="user-show-icon" />
              <span className="user-show-info-title">+1 123 456 67</span>
            </div>
            <div className="user-show-info">
              <MailOutline className="user-show-icon" />
              <span className="user-show-info-title">johnny1121@gmail.com</span>
            </div>
            <div className="user-show-info">
              <LocationSearching className="user-show-icon" />
              <span className="user-show-info-title">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="user-update-container">
          <span className="user-update-title">Edit</span>
          <form className="user-update-form">
            <div className="left">
              <div className="user-update-item">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="annabeck99"
                  className="user-update-input"
                />
              </div>
              <div className="user-update-item">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Anna Becker"
                  className="user-update-input"
                />
              </div>
              <div className="user-update-item">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="annabeck99@gmail.com"
                  className="user-update-input"
                />
              </div>
              <div className="user-update-item">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="user-update-input"
                />
              </div>
              <div className="user-update-item">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="user-update-input"
                />
              </div>
            </div>
            <div className="right">
              <div className="user-update-upload">
                <img
                  className="user-update-img"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="user-update-icon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="user-update-btn">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;
