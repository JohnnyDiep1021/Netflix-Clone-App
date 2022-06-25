import React, { useRef, useState } from "react";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useForm } from "../../../shared/hooks/form-hooks";
import { VALIDATOR_REQUIRE } from "../../../shared/util/validators";

import Input from "../../../shared/components/UI/Input/Input";
import Button from "../../../shared/components/UI/Button/Button";

import "./Register.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formState, inputHandler] = useForm({}, true);
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleFinish = () => {
    setPassword(passwordRef.current.value);
  };
  return (
    <div className="register">
      {/* <div className="top"> */}
      <div className="wrapper">
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
          alt=""
        />
        <Button className="btn-login" to="/login">
          Sign In
        </Button>
      </div>
      {/* </div> */}
      <div className="container">
        <h1>Unlimited movies, TV shows, and more</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership
        </p>
        {!email ? (
          <div className="input-signup-container">
            <Input
              id="email"
              element="input"
              label="Email address"
              type="text"
              signup
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Email is required!"
              errorStyle={{ color: "#ffa00a", fontSize: "15px" }}
              onInput={inputHandler}
            />
            <button className="btn-register" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="password" placeholder="password" ref={passwordRef} />
            <button className="btn-register" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
