import React, { useRef, useState } from "react";
import "./Login.scss";

const Login = () => {
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
        <div className="login-form-main">
          <h1>Sign In</h1>
          <form>
            <input type="email" placeHolder="Email or phone number" />
            <input type="password" placeHolder="Password" />
            <button className="btn-login">Sign In</button>
          </form>
        </div>
        <div className="login-form-other">
          <div className="login-signup-now">
            New to Netflix? <a href="#">Sign up now.</a>
          </div>
          <div className="term-of-use">
            <p>
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot. <a href="#">Learn more</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
