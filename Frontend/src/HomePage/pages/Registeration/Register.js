import React, { useState } from "react";

import { authAction } from "../../../shared/store/auth";
import { useDispatch } from "react-redux";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useForm } from "../../../shared/hooks/form-hooks";

import Input from "../../../shared/components/UI/Input/Input";
import Button from "../../../shared/components/UI/Button/Button";
import ErrorModal from "../../../shared/components/UI/Modal/ErrorModal";
import LoadingSpinner from "../../../shared/components/UI/Loading/LoadingSpinner";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from "../../../shared/util/validators";
import {
  EMAIL_MAXLENGTH,
  EMAIL_MINLENGTH,
  USERNAME_MINLENGTH,
  USERNAME_MAXLENGTH,
} from "../../../shared/util/util";
import "./Register.scss";

const Register = () => {
  const dispatch = useDispatch();
  const [signupState, setSignupState] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const signupStateHandler = () => {
    setSignupState(true);
  };

  const signupSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/auth/signup`,
        "POST",
        JSON.stringify({
          email: formState.inputs.email.value,
          username: formState.inputs.username.value,
          password: formState.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData);
      dispatch(authAction.setAuthToken(responseData.token));
    } catch (error) {}
  };
  return (
    <div className="register">
      <div className="regisNav">
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
          alt=""
        />
        <Button className="btn btn--red btn-login" to="/login">
          Sign In
        </Button>
      </div>
      {!signupState && (
        <div className="welcome-container">
          <h1>Unlimited movies, TV shows, and more</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
          <p>
            Ready to watch? Enter your email to create or restart your
            membership
          </p>
          <div className="input-signup-container">
            <Input
              id="email"
              element="input"
              label="Email address"
              type="text"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Email is required!"
              errorStyle={{ color: "#ffa00a", fontSize: "15px" }}
              onInput={inputHandler}
            />

            <Button
              className="btn btn--red btn-register"
              onClick={signupStateHandler}
              disabled={!formState.inputs.email.isValid}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
      {signupState && (
        <form className="signup-form" onSubmit={signupSubmitHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <h1 className="heading">
            Welcome back! <span>Start your free membership</span>
          </h1>
          {error && !isLoading && <ErrorModal error={error} />}
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
            errorStyle={{ color: "#ffa00a", fontSize: "15px" }}
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
            errorStyle={{ color: "#ffa00a", fontSize: "15px" }}
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            label="Add a password"
            type="password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="at least 8 characters with (1, A, $, @,...)"
            errorStyle={{ color: "#ffa00a", fontSize: "15px" }}
            value={formState.inputs.password.value}
            onInput={inputHandler}
          />

          <Button
            type="submit"
            className="btn btn--red btn-signup"
            disabled={!formState.isValid}
          >
            Sign Up
          </Button>
        </form>
      )}
    </div>
  );
};

export default Register;
