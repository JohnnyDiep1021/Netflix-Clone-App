import React from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { authAction } from "../../../shared/store/auth";

import { useForm } from "../../../shared/hooks/form-hooks";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import Footer from "../../components/Footer/Footer";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from "../../../shared/util/validators";
import { errorValidate } from "../../../shared/util/errorValidators";
import Button from "../../../shared/components/UI/Button/Button";
import Input from "../../../shared/components/UI/Input/Input";
import ErrorModal from "../../../shared/components/UI/Modal/ErrorModal";
import LoadingSpinner from "../../../shared/components/UI/Loading/LoadingSpinner";

import "./Login.scss";

const Login = () => {
  const dispatch = useDispatch();
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
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(process.env.REACT_APP_BACKEND_URL);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/auth/login`,
        "POST",
        JSON.stringify({
          username: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData);
      dispatch(
        authAction.login({
          token: responseData.token.token,
          userId: responseData.user.id,
        })
      );
    } catch (error) {}
  };
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="login-form">
        {isLoading && <LoadingSpinner asOverlay />}

        <div className="login-form-main">
          <h1>Sign In</h1>
          {/* {error && <ErrorModal error={error} />} */}
          {error && !isLoading && (
            <ErrorModal
              error={error}
              content={errorValidate(error)}
              onClose={clearError}
            />
          )}
          <form onSubmit={loginSubmitHandler}>
            <Input
              id="email"
              element="input"
              label="Email"
              type="text"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid email."
              onInput={inputHandler}
            />
            <Input
              id="password"
              element="input"
              label="Password"
              type="password"
              validators={[VALIDATOR_MINLENGTH(4), VALIDATOR_MAXLENGTH(60)]}
              errorText="Your password must contain between 4 and 60 characters."
              onInput={inputHandler}
            />

            <Button type="submit" className="btn" disabled={!formState.isValid}>
              Sign In
            </Button>
          </form>
        </div>
        <div className="login-form-other">
          <div className="login-signup-now">
            New to Netflix? <Link to="/register">Sign up now.</Link>
          </div>
          <div className="term-of-use">
            <p>
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot. <Link to="/register">Learn more</Link>.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
