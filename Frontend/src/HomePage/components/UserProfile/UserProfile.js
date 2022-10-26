import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { uiAction } from "../../../shared/store/ui";

import { useForm } from "../../../shared/hooks/form-hooks";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import ImageUpload from "../../../shared/components/UI/Upload/ImageUpload";
import Modal from "../../../shared/components/UI/Modal/Modal";
import Input from "../../../shared/components/UI/Input/Input";
import Button from "../../../shared/components/UI/Button/Button";
import CloseIcon from "@mui/icons-material/Close";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from "../../../shared/util/validators";
import {
  BIO_MAXLENGTH,
  EMAIL_MAXLENGTH,
  EMAIL_MINLENGTH,
  NAME_MAXLENGTH,
  USERNAME_MAXLENGTH,
  USERNAME_MINLENGTH,
} from "../../../shared/util/util";

import "./UserProfile.scss";

const UserProfile = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const profileImg = useSelector((state) => state.ui.profileImg);
  const profileImgRef = useSelector((state) => state.ui.profileImgRef);

  const [filePath, setFilePath] = useState(props.user.profileImg.fileRef);
  const { sendRequest } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: props.user.email,
        isValid: true,
      },
      username: {
        value: props.user.username,
        isValid: true,
      },
      fname: {
        value: props.user.fname,
        isValid: true,
      },
      lname: {
        value: props.user.lname,
        isValid: true,
      },
      bio: {
        value: props.user.bio,
        isValid: true,
      },
      profileImg: {
        value: {
          file: props.user.profileImg.file,
          fileRef: props.user.profileImg.fileRef,
        },
        isValid: true,
      },
    },
    true
  );
  const [saveFile, setSaveFile] = useState(false);

  useEffect(() => {
    setSaveFile(false);
  }, [sendRequest, token, setFormData, saveFile]);

  const submitProfileHandler = async (event) => {
    event.preventDefault();
    try {
      // console.log(formState.inputs);
      const updatedProfile = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,
        "PATCH",
        JSON.stringify({
          email: formState.inputs.email.value,
          username: formState.inputs.username.value,
          fname: formState.inputs.fname.value,
          lname: formState.inputs.lname.value,
          bio: formState.inputs.bio.value,
          profileImg: {
            file: formState.inputs.profileImg.value.file,
            fileRef: formState.inputs.profileImg.value.fileRef,
          },
        }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(updatedProfile);
      // err: if upload image more than one time, an error will occurs
      setSaveFile(true);
      dispatch(uiAction.setProfileImg(formState.inputs.profileImg.value.file));
    } catch (err) {
      console.log(err);
    }
  };
  const cancelUpdateHandler = () => {
    props.onClose();
    setFilePath(formState.inputs.profileImg.value.fileRef);
    setSaveFile(true);
    dispatch(uiAction.setProfileImg(props.user.profileImg.file));
  };
  return (
    <Modal
      className="modal-user-profile"
      show={props.show}
      onClose={cancelUpdateHandler}
    >
      <div className="profile-container">
        <ImageUpload
          imageFile
          id="profileImg"
          userId={userId}
          // src={
          //   formState.inputs.profileImg.value.file ||
          //   "https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg"
          // }
          src={profileImg}
          filePath={filePath}
          userName={formState.inputs.username.value}
          label="profile"
          accept=".jpg,.png,.jpeg,.webp,.svg"
          errorText="image is required!"
          onInput={inputHandler}
          isSaved={saveFile}
          center
        />
        <form className="personal-info" onSubmit={submitProfileHandler}>
          <h2 className="heading">Personal Information</h2>
          <div className="info-1">
            <Input
              id="fname"
              element="input"
              label="First name"
              type="text"
              validators={[VALIDATOR_MAXLENGTH(NAME_MAXLENGTH)]}
              errorText="only 64 character(s)"
              errorStyle={{ color: "#ffa00a", fontSize: "12px" }}
              onInput={inputHandler}
              initialValue={formState.inputs.fname.value}
              initialValid={formState.inputs.fname.isValid}
            />
            <Input
              id="lname"
              element="input"
              label="Last name"
              type="text"
              validators={[VALIDATOR_MAXLENGTH(NAME_MAXLENGTH)]}
              errorText="only 64 character(s)"
              errorStyle={{ color: "#ffa00a", fontSize: "12px" }}
              onInput={inputHandler}
              initialValue={formState.inputs.lname.value}
              initialValid={formState.inputs.lname.isValid}
            />
          </div>
          <Input
            id="email"
            element="input"
            label="Email"
            type="text"
            validators={[
              VALIDATOR_EMAIL(),
              VALIDATOR_MINLENGTH(EMAIL_MINLENGTH),
              VALIDATOR_MAXLENGTH(EMAIL_MAXLENGTH),
            ]}
            errorText="include '@' (3-60 characters)"
            errorStyle={{ color: "#ffa00a", fontSize: "12px" }}
            onInput={inputHandler}
            initialValue={formState.inputs.email.value}
            initialValid={formState.inputs.email.isValid}
          />
          <Input
            id="username"
            element="input"
            label="Username"
            type="text"
            validators={[
              VALIDATOR_MINLENGTH(USERNAME_MINLENGTH),
              VALIDATOR_MAXLENGTH(USERNAME_MAXLENGTH),
            ]}
            errorText="6-36 character(s)"
            errorStyle={{ color: "#ffa00a", fontSize: "12px" }}
            onInput={inputHandler}
            initialValue={formState.inputs.username.value}
            initialValid={formState.inputs.username.isValid}
          />
          <Input
            id="bio"
            label="Biography"
            validators={[VALIDATOR_MAXLENGTH(BIO_MAXLENGTH)]}
            errorText="Only 256 character(s)"
            errorStyle={{ color: "#ffa00a", fontSize: "12px" }}
            onInput={inputHandler}
            initialValue={formState.inputs.bio.value}
            initialValid={formState.inputs.bio.isValid}
          />
          <div className="profile-btn-container">
            <Button className="btn btn-cancel" onClick={cancelUpdateHandler}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn btn-save btn--red"
              onClick={props.onClose}
            >
              Save
            </Button>
          </div>
        </form>
        <Button className="btn-icon btn-close" onClick={cancelUpdateHandler}>
          <CloseIcon />
        </Button>
      </div>
    </Modal>
  );
};

export default UserProfile;
