import react, { useRef, useState, useEffect, useCallback } from "react";
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

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import "./ImageUpload.scss";
const ImageUpload = (props) => {
  // console.log(props.filePath);
  const [error, setError] = useState("");
  // const [previewUrl, setPreviewUrl] = useState(props.src || null);
  // const [fileRef, setFileRef] = useState(props.filePath || null);
  const [saveFile, setSaveFile] = useState(false);
  const [oldFilePath, setOldFilePath] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileRef, setFileRef] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const filePickerRef = useRef();
  const deleteUploadFileHandler = useCallback(
    // handle deleted File
    // case 1: no current and uploaded file => nothing to delete
    // case 2.1: no current file, new file is uploaded and saved => nothing to delete
    // case 2.2: no current file, new file is uploaded, but then cancelled => delete uploaded file
    // case 3.1: with current file, new file is uploaded and saved => delete the current file
    // case 3.2: with current file, new file is uploaded, but then cancelled => keep the current file and delete the uploaded file
    (filePath) => {
      if (!filePath) {
        throw new Error(`File path is required to process deletion!`);
      }

      console.log(filePath);
      const deletedFileRef = ref(storage, filePath);
      deleteObject(deletedFileRef)
        .then((responseData) => {
          setOldFilePath(null);
          setSaveFile(false);
          console.log(`Deleted previous file ${filePath} successfully!`);
        })
        .catch((error) => {
          // error.message = `An error occurred. Could not delete previous file!`;
          // console.log(error);
          throw error;
        });
    },
    []
  );

  useEffect(() => {
    setOldFilePath(props.filePath);
    setSaveFile(props.isSaved);
    if (saveFile && previewUrl && oldFilePath) {
      deleteUploadFileHandler(oldFilePath);
    }
  }, [
    previewUrl,
    saveFile,
    props.isSaved,
    oldFilePath,
    props.filePath,
    deleteUploadFileHandler,
    setOldFilePath,
  ]);

  const pickedHandler = async (event) => {
    // console.log(event.target.files);
    try {
      let imageUrl;
      let imageRef;
      let pickedFile;
      let fileIsValid = isValid;
      // is only 1 file submitted?
      if (event.target.files && event.target.files.length === 1) {
        setIsLoading(true);
        pickedFile = event.target.files[0];
        // console.log(pickedFile.name, pickedFile.type);
        const fileLocation = `users/${props.userId}/${new Date().getTime()}-${
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
            // Then delete the previous existed file in the Firebase storage
            // if (fileRef) {
            //   // console.log(fileRef);
            //   const deletedFileRef = ref(storage, fileRef);
            //   deleteObject(deletedFileRef)
            //     .then(() => {
            //       console.log(
            //         `Deleted previous file ${previewUrl} successfully!`
            //       );
            //     })
            //     .catch((error) => {
            //       error.message = `An error occurred. Could not delete previous file!`;
            //       throw error;
            //     });
            // }
            imageUrl = downloadURL;
            imageRef = fileLocation;
            fileIsValid = true;
            setPreviewUrl(downloadURL);
            setFileRef(fileLocation);
            setIsValid(true);
            setIsLoading(false);
            setOldFilePath(null);

            props.onInput(
              props.id,
              { file: imageUrl, fileRef: imageRef },
              null,
              fileIsValid,
              null
            );
          }
        );
      } else {
        // get triggered when canceling the uploading process of another file after a file has already been uploaded
        if (previewUrl && isValid) {
          return props.onInput(
            props.id,
            { file: previewUrl, fileRef: fileRef },
            isValid
          );
        }
        fileIsValid = false;
        setIsValid(false);
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
      <div className="uploadFile-container">
        {previewUrl && (
          <label htmlFor={props.id} className="file-label">
            {props.fileLabel}
          </label>
        )}
        <input
          id={props.id}
          ref={filePickerRef}
          style={{ display: "none" }}
          type="file"
          accept={props.accept}
          onChange={pickedHandler}
        />
        <div className={`image-upload ${props.center && "center"}`}>
          <div className={`file-upload__preview `}>
            {isLoading && (
              <LoadingSpinner asOverlay style={{ borderRadius: "50%" }} />
            )}
            {(props.src || previewUrl) && props.imageFile && (
              <img
                src={props.src || previewUrl}
                alt={`${props.label} Preview`}
              />
            )}
            {(props.src || previewUrl) && props.videoFile && (
              <video
                src={props.src || previewUrl}
                alt="Video Preview"
                controls
                autoPlay
              />
            )}
            {/* {!previewUrl && <p>Pick an {props.label}.</p>} */}
          </div>
          {!isValid && !previewUrl && (
            <p className="error-message">{props.errorText}</p>
          )}
          <Button
            type="button"
            className="btn btn-upload"
            onClick={pickImageHandler}
            disabled={isLoading}
          >
            <AddAPhotoIcon />
          </Button>
        </div>
      </div>
    </react.Fragment>
  );
};

export default ImageUpload;
