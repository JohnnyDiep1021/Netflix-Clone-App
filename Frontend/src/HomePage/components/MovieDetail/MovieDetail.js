import React from "react";

import Button from "../../../shared/components/UI/Button/Button";

import Modal from "../../../shared/components/UI/Modal/Modal";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import CloseIcon from "@mui/icons-material/Close";

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
              <FavoriteIcon />
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
        <Button className="btn-icon btn-close">
          <CloseIcon />
        </Button>
      </div>
      <div className="bottom">
        <div className="description-container">
          <div className="description">
            <div className="publish-info">
              <span className="matching">93% Match</span>
              <span className="year">2019</span>
              <span className="type">MV</span>
              <span className="duration">120 mins</span>
            </div>
            <div className="description-info">
              <p className="warning">
                Some audio languages may be pending: we're prioritizing the
                safety of voice actors
              </p>
              <p>
                A beautiful love of a young couple. They fell in love with each
                other since their first dating. They had been through thick and
                thin. However, the boy gradually recognized that he did not
                fully understand his girlfriend's intentions, leading to
                unexpected conflicts in love. Eventually, his girlfriends was so
                regretful as he passed away in a car accident.
              </p>
            </div>
          </div>
          <div className="category">
            <div className="cast">
              <p>
                <span>Cast:</span>
                Anh Tu, Diem My, Hoai Linh, My Dung, Kim Chi
              </p>
            </div>
            <div className="genre">
              <p>
                <span>Genre:</span>Romantic MV
              </p>
            </div>
            <div className="adj">
              <p>
                <span>This MV is:</span>
                Romantic, Heartbroken
              </p>
            </div>
          </div>
        </div>
        <div className="episodes-container"></div>
      </div>
    </Modal>
  );
};

export default MovieDetail;
