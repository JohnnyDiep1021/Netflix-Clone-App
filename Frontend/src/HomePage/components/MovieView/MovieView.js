import React from "react";
import { ArrowReturn } from "../../../shared/components/Icon/MovieIcons";
import "./MovieView.scss";
const MovieView = () => {
  return (
    <div className="movie-view">
      <button className="btn-return">
        <ArrowReturn width="20px" height="20px" />
        Home
      </button>
      <video
        className="video"
        src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
        controls
        autoPlay
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
