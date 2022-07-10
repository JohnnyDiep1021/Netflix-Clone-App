import React, { useState } from "react";
import { useForm } from "../../shared/hooks/form-hooks";

import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import ImageUpload from "../../shared/components/UI/Upload/ImageUpload";
import Input from "../../shared/components/UI/Input/Input";
import Button from "../../shared/components/UI/Button/Button";
import "./NewMovie.scss";

const NewMovie = () => {
  const [formState, inputHandler] = useForm(
    {
      title: { value: "", isValid: false },
      description: {
        value: "",
        isValid: false,
      },
      year: {
        value: "",
        isValid: false,
      },
      genre: {
        value: "",
        isValid: false,
      },
      duration: {
        value: "",
        isValid: false,
      },
      limit: {
        value: "",
        isValid: false,
      },
      isSeries: {
        value: null,
        isValid: false,
      },
      img: {
        value: null,
        isValid: false,
      },
      imgTitle: {
        value: null,
        isValid: false,
      },
      imgThumbnail: {
        value: null,
        isValid: false,
      },
      trailer: {
        value: null,
        isValid: false,
      },
      video: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formState.inputs);
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm" onSubmit={submitHandler}>
        <div className="addProductItem file">
          <ImageUpload
            imageFile
            id="img"
            label="mage"
            accept=".jpg,.png,.jpeg,.webp,.svg"
            errorText="image is required!"
            onInput={inputHandler}
            center
          />
        </div>
        <div className="addProductItem file">
          <ImageUpload
            imageFile
            id="imgTitle"
            label="title image"
            accept=".jpg,.png,.jpeg,.webp,.svg"
            errorText="title image is required!"
            onInput={inputHandler}
            center
          />
        </div>
        <div className="addProductItem file">
          <ImageUpload
            imageFile
            id="imgThumbnail"
            label="thumbnail"
            accept=".jpg,.png,.jpeg,.webp,.svg"
            errorText="thumbnail is required!"
            onInput={inputHandler}
            center
          />
        </div>
        <div className="addProductItem file">
          <ImageUpload
            videoFile
            element="video-file"
            id="trailer"
            label="trailer"
            accept=".webm,.ogv,.mp4,.mpeg"
            errorText="trailer is required!"
            onInput={inputHandler}
            center
          />
        </div>
        <div className="addProductItem file">
          <ImageUpload
            videoFile
            id="video"
            label="video"
            accept=".webm,.ogv,.mp4,.mpeg"
            errorText="video is required!"
            onInput={inputHandler}
            center
          />
        </div>
        <div className="addProductItem">
          <Input
            element="input"
            id="title"
            type="text"
            label="Title"
            placeholder="Join Wick"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="movie title is required!"
            onInput={inputHandler}
          />
        </div>
        <div className="addProductItem">
          <Input
            element="input"
            id="description"
            type="text"
            label="Description"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="movie description is required!"
            onInput={inputHandler}
          />
        </div>
        <div className="addProductItem">
          <Input
            element="input"
            id="year"
            type="number"
            label="Year"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="published year is required!"
            onInput={inputHandler}
          />
        </div>
        <div className="addProductItem">
          <Input
            element="input"
            id="genre"
            type="text"
            label="Genre"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="genre is required!"
            onInput={inputHandler}
          />
        </div>
        <div className="addProductItem">
          <Input
            element="input"
            id="duration"
            type="text"
            label="Duration"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="duration is required!"
            onInput={inputHandler}
          />
        </div>
        <div className="addProductItem">
          <Input
            element="input"
            id="limit"
            type="text"
            label="Limit"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="limit type is required!"
            onInput={inputHandler}
          />
        </div>
        <div className="addProductItem">
          <Input
            element="select"
            id="isSeries"
            label="Is Series?"
            errorText="is this a series?"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
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
  );
};

export default NewMovie;
