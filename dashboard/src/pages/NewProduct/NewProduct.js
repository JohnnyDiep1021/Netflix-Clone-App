import React, { useState } from "react";
import { useForm } from "../../shared/hooks/form-hooks";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_FILE,
} from "../../shared/util/validators";

import Input from "../../shared/components/UI/Input/Input";
import "./NewProduct.scss";

const NewProduct = () => {
  const [fileURL, setFileURL] = useState([]);
  const [formState, inputHandler, setFormData] = useForm(
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
  const upload = async (items) => {
    try {
      items.forEach((item) => {
        // console.log(item.file);
        const fileName = new Date().getTime() + item.label + item.file.name;
        // console.log(item.file.split(`\\`)[2]);
        const storageRef = ref(storage, "images/" + fileName);
        const uploadTask = uploadBytesResumable(storageRef, item.file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress} % done`);
            switch (snapshot.state) {
              case "paused":
                console.log(`Upload is paused`);
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            // handle unsucessful error
          },
          async () => {
            // Upload completed successfully, now we can get the download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setFileURL((prevState) => {
              return { ...prevState, [item.label]: downloadURL };
            });
            console.log(downloadURL);
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formState.inputs);
    await upload([
      {
        file: formState.inputs.img.value,
        label: "img",
      },
      {
        file: formState.inputs.imgTitle.value,
        label: "imgTitle",
      },
      {
        file: formState.inputs.imgThumbnail.value,
        label: "imgThumbnail",
      },
      {
        file: formState.inputs.trailer.value,
        label: "trailer",
      },
      {
        file: formState.inputs.video.value,
        label: "video",
      },
    ]);
    setFormData({ ...formState.inputs, ...fileURL }, formState.isValid);
    console.log(formState);
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm" onSubmit={submitHandler}>
        <div className="addProductItem">
          {/* <input
            type="file"
            onChange={(event) => {
              setImgUpload(event.target.files[0]);
            }}
          /> */}
          <Input
            element="file"
            id="img"
            label="Image"
            validators={[VALIDATOR_FILE()]}
            accept=".jpg,.png,.jpeg,.webp,.svg"
            errorText="image is required!"
            onInput={inputHandler}
          />
        </div>
        <div className="addProductItem">
          <Input
            element="file"
            id="imgTitle"
            label="Title image"
            validators={[VALIDATOR_FILE()]}
            accept=".jpg,.png,.jpeg,.webp,.svg"
            errorText="title image is required!"
            onInput={inputHandler}
          />
        </div>
        <div className="addProductItem">
          <Input
            element="file"
            id="imgThumbnail"
            label="Thumbnail image"
            validators={[VALIDATOR_FILE()]}
            accept=".jpg,.png,.jpeg,.webp,.svg"
            errorText="thumbnail is required!"
            onInput={inputHandler}
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
          {/* <label>Is Series?</label>
          <select name="active" id="isSeries">
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select> */}
          <Input
            element="select"
            id="isSeries"
            label="Is Series?"
            errorText="is this a series?"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
        </div>
        <div className="addProductItem">
          <Input
            element="file"
            id="trailer"
            label="Trailer"
            validators={[VALIDATOR_FILE()]}
            errorText="trailer is required!"
            onInput={inputHandler}
          />
        </div>
        <div className="addProductItem">
          <Input
            element="file"
            id="video"
            label="Video"
            validators={[VALIDATOR_FILE()]}
            errorText="video is required!"
            onInput={inputHandler}
          />
        </div>
        <button className="addProductButton" disabled={!formState.isValid}>
          Create
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
