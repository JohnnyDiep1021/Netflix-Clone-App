import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";

import { useHttpClient } from "../../../shared/hooks/http-hook";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Button from "../../../shared/components/UI/Button/Button";
import "./WatchListItem.scss";

const WatchListItem = (props) => {
  const token = useSelector((state) => state.auth.token);
  const [movie, setMovie] = useState();
  const [isHovered, setIsHovered] = useState(false);
  const { sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchMovieItem = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/movies/${props.movieId.movie}`,
        "GET",
        null,
        { Authorization: `Bearer ${token}` }
      );
      console.log(responseData);
      setMovie(responseData.movie);
    };
    fetchMovieItem();
  }, [token, props.movieId, sendRequest]);
  return (
    <Fragment>
      <li
        className="watchList-item"
        key={props.movieId}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        {movie && (
          <Fragment>
            <div className="left">
              {!isHovered && (
                <img
                  src={movie.image.file}
                  alt="movie-poster"
                  className="movie-poster"
                />
              )}
              {isHovered && (
                <video
                  src={movie.trailer.file}
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
                  <span className="duration">{movie.duration} mins</span>
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
                      <span>Genre:</span>
                      {movie.genre}
                    </p>
                  </div>
                </div>
                <div className="description-info">
                  <p>
                    A beautiful love of a young couple. They fell in love with
                    each other since their first dating. They had been through
                    thick and thin. However, the boy gradually recognized that
                    he did not fully understand his girlfriend's intentions,
                    leading to unexpected conflicts in love. Eventually, his
                    girlfriends was so regretful as he passed away in a car
                    accident.
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
          </Fragment>
        )}
      </li>
    </Fragment>
  );
};

export default WatchListItem;
