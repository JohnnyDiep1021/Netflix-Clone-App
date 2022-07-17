import React, { useState, useEffect, Fragment } from "react";

import { useSelector } from "react-redux";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import Button from "../../../shared/components/UI/Button/Button";
import LoadingSpinner from "../../../shared/components/UI/Loading/LoadingSpinner";
import {
  Play,
  ThumbDown,
  ThumbUp,
  Add,
  DropDown,
} from "../../../shared/components/Icon/MovieIcons";

import "./MovieItem.scss";

const MovieItem = (props) => {
  const token = useSelector((state) => state.auth.token);
  const [isHovered, setIsHovered] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  // const [isPosterHovered, setIsPosterHovered] = useState(true);
  const [movieItem, setMovieItem] = useState();
  const trailer =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";

  // const hidePosterHandler = () => {
  //   setTimeout(() => {
  //     setIsPosterHovered(false);
  //     console.log(`hide outer poster`);
  //   }, 2000);
  // };
  useEffect(() => {
    const fetchMovieItem = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/movies/${props.id}`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` }
        );
        console.log(responseData.movie.image);
        setMovieItem(responseData.movie);
      } catch (error) {}
    };
    fetchMovieItem();
  }, [sendRequest, token]);

  const showOnHoverHandler = () => {
    setIsHovered(true);
  };
  const hideOnLeaveHandler = () => {
    setIsHovered(false);
    // setIsPosterHovered(true);
  };

  return (
    <li
      key={props.id}
      className={`movie-item`}
      onMouseOut={hideOnLeaveHandler}
      // onMouseOver={hidePosterHandler}
    >
      {/* {isPosterHovered && (
      <img
        src="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
        className={`poster`}
        alt="movie poster"
      />
    )} */}
      {isLoading && <LoadingSpinner asOverlay />}
      {movieItem && (
        <Fragment>
          {!isHovered && (
            <img
              src={movieItem.image.file}
              // className={`poster ${isPosterHovered && "hide"}`}
              className={`poster`}
              alt="movie poster"
              onClick={showOnHoverHandler}
            />
          )}
          {isHovered && (
            <video
              className={`trailer-video ${!isHovered && "deactive"}`}
              src={movieItem.trailer.file || trailer}
              autoPlay={isHovered}
              controls
              loop
            />
          )}
          <div className="description">
            <div className="description__btn">
              <div className="left">
                <Button
                  className="btn-icon play-active"
                  element="link"
                  to={{ pathname: "/watch", movie: movieItem }}
                >
                  <Play />
                </Button>
                <button className="btn-icon">
                  <Add />
                </button>
                <button className="btn-icon">
                  <ThumbUp />
                </button>
                <button className="btn-icon">
                  <ThumbDown />
                </button>
              </div>
              <div className="right">
                <button className="btn-icon">
                  <DropDown />
                </button>
              </div>
            </div>
            <div className="description__text">
              <div className="description__top">
                <span className="description__match">97% Match</span>
                <span className="description__limit">{movieItem.limit}</span>
                <span className="description__duration">
                  {movieItem.duration}
                </span>
              </div>

              <div className="description__bottom">
                <span className="description__genre">{movieItem.genre}</span>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </li>
  );
};
export default MovieItem;
