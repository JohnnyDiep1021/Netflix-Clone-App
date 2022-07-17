import React from "react";
import { useLocation } from "react-router-dom";
import { ArrowReturn } from "../../../shared/components/Icon/MovieIcons";

import Button from "../../../shared/components/UI/Button/Button";

import "./MovieView.scss";
const MovieView = () => {
  const location = useLocation();
  const { movie } = location;
  return (
    <div className="movie-view">
      <Button className="btn-return" to="/">
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
