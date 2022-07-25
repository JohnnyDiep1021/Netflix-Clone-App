import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useForm } from "../../shared/hooks/form-hooks";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useHistory } from "react-router-dom";

import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import ErrorModal from "../../shared/components/UI/Modal/ErrorModal";
import ImageUpload from "../../shared/components/UI/Upload/ImageUpload";
import Input from "../../shared/components/UI/Input/Input";
import Button from "../../shared/components/UI/Button/Button";
import "./NewMovie.scss";

const NewMovie = () => {
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);
  const [formState, inputHandler] = useForm(
    {
      title: { value: "", isValid: false },
      desc: {
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
        value: false,
        isValid: true,
      },
      image: {
        value: null,
        isValid: false,
      },
      imageTitle: {
        value: null,
        isValid: false,
      },
      imgSm: {
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
  const { error, sendRequest, clearError } = useHttpClient();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(formState.inputs);
      const createdNewMovie = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/movies`,
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          desc: formState.inputs.desc.value,
          year: formState.inputs.year.value,
          genre: formState.inputs.genre.value,
          duration: formState.inputs.duration.value,
          limit: formState.inputs.limit.value,
          isSeries: formState.inputs.isSeries.value,
          image: {
            file: formState.inputs.image.value.file,
            fileRef: formState.inputs.image.value.fileRef,
          },
          imageTitle: {
            file: formState.inputs.imageTitle.value.file,
            fileRef: formState.inputs.imageTitle.value.fileRef,
          },
          imgSm: {
            file: formState.inputs.imgSm.value.file,
            fileRef: formState.inputs.imgSm.value.fileRef,
          },
          trailer: {
            file: formState.inputs.trailer.value.file,
            fileRef: formState.inputs.trailer.value.fileRef,
          },
          video: {
            file: formState.inputs.video.value.file,
            fileRef: formState.inputs.video.value.fileRef,
          },
        }),
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      );
      console.log(createdNewMovie);
      history.push("/movies");
    } catch (error) {}
  };
  return (
    <Fragment>
      <ErrorModal error={error} onClose={clearError} type="popup" />
      <div className="newProduct">
        <h1 className="addProductTitle">New Movie</h1>
        <form className="addProductForm" onSubmit={submitHandler}>
          {/* {isLoading && <LoadingSpinner asOverlay />} */}
          <div className="addProductItem file">
            <ImageUpload
              imageFile
              id="image"
              label="image"
              accept=".jpg,.png,.jpeg,.webp,.svg"
              errorText="image is required!"
              onInput={inputHandler}
              center
            />
          </div>
          <div className="addProductItem file">
            <ImageUpload
              imageFile
              id="imageTitle"
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
              id="imgSm"
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
              validators={[VALIDATOR_MINLENGTH(8), VALIDATOR_MAXLENGTH(191)]}
              errorText="title is required (8 - 191 characters)"
              onInput={inputHandler}
            />
          </div>
          <div className="addProductItem">
            <Input
              element="input"
              id="desc"
              type="text"
              label="Description"
              validators={[VALIDATOR_MINLENGTH(10)]}
              errorText="description is required (at least 10 characters)"
              onInput={inputHandler}
            />
          </div>
          <div className="addProductItem">
            <Input
              element="input"
              id="year"
              type="number"
              label="Year"
              validators={[VALIDATOR_MIN(1)]}
              errorText="published year is required (> 0)"
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
              errorText="duration is required (in minutes)"
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
              initialValue="false"
              initialValid={true}
              onInput={inputHandler}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
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

export default NewMovie;
