import react, { useRef, useState } from "react";
import storage from "../../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import ErrorModal from "../Modal/ErrorModal";
import LoadingSpinner from "../Loading/LoadingSpinner";
import Button from "../Button/Button";

import "./ImageUpload.scss";
const ImageUpload = (props) => {
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const filePickerRef = useRef();

  const pickedHandler = async (event) => {
    console.log(event.target.files);
    try {
      let imageUrl;
      let pickedFile;
      let fileIsValid = isValid;
      // is only 1 file submitted?
      if (event.target.files && event.target.files.length === 1) {
        setIsLoading(true);
        pickedFile = event.target.files[0];
        // console.log(pickedFile.name, pickedFile.type);
        const fileName = new Date().getTime() + pickedFile.name;
        const storageRef = ref(storage, "images/" + fileName);
        const uploadTask = uploadBytesResumable(storageRef, pickedFile);
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
            // console.log(downloadURL);
            imageUrl = downloadURL;
            setPreviewUrl(downloadURL);
            setIsValid(true);
            fileIsValid = true;
            setIsLoading(false);
          }
        );

        // if (uploadResponseData.ok) {
        //   imageUrl = responseData.url.split("?")[0];
        //   setPreviewUrl(imageUrl);
        //   setIsValid(true);
        //   fileIsValid = true;
        // }
      } else {
        setIsValid(false);
        fileIsValid = false;
        setIsLoading(false);
      }
      props.onInput(props.id, imageUrl, fileIsValid);
    } catch (error) {
      error.message = `An error occurred. Could not upload image!`;
      setError(error.message);
      console.log(error);
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const clearError = () => {
    setError(null);
  };
  return (
    <react.Fragment>
      {error && <ErrorModal error={error} content="" onClose={clearError} />}
      <div>
        <input
          id={props.id}
          ref={filePickerRef}
          style={{ display: "none" }}
          type="file"
          accept={props.accept}
          onChange={pickedHandler}
        />
        <div className={`image-upload ${props.center && "center"}`}>
          <div className="file-upload__preview">
            {isLoading && <LoadingSpinner asOverlay />}
            {(previewUrl || props.src) && props.imageFile && (
              <img
                src={previewUrl || props.src}
                alt={`${props.label} Preview`}
              />
            )}
            {(previewUrl || props.src) && props.videoFile && (
              <video
                src={previewUrl || props.src}
                alt="Video Preview"
                controls
                autoPlay
              />
            )}
            {!previewUrl && !props.src && (
              <p>Please pick a/an {props.label}.</p>
            )}
          </div>

          {!isValid && !props.src && !previewUrl && (
            <p className="error-message">{props.errorText}</p>
          )}
          <Button
            type="button"
            className="btn btn-upload"
            onClick={pickImageHandler}
          >
            Upload
          </Button>
        </div>
      </div>
    </react.Fragment>
  );
};

export default ImageUpload;
