import React, { useState, useEffect } from "react";

import { useHttpClient } from "../../../shared/hooks/http-hook";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Button from "../../../shared/components/UI/Button/Button";
import "./WatchListItem.scss";

const WatchListItem = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className="watchList-item"
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <div className="left">
        {!isHovered && (
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiSkqDYiHp0LN6FDdzT_z_rz-HS5A4IRhm3t8kVqsmiCZVWF9YC-s5eW9VYVlRN9Z4ASE&usqp=CAU"
            alt="movie-poster"
            className="movie-poster"
          />
        )}
        {isHovered && (
          <video
            src="https://firebasestorage.googleapis.com/v0/b/netflix-76544.appspot.com/o/images%2F1657793609946-ANH%20T%C3%9A%20-%20%20Cho%20con%20tim%20m%E1%BB%99t%20l%C3%BD%20do%20%5BOFFICIAL%20MV%5D.mp4?alt=media&token=05e2bc5e-3f22-40a3-8e07-d2d1248595b6"
            autoPlay
            loop
            className={`movie-trailer ${!isHovered && "deactive"}`}
          />
        )}
      </div>
      <div
        className="right"
        onMouseOver={() => {
          setIsHovered(true);
        }}
      >
        <div className="info-container">
          <div className="publish-info">
            <span className="matching">93% Match</span>
            <span className="year">2019</span>
            <span className="type">MV</span>
            <span className="duration">120 mins</span>
          </div>
          <div className="category-info">
            <div className="cast">
              <p>
                <span>Cast:</span>
                Anh Tu, Diem My
              </p>
            </div>
            <div className="genre">
              <p>
                <span>Genre:</span>Romantic MV
              </p>
            </div>
          </div>
          <div className="description-info">
            <p>
              A beautiful love of a young couple. They fell in love with each
              other since their first dating. They had been through thick and
              thin. However, the boy gradually recognized that he did not fully
              understand his girlfriend's intentions, leading to unexpected
              conflicts in love. Eventually, his girlfriends was so regretful as
              he passed away in a car accident.
            </p>
          </div>
        </div>
        <div className="btn-container">
          <div className="left-btn">
            <Button
              className="btn-func-icon striking"
              element="link"
              // to={{ pathname: "/watch", movie: movieItem }}
            >
              <PlayArrowIcon />
              Play
            </Button>
          </div>
          <div className="right-btn">
            <Button
              className={`btn-icon `}
              // onClick={watchListHandler}
            >
              <FavoriteIcon />
            </Button>
            <Button className="btn-icon">
              <ThumbUpOffAltIcon />
            </Button>
            <Button className="btn-icon">
              <ThumbDownOffAltIcon />
            </Button>
            <Button className="btn-icon">
              <ExpandMoreIcon />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default WatchListItem;
