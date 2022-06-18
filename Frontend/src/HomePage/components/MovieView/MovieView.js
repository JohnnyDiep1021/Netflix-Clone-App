import React from "react";
import { ReturnArrow } from "../../../shared/components/Icon/MovieIcons";
import "./MovieView.scss";
const MovieView = () => {
  return (
    <div className="movie-view">
      <button className="btn-return">
        <ReturnArrow />
        Home
      </button>
      <video className="video" controls autoPlay>
        <source
          src="https://ia800209.us.archive.org/20/items/ElephantsDream/ed_hd.ogv"
          type="video/ogv"
        />
      </video>
    </div>
  );
};

export default MovieView;
