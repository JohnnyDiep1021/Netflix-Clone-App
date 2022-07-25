import React from "react";

import Button from "../../../shared/components/UI/Button/Button";

import Modal from "../../../shared/components/UI/Modal/Modal";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

import "./MovieDetail.scss";

const MovieDetail = (props) => {
  return (
    <Modal className="modal-movie-detail" show={false}>
      <div className="top">
        <div className="poster-video-container">
          <div className="bg-filter"></div>
          <video
            src="https://firebasestorage.googleapis.com/v0/b/netflix-76544.appspot.com/o/images%2F1657793609946-ANH%20T%C3%9A%20-%20%20Cho%20con%20tim%20m%E1%BB%99t%20l%C3%BD%20do%20%5BOFFICIAL%20MV%5D.mp4?alt=media&token=05e2bc5e-3f22-40a3-8e07-d2d1248595b6"
            autoPlay
            loop
            muted
            className="poster-video"
          />
        </div>
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
          <div className="right">
            <Button className="btn-icon">
              <VolumeUpIcon />
            </Button>
          </div>
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
