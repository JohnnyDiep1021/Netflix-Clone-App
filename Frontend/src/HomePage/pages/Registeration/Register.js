import React, { useState } from "react";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useForm } from "../../../shared/hooks/form-hooks";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../../../shared/util/validators";

import Input from "../../../shared/components/UI/Input/Input";
import Button from "../../../shared/components/UI/Button/Button";

import "./Register.scss";

const Register = () => {
  const [signupState, setSignupState] = useState(false);

  const [formState, inputHandler] = useForm(
    {
      email: {
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

  const signupStateHandler = () => {
    setSignupState(true);
  };

  const signupSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className="register">
      <div className="regisNav">
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
          alt=""
        />
        <Button className="btn-login" to="/login">
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
              className="btn-register"
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
          <h1>Start your free membership</h1>
          <Input
            id="email"
            element="input"
            label="Email"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Email is required!"
            errorStyle={{ color: "#ffa00a", fontSize: "15px" }}
            value={formState.inputs.email.value}
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            label="Add a password"
            type="password"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Password is required!"
            errorStyle={{ color: "#ffa00a", fontSize: "15px" }}
            value={formState.inputs.password.value}
            onInput={inputHandler}
          />

          <Button
            type="submit"
            className="btn-register"
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
