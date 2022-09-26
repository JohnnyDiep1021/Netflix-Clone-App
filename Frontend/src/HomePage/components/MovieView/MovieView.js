import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { ArrowReturn } from "../../../shared/components/Icon/MovieIcons";

import Button from "../../../shared/components/UI/Button/Button";

import "./MovieView.scss";
const MovieView = () => {
  // const { movie, trigger } = useLocation();
  const history = useHistory();
  const { movie } = useLocation();
  const fullscreenHandler = async (event) => {
    try {
      // trigger(event.target);
      const domEle = event.target;
      console.log(`video is playing`);
      if (domEle.requestFullscreen) await domEle.requestFullscreen();
      else if (domEle.webkitRequestFullscreen)
        await domEle.webkitRequestFullscreen();
      else if (domEle.msRequestFullScreen) await domEle.msRequestFullScreen();
    } catch (error) {}
  };
  return (
    <div className="movie-view">
      <Button
        className="btn-return"
        onClick={() => {
          history.goBack();
        }}
      >
        <ArrowReturn width="20px" height="20px" />
        Home
      </Button>
      <video
        className="video"
        src={movie.video.file}
        controls
        autoPlay
        loop
        poster={movie.image.file}
        onPlay={fullscreenHandler}
      >
        {/* <source
          src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
          autoPlay
          type="video/mp4"
        /> */}
      </video>
    </div>
  );
};

export default MovieView;
