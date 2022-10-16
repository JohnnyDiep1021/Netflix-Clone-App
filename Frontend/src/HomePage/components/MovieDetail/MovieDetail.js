import React, { useState } from "react";

import { useMovieBtn } from "../../../shared/hooks/movie-hooks";

import Button from "../../../shared/components/UI/Button/Button";
import { MessageCornerModal } from "../../../shared/components/UI/Modal/MessageModal";
import Modal from "../../../shared/components/UI/Modal/Modal";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import CloseIcon from "@mui/icons-material/Close";
import { ANIMATION_STYLE, ANIMATION_TIMEOUT } from "../../../shared/util/util";

import "./MovieDetail.scss";

const MovieDetail = (props) => {
  const [isMuted, setIsMuted] = useState(false);
  const { watchListToggleHandler, addMovieState, message, clearMessage } =
    useMovieBtn(props.id);
  const muteHandler = () => {
    if (!isMuted) return setIsMuted(true);
    setIsMuted(false);
  };
  return (
    <Modal
      className="modal-movie-detail"
      show={props.show}
      onClose={props.onClose}
      aniClassNames={ANIMATION_STYLE.movie}
      aniTiming={ANIMATION_TIMEOUT.movieAniTiming}
    >
      <div className="top">
        <div className="poster-video-container">
          <div className="bg-filter"></div>
          <video
            src={props.movie.trailer.file}
            autoPlay={props.show}
            loop
            muted={isMuted}
            className="poster-video"
          />
        </div>
        <div className="intrt-btn-container">
          <div className="left">
            <Button
              className="btn-func-icon striking"
              element="link"
              to={{ pathname: "/watch", movie: props.movie }}
            >
              <PlayArrowIcon />
              <span>Play</span>
            </Button>
            <Button
              className={`btn-icon ${addMovieState && "added"}`}
              onClick={async () => {
                await watchListToggleHandler(props.id);
              }}
            >
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
            <Button className="btn-icon" onClick={muteHandler}>
              {!isMuted ? <VolumeUpIcon /> : <VolumeOffIcon />}
            </Button>
          </div>
        </div>
        <Button className="btn-icon btn-close" onClick={props.onClose}>
          <CloseIcon />
        </Button>
      </div>
      <div className="bottom">
        <div className="description-container">
          <div className="detail-description">
            <div className="publish-info">
              <span className="matching">
                {props.movie.matching || "93%"} Match
              </span>
              <span className="year">{props.movie.year}</span>
              <span className="type">
                {props.movie.isSeries ? "Series" : "Movie"}
              </span>
              <span className="duration">{props.movie.duration} mins</span>
            </div>
            <div className="description-info">
              <p className="warning">
                {props.movie.warning ||
                  `Some audio languages may be pending: we're prioritizing the
                safety of voice actors`}
              </p>
              <p>
                {/* {props.movie.desc ||
                  `A beautiful love of a young couple. They fell in love with each
                other since their first dating. They had been through thick and
                thin. However, the boy gradually recognized that he did not
                fully understand his girlfriend's intentions, leading to
                unexpected conflicts in love. Eventually, his girlfriends was so
                regretful as he passed away in a car accident.`} */}
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
                {props.movie.casting || "Anh Tu, Diem My"}
              </p>
            </div>
            <div className="genre">
              <p>
                <span>Genre:</span>
                {props.movie.genre}
              </p>
            </div>
            <div className="adj">
              <p>
                <span>This MV is:</span>
                {props.movie.label || "Romantic, Heartbroken"}
              </p>
            </div>
          </div>
        </div>
        <div className="episodes-container"></div>
      </div>
      <MessageCornerModal
        show={message.isShow}
        message={message.msg}
        onClose={clearMessage}
      />
    </Modal>
  );
};

export default MovieDetail;
