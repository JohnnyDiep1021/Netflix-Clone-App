import React, { useState } from "react";

import { useForm } from "../../../shared/hooks/form-hooks";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import Modal from "../../../shared/components/UI/Modal/Modal";
import Input from "../../../shared/components/UI/Input/Input";

import "./UserProfile.scss";

const UserProfile = (props) => {
  return (
    <Modal
      className="modal-user-profile"
      show={props.show}
      onClose={props.onClose}
    >
      <div className="left-box">
        <div className="profile-img">
          <img
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt="profile"
          />
        </div>
      </div>
      <div className="right-box">
        <form>
          <div className="info-box">
            {/* <div className="info-content">
              <div className="email">
                <h4>Email</h4>
                <p></p>
              </div>
              <div className="username">
                <h4>Username</h4>
                <p></p>
              </div>
            </div> */}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UserProfile;
