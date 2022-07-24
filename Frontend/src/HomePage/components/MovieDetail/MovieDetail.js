import React from "react";

import Button from "../../../shared/components/UI/Button/Button";

import Modal from "../../../shared/components/UI/Modal/Modal";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import "./MovieDetail.scss";

const MovieDetail = (props) => {
  return (
    <Modal className="modal-movie-detail" show={true}>
      <div className="top">
        <video controls autoPlay loop />
        {/* <div className="img-title-container">
          <img />
        </div> */}
        <div className="intrt-btn-container">
          <div className="left">
            <Button className="btn-func-icon striking">
              <PlayArrowIcon />
              <span>Play</span>
            </Button>
            <Button className="btn-icon">
              <AddIcon />
            </Button>
            <Button className="btn-icon">
              <ThumbUpOffAltIcon />
            </Button>
            <Button className="btn-icon">
              <ThumbDownOffAltIcon />
            </Button>
          </div>
          <div className="right"></div>
        </div>
      </div>
      <div className="bottom">
        <div className="description-container">
          <div className="description"></div>
          <div className="category"></div>
        </div>
        <div className="episodes-container"></div>
      </div>
    </Modal>
  );
};

export default MovieDetail;
