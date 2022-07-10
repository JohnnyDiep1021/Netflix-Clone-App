import react, { useRef, useState } from "react";
import storage from "../../../../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import ErrorModal from "../Modal/ErrorModal";
import LoadingSpinner from "../Loading/LoadingSpinner";
import Button from "../Button/Button";

import "./ImageUpload.scss";
const ImageUpload = (props) => {
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState();
  const [fileRef, setFileRef] = useState();
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const filePickerRef = useRef();

  const pickedHandler = async (event) => {
    console.log(event.target.files);
    try {
      let imageUrl;
      let pickedFile;
      let fileIsValid = isValid;
      setIsLoading(true);
      // is only 1 file submitted?
      if (event.target.files && event.target.files.length === 1) {
        pickedFile = event.target.files[0];
        // console.log(pickedFile.name, pickedFile.type);
        const fileLocation = `images/${new Date().getTime()}-${
          pickedFile.name
        }`;
        const storageRef = ref(storage, fileLocation);
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
            // Then delete the existed file in the Firebase storage
            if (fileRef) {
              console.log(fileRef);
              const deletedFileRef = ref(storage, fileRef);
              const deleteReponse = deleteObject(deletedFileRef)
                .then(() => {
                  console.log(
                    `Deleted previous file ${previewUrl} successfully!`
                  );
                })
                .catch((error) => {
                  error.message = `An error occurred. Could not delete previous file!`;
                  throw error;
                });
            }
            imageUrl = downloadURL;
            fileIsValid = true;
            setPreviewUrl(downloadURL);
            setFileRef(fileLocation);
            setIsValid(true);
            setIsLoading(false);
          }
        );
      } else {
        // get triggered when canceling the uploading of another file after a file has already been uploaded
        if (!previewUrl) {
          fileIsValid = false;
          setIsValid(false);
        }
        setIsLoading(false);
      }
      console.log(previewUrl);
      if (previewUrl && isValid) {
        props.onInput(props.id, previewUrl, isValid);
      } else {
        props.onInput(props.id, imageUrl, fileIsValid);
      }
    } catch (error) {
      error.message =
        error.message || `An error occurred. Could not upload file!`;
      setError(error.message);
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
