import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "../../shared/hooks/form-hooks";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import ErrorModal from "../../shared/components/UI/Modal/ErrorModal";
import Input from "../../shared/components/UI/Input/Input";
import Button from "../../shared/components/UI/Button/Button";

import "./ListItem.scss";

const MovieItem = () => {
  const token = useSelector((state) => state.auth.token);
  const history = useHistory();
  const list = useLocation().list;
  const [moviesContent, setMoviesContent] = useState([]);
  const { error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: { value: list.title, isValid: true },
      genre: {
        value: list.genre,
        isValid: true,
      },
      type: {
        value: list.type,
        isValid: true,
      },
      content: {
        value: list.content,
        isValid: true,
      },
    },
    true
  );
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
  const submitUpdateHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(formState.inputs);
      const updatedList = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/lists/${list._id}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          genre: formState.inputs.genre.value,
          type: formState.inputs.type.value,
          content: formState.inputs.content.value,
        }),
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      );
      console.log(updatedList.list);
      history.push("/lists");
    } catch (error) {}
  };
  return (
    <Fragment>
      <ErrorModal type="popup" error={error} onClose={clearError} />
      <div className="list-container">
        <div className="product">
          <div className="productTitleContainer">
            <h1 className="productTitle">List</h1>
            <Button className="product-add-btn" to="/lists/new">
              Create
            </Button>
          </div>
          <div className="productTop">
            <div className="productTopRight">
              <div className="productInfoTop">
                <div className="productInfoItem">
                  <span className="productName">id:</span>
                  <span className="product-id"> {list._id}</span>
                </div>
              </div>
              <div className="productInfoBottom">
                <form className="productForm" onSubmit={submitUpdateHandler}>
                  <div className="productForm-top">
                    <div className="productForm-top--left">
                      <Input
                        element="input"
                        id="title"
                        type="text"
                        label="Title"
                        validators={[
                          VALIDATOR_MINLENGTH(8),
                          VALIDATOR_MAXLENGTH(191),
                        ]}
                        errorText="title is required (8 - 191 characters)"
                        onInput={inputHandler}
                        initialValue={formState.inputs.title.value}
                        initialValid={formState.inputs.title.isValid}
                      />
                      <Input
                        element="input"
                        id="genre"
                        type="text"
                        label="Genre"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="genre is required!"
                        onInput={inputHandler}
                        initialValue={formState.inputs.genre.value}
                        initialValid={formState.inputs.genre.isValid}
                      />
                      <Input
                        element="select"
                        id="type"
                        label="Type"
                        errorText="is this a series or movie?"
                        validators={[VALIDATOR_REQUIRE()]}
                        initialValue={formState.inputs.type.value}
                        initialValid={formState.inputs.type.isValid}
                        onInput={inputHandler}
                      >
                        <option value="movies">movies</option>
                        <option value="series">series</option>
                      </Input>
                      <Input
                        element="select"
                        id="content"
                        label="Movie content"
                        errorText="Pick one movie at least?"
                        validators={[VALIDATOR_REQUIRE()]}
                        initialValue={formState.inputs.content.value}
                        initialValid={formState.inputs.content.isValid}
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
                  </div>
                  <Button
                    type="submit"
                    className="btn btn-update"
                    disabled={!formState.isValid}
                  >
                    Update Movie
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MovieItem;
