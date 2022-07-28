import React, { useState, useEffect, Fragment } from "react";

import { authAction } from "../../../shared/store/auth";
import { useSelector, useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [isHovered, setIsHovered] = useState(false);
  const { isLoading, sendRequest } = useHttpClient();
  const [movieItem, setMovieItem] = useState();
  const [isMovieAdded, setIsMovieAdded] = useState(false);

  useEffect(() => {
    const fetchMovieItem = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/movies/${props.id}`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` }
        );
        const responseDataWatchList = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/watchlist`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` }
        );
        dispatch(authAction.setWatchList(responseDataWatchList.watchList));
        setIsMovieAdded(
          responseDataWatchList.watchList.some(
            (item) => item.movie === props.id
          )
        );
        setMovieItem(responseData.movie);
      } catch (error) {}
    };
    fetchMovieItem();
  }, [sendRequest, token, props.id]);

  const watchListHandler = async () => {
    try {
      if (!isMovieAdded) {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/watchlist/add`,
          "PATCH",
          JSON.stringify({
            movie: movieItem._id,
          }),
          {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        );
        console.log(responseData);
        setIsMovieAdded(true);
        dispatch(authAction.setWatchList(responseData.watchList));
      } else {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/watchlist/remove`,
          "PATCH",
          JSON.stringify({
            movie: movieItem._id,
          }),
          {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        );
        console.log(responseData);
        setIsMovieAdded(false);
        dispatch(authAction.setWatchList(responseData.watchList));
      }
    } catch (error) {}
  };

  const showOnHoverHandler = () => {
    setIsHovered(true);
  };
  const hideOnLeaveHandler = () => {
    setIsHovered(false);
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
                  to={{ pathname: "/watch", movie: movieItem }}
                >
                  <PlayArrowIcon />
                </Button>
                <Button
                  className={`btn-icon ${isMovieAdded && "added"}`}
                  onClick={watchListHandler}
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
