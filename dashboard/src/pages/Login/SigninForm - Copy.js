import React from "react";

import { authAction } from "../../shared/store/auth";
import { useDispatch } from "react-redux";
import { useForm } from "../../shared/hooks/form-hooks";
import { useHttpClient } from "../../shared/hooks/http-hook";

import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

import Button from "../../shared/components/UI/Button/Button";
import Input from "../../shared/components/UI/Input/Input";
import ErrorModal from "../../shared/components/UI/Modal/ErrorModal";
import LoadingSpinner from "../../shared/components/UI/Loading/LoadingSpinner";

import "./RegistrationForm.scss";

const Login = (props) => {
  const dispatch = useDispatch();
  const [formState, inputHandler] = useForm(
    {
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

  const signinSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/auth/login`,
        "POST",
        JSON.stringify({
          username: formState.inputs.username.value,
          password: formState.inputs.password.value,
        }),
        { "Content-Type": "application/json" }
      );
      console.log(responseData);
      dispatch(authAction.login(responseData));
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <div className="login-container">
        <form className="form-regis signin" onSubmit={signinSubmitHandler}>
          {isLoading && (
            <LoadingSpinner asOverlay style={{ borderRadius: "10px" }} />
          )}
          <div className="heading">
            <h3 className="heading__title">Login to Dashboard</h3>
          </div>
          {error && !isLoading && (
            <ErrorModal error={error} content="" onClose={clearError} />
          )}
          <Input
            id="username"
            element="input"
            label="Username/ Email"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="valid username/ email required!"
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            label="Password"
            name="password"
            type="password"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="valid password required!"
            onInput={inputHandler}
          />
          <div className="btn--form ">
            <Button type="submit" className="btn" disabled={!formState.isValid}>
              Log In
            </Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
export default Login;
