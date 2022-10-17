import React, { useState, useEffect } from "react";

import { useForm } from "../../../shared/hooks/form-hooks";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import Modal from "../../../shared/components/UI/Modal/Modal";
import Input from "../../../shared/components/UI/Input/Input";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from "../../../shared/util/validators";
import {
  BIO_MAXLENGTH,
  EMAIL_MAXLENGTH,
  EMAIL_MINLENGTH,
  NAME_MAXLENGTH,
  USERNAME_MAXLENGTH,
  USERNAME_MINLENGTH,
} from "../../../shared/util/util";

import "./UserProfile.scss";

const UserProfile = (props) => {
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      fname: {
        value: "",
        isValid: false,
      },
      lname: {
        value: "",
        isValid: false,
      },
      bio: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {}, []);
  return (
    <Modal
      className="modal-user-profile"
      show={props.show}
      onClose={props.onClose}
    >
      {/* <div className="left-box"> */}
      {/* </div> */}
      <div className="profile-container">
        <div className="profile-img">
          <img
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt="profile"
          />
        </div>
        <form className="personal-info">
          <h2 className="heading">Personal Information</h2>
          <div className="info-1">
            <Input
              id="fname"
              element="input"
              label="First name"
              type="text"
              validators={[VALIDATOR_MAXLENGTH(NAME_MAXLENGTH)]}
              errorText="only 64 character(s)"
              errorStyle={{ color: "#ffa00a", fontSize: "12px" }}
              onInput={inputHandler}
              initialValue={formState.inputs.fname.value}
              initialValid={formState.inputs.fname.isValid}
            />
            <Input
              id="lname"
              element="input"
              label="Last name"
              type="text"
              validators={[VALIDATOR_MAXLENGTH(NAME_MAXLENGTH)]}
              errorText="only 64 character(s)"
              errorStyle={{ color: "#ffa00a", fontSize: "12px" }}
              onInput={inputHandler}
              initialValue={formState.inputs.lname.value}
              initialValid={formState.inputs.lname.isValid}
            />
          </div>
          <Input
            id="email"
            element="input"
            label="Email"
            type="text"
            validators={[
              VALIDATOR_EMAIL(),
              VALIDATOR_MINLENGTH(EMAIL_MINLENGTH),
              VALIDATOR_MAXLENGTH(EMAIL_MAXLENGTH),
            ]}
            errorText="include '@' (3-60 characters)"
            errorStyle={{ color: "#ffa00a", fontSize: "12px" }}
            onInput={inputHandler}
            initialValue={formState.inputs.email.value}
            initialValid={formState.inputs.email.isValid}
          />
          <Input
            id="username"
            element="input"
            label="Username"
            type="text"
            validators={[
              VALIDATOR_MINLENGTH(USERNAME_MINLENGTH),
              VALIDATOR_MAXLENGTH(USERNAME_MAXLENGTH),
            ]}
            errorText="6-36 character(s)"
            errorStyle={{ color: "#ffa00a", fontSize: "12px" }}
            onInput={inputHandler}
          />
          <Input
            id="bio"
            label="Biography"
            validators={[VALIDATOR_MAXLENGTH(BIO_MAXLENGTH)]}
            errorText="Only 256 character(s)"
            errorStyle={{ color: "#ffa00a", fontSize: "12px" }}
            onInput={inputHandler}
          />
        </form>
      </div>
    </Modal>
  );
};

export default UserProfile;
