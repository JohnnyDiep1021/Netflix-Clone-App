import React from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "../../shared/hooks/form-hooks";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import Input from "../../shared/components/UI/Input/Input";
import ImageUpload from "../../shared/components/UI/Upload/ImageUpload";
import Button from "../../shared/components/UI/Button/Button";

import "./MovieItem.scss";

const MovieItem = () => {
  const token = useSelector((state) => state.auth.token);
  const history = useHistory();
  const location = useLocation();
  const movie = location.movie;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: { value: movie.title, isValid: true },
      desc: {
        value: movie.desc,
        isValid: true,
      },
      year: {
        value: movie.year,
        isValid: true,
      },
      genre: {
        value: movie.genre,
        isValid: true,
      },
      duration: {
        value: movie.duration,
        isValid: true,
      },
      limit: {
        value: movie.limit,
        isValid: true,
      },
      isSeries: {
        value: `${movie.isSeries}`,
        isValid: true,
      },
      image: {
        value: movie.image,
        isValid: true,
      },
      imageTitle: {
        value: movie.imageTitle,
        isValid: true,
      },
      imgSm: {
        value: movie.imgSm,
        isValid: true,
      },
      trailer: {
        value: movie.trailer,
        isValid: true,
      },
      video: {
        value: movie.video,
        isValid: true,
      },
    },
    true
  );
  const submitUpdateHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(formState.inputs);
      const updatedMovie = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/movies/${movie._id}`,
        "PATCH",
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
      console.log(updatedMovie.movie);
      history.push("/movies");
    } catch (error) {}
  };
  return (
    <div className="product-container">
      <div className="product">
        <div className="productTitleContainer">
          <h1 className="productTitle">Movie</h1>
          <Button className="product-add-btn" to="/movies/new">
            Create
          </Button>
        </div>
        <div className="productTop">
          <div className="productTopRight">
            <div className="productInfoTop">
              <div className="productInfoItem">
                <img src={movie.image.file} alt="" className="productInfoImg" />
                <span className="productName">{movie.title}</span>
              </div>
              <div className="productInfoItem">
                <span className="product-id">{movie._id}</span>
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
                      id="desc"
                      type="text"
                      label="Description"
                      validators={[VALIDATOR_MINLENGTH(10)]}
                      errorText="description is required (at least 10 characters)"
                      onInput={inputHandler}
                      initialValue={formState.inputs.desc.value}
                      initialValid={formState.inputs.desc.isValid}
                    />
                    <Input
                      element="input"
                      id="year"
                      type="number"
                      label="Year"
                      validators={[VALIDATOR_MIN(1)]}
                      errorText="year is required (published year > 0)"
                      onInput={inputHandler}
                      initialValue={formState.inputs.year.value}
                      initialValid={formState.inputs.year.isValid}
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
                      element="input"
                      id="duration"
                      type="number"
                      label="Duration"
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText="duration is required (in minutes)"
                      onInput={inputHandler}
                      initialValue={formState.inputs.duration.value}
                      initialValid={formState.inputs.duration.isValid}
                    />
                    <Input
                      element="input"
                      id="limit"
                      type="text"
                      label="Limit"
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText="limit type is required!"
                      onInput={inputHandler}
                      initialValue={formState.inputs.limit.value}
                      initialValid={formState.inputs.limit.isValid}
                    />
                    <Input
                      element="select"
                      id="isSeries"
                      label="Is Series?"
                      errorText="is this a series?"
                      validators={[VALIDATOR_REQUIRE()]}
                      initialValue={formState.inputs.isSeries.value}
                      initialValid={formState.inputs.isSeries.isValid}
                      onInput={inputHandler}
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </Input>
                  </div>

                  {/* <div className="productForm-top--right">
                  </div> */}
                </div>
                <div className="productForm-bottom">
                  <ImageUpload
                    imageFile
                    id="image"
                    label="image"
                    fileLabel="Image"
                    src={formState.inputs.image.value.file}
                    filePath={formState.inputs.image.value.fileRef}
                    accept=".jpg,.png,.jpeg,.webp,.svg"
                    errorText="image is required!"
                    onInput={inputHandler}
                    center
                  />
                  <ImageUpload
                    imageFile
                    id="imageTitle"
                    label="title image"
                    fileLabel="Title Image"
                    src={formState.inputs.imageTitle.value.file}
                    filePath={formState.inputs.imageTitle.value.fileRef}
                    accept=".jpg,.png,.jpeg,.webp,.svg"
                    errorText="title image is required!"
                    onInput={inputHandler}
                    center
                  />
                  <ImageUpload
                    imageFile
                    id="imgSm"
                    label="thumbnail"
                    fileLabel="Thumbnail"
                    src={formState.inputs.imgSm.value.file}
                    filePath={formState.inputs.imgSm.value.fileRef}
                    accept=".jpg,.png,.jpeg,.webp,.svg"
                    errorText="thumbnail is required!"
                    onInput={inputHandler}
                    center
                  />
                  <ImageUpload
                    videoFile
                    element="video-file"
                    id="trailer"
                    label="trailer"
                    fileLabel="Trailer"
                    src={formState.inputs.trailer.value.file}
                    filePath={formState.inputs.trailer.value.fileRef}
                    accept=".webm,.ogv,.mp4,.mpeg"
                    errorText="trailer is required!"
                    onInput={inputHandler}
                    center
                  />
                  <ImageUpload
                    videoFile
                    element="video-file"
                    id="video"
                    label="video"
                    fileLabel="Video"
                    src={formState.inputs.video.value.file}
                    filePath={formState.inputs.video.value.fileRef}
                    accept=".webm,.ogv,.mp4,.mpeg"
                    errorText="video is required!"
                    onInput={inputHandler}
                    center
                  />
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
        {/* <div className="productBottom"></div> */}
      </div>
    </div>
  );
};

export default MovieItem;
