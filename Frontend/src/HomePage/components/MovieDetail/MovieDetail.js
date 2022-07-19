import React from "react";

import "./MovieDetail.scss";
const MovieDetail = () => {
  return (
    <div className="movie-detail">
      <div className="top">
        <video />
        <div className="img-title-container">
          <img />
        </div>
        <div className="inter-container">
          <div className="inter-btn-left"></div>
          <div className="inter-btn-right"></div>
        </div>
      </div>
      <div className="bottom">
        <div className="description-container">
          <div className="description"></div>
          <div className="category"></div>
        </div>
        <div className="episodes-container"></div>
      </div>
    </div>
  );
};

export default MovieDetail;
