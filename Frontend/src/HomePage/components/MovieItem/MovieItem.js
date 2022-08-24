import React, { useState, useEffect, Fragment } from "react";

import { useSelector } from "react-redux";
import { useMovieBtn } from "../../../shared/hooks/movie-hooks";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import MovieDetail from "../MovieDetail/MovieDetail";
import Button from "../../../shared/components/UI/Button/Button";
import LoadingSpinner from "../../../shared/components/UI/Loading/LoadingSpinner";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./MovieItem.scss";

const MovieItem = (props) => {
  const token = useSelector((state) => state.auth.token);
  const watchList = useSelector((state) => state.auth.watchlist);
  const { watchListToggleHandler, addMovieState, message } = useMovieBtn(
    watchList.some((item) => item.movie === props.id)
  );
  const [isHovered, setIsHovered] = useState(false);
  const { isLoading, sendRequest } = useHttpClient();
  const [movieItem, setMovieItem] = useState();

  useEffect(() => {
    const fetchMovieItem = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/movies/${props.id}`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` }
        );
        setMovieItem(responseData.movie);
      } catch (error) {}
    };
    fetchMovieItem();
  }, [sendRequest, token, props.id]);

  const showOnHoverHandler = () => {
    setIsHovered(true);
  };
  const hideOnLeaveHandler = () => {
    setIsHovered(false);
  };

  const triggerHandler = async (domEle) => {
    try {
      // console.log(domEle);
      console.log(`video is playing`);
      if (domEle.requestFullscreen) await domEle.requestFullscreen();
      else if (domEle.webkitRequestFullscreen)
        await domEle.webkitRequestFullscreen();
      else if (domEle.msRequestFullScreen) await domEle.msRequestFullScreen();
    } catch (error) {}
  };

  return (
    <li
      key={props.id}
      className={`movie-item`}
      onMouseLeave={hideOnLeaveHandler}
      // onMouseOver={hidePosterHandler}
    >
      {isLoading && <LoadingSpinner asOverlay />}
      {movieItem && (
        <Fragment>
          {!isHovered && (
            <img
              src={movieItem.image.file}
              // className={`poster ${isPosterHovered && "hide"}`}
              className={`poster`}
              alt="movie poster"
              // onClick={showOnHoverHandler}
            />
          )}
          {isHovered && (
            <video
              className={`trailer-video ${!isHovered && "deactive"}`}
              src={movieItem.trailer.file}
              autoPlay={isHovered}
              loop
            />
          )}

          <div className="description" onMouseOver={showOnHoverHandler}>
            <div className="description__btn">
              <div className="left">
                <Button
                  className="btn-icon play-active"
                  element="link"
                  to={{
                    pathname: "/watch",
                    movie: movieItem,
                    trigger: triggerHandler,
                  }}
                  onClick={() => {
                    triggerHandler();
                  }}
                >
                  <PlayArrowIcon />
                </Button>
                <Button
                  className={`btn-icon ${addMovieState && "added"}`}
                  onClick={async () => {
                    await watchListToggleHandler(movieItem._id);
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
                <Button className="btn-icon">
                  <ExpandMoreIcon />
                </Button>
              </div>
            </div>
            <div className="description__text">
              <div className="description__top">
                <span className="description__match">97% Match</span>
                <span className="description__limit">{movieItem.limit}</span>
                <span className="description__duration">
                  {movieItem.duration} mins
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
