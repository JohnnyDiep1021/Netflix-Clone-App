import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "../../shared/hooks/form-hooks";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useHistory } from "react-router-dom";

import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import ErrorModal from "../../shared/components/UI/Modal/ErrorModal";
import Input from "../../shared/components/UI/Input/Input";
import Button from "../../shared/components/UI/Button/Button";
import "./NewList.scss";

const NewList = () => {
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);
  const [moviesContent, setMoviesContent] = useState([]);
  const [formState, inputHandler] = useForm(
    {
      title: { value: "", isValid: false },
      type: {
        value: "movies",
        isValid: true,
      },
      genre: {
        value: "",
        isValid: false,
      },
      content: {
        value: [],
        isValid: false,
      },
    },
    false
  );
  const { error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchMoviesContent = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/movies`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(responseData.movies);
      setMoviesContent(responseData.movies);
    };
    fetchMoviesContent();
  }, [token, sendRequest]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(formState.inputs);
      const createdList = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/lists`,
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          type: formState.inputs.type.value,
          genre: formState.inputs.genre.value,
          content: formState.inputs.content.value,
        }),
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      );
      console.log(createdList);
      history.push("/lists");
    } catch (error) {}
  };
  return (
    <Fragment>
      <ErrorModal error={error} onClose={clearError} type="popup" />
      <div className="newProduct">
        <h1 className="addProductTitle">New Movie</h1>
        <form className="addProductForm" onSubmit={submitHandler}>
          {/* {isLoading && <LoadingSpinner asOverlay />} */}
          <div className="addProductItem">
            <Input
              element="input"
              id="title"
              type="text"
              label="Title"
              validators={[VALIDATOR_MINLENGTH(8), VALIDATOR_MAXLENGTH(191)]}
              errorText="list title is required (8 - 191 characters)"
              onInput={inputHandler}
            />
          </div>
          <div className="addProductItem">
            <Input
              element="select"
              id="type"
              label="Type"
              errorText="is this a series or movie?"
              validators={[VALIDATOR_REQUIRE()]}
              initialValue="movies"
              initialValid={true}
              onInput={inputHandler}
            >
              <option value="movies">movies</option>
              <option value="series">series</option>
            </Input>
          </div>
          <div className="addProductItem">
            <Input
              element="input"
              id="genre"
              type="text"
              label="Genre"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="list genre is required"
              onInput={inputHandler}
            />
          </div>
          <div className="addProductItem">
            <Input
              element="select"
              id="content"
              label="Movie content"
              errorText="Pick one movie at least?"
              validators={[VALIDATOR_REQUIRE()]}
              initialValue={[]}
              initialValid={false}
              onInput={inputHandler}
              multiple
            >
              {moviesContent.map((movie) => {
                return (
                  <option key={movie._id} value={movie._id}>
                    {movie.title}
                  </option>
                );
              })}
            </Input>
          </div>
          <div className="btn-container">
            <Button
              type="submit"
              className="btn btn-upload btn-add-movie"
              disabled={!formState.isValid}
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default NewList;
