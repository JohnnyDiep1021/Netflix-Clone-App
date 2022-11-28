import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useMovieBtn } from "../../../shared/hooks/movie-hooks";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { Link } from "react-router-dom";

import MovieDetail from "../MovieDetail/MovieDetail";
import Button from "../../../shared/components/UI/Button/Button";
import LoadingSpinner from "../../../shared/components/UI/Loading/LoadingSpinner";
import { MessageCornerModal } from "../../../shared/components/UI/Modal/MessageModal";

import ReactTooltip from "react-tooltip";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./MovieItem.scss";

const MovieItem = (props) => {
  const token = useSelector((state) => state.auth.token);
  // console.log(watchList, isAdded);
  const { watchListToggleHandler, addMovieState, message } = useMovieBtn(
    props.id
  );
  const [isHovered, setIsHovered] = useState(false);
  const { isLoading, sendRequest } = useHttpClient(props.loading || false);
  const [movieItem, setMovieItem] = useState(props.movie);
  const [showDetail, setShowDetail] = useState(false);
  useEffect(() => {
    if (!props.movie) {
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
    } else {
      return;
    }
  }, [sendRequest, token, props.id, props.movie]);

  const showOnHoverHandler = () => {
    setIsHovered(true);
  };
  const hideOnLeaveHandler = () => {
    setIsHovered(false);
  };
  const showDetailHandler = () => {
    setShowDetail(true);
  };
  const hideDetailHandler = () => {
    setShowDetail(false);
  };
  // const triggerHandler = async (domEle) => {
  //   try {
  //     // console.log(domEle);
  //     console.log(`video is playing`);
  //     if (domEle.requestFullscreen) await domEle.requestFullscreen();
  //     else if (domEle.webkitRequestFullscreen)
  //       await domEle.webkitRequestFullscreen();
  //     else if (domEle.msRequestFullScreen) await domEle.msRequestFullScreen();
  //   } catch (error) {}
  // };

  return (
    <li
      key={props.id}
      className={`movie-item ${props.className}`}
      onMouseLeave={hideOnLeaveHandler}
      // onMouseOver={hidePosterHandler}
    >
      {isLoading && <LoadingSpinner asOverlay inherit />}
      {movieItem && (
        <Fragment>
          {!isHovered && (
            <Link
              to={{
                pathname: "/watch",
                movie: movieItem,
                // trigger: triggerHandler,
              }}
            >
              <img
                src={movieItem.image.file}
                // className={`poster ${isPosterHovered && "hide"}`}
                className={`poster`}
                alt="movie poster"
                // onClick={showOnHoverHandler}
              />
            </Link>
          )}
          {isHovered && !showDetail && (
            <video
              className={`trailer-video ${!isHovered && "deactive"}`}
              src={movieItem.trailer.file}
              autoPlay={isHovered}
              muted
              loop
            />
          )}

          <div
            className={`description ${props.className}`}
            onMouseOver={showOnHoverHandler}
          >
            <div className="description__btn">
              <div className="left">
                <Button
                  className="btn-icon play-active"
                  element="link"
                  to={{
                    pathname: "/watch",
                    movie: movieItem,
                    // trigger: triggerHandler,
                  }}
                  toolTip={{
                    title: "Play this!",
                    placement: "top",
                  }}
                  // onClick={() => {
                  //   triggerHandler();
                  // }}
                >
                  <PlayArrowIcon />
                </Button>
                <Button
                  className={`btn-icon ${addMovieState && "added"}`}
                  onClick={async () => {
                    await watchListToggleHandler(movieItem._id);
                  }}
                  toolTip={{
                    title: "Add to My List",
                    placement: "top",
                  }}
                >
                  <FavoriteIcon />
                </Button>
                <Button
                  className="btn-icon"
                  toolTip={{
                    title: "I like this",
                    placement: "top",
                  }}
                >
                  <ThumbUpOffAltIcon />
                </Button>
                <Button
                  className="btn-icon"
                  toolTip={{
                    title: "Not for me",
                    placement: "top",
                  }}
                >
                  <ThumbDownOffAltIcon />
                </Button>
              </div>
              <div className="right">
                <Button
                  className="btn-icon"
                  onClick={showDetailHandler}
                  toolTip={{
                    title: "Episodes & Info",
                    placement: "top",
                  }}
                >
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
      {movieItem && (
        <MovieDetail
          show={showDetail}
          onClose={hideDetailHandler}
          id={props.id}
          movie={movieItem}
        />
      )}
      <MessageCornerModal show={message.isShow} message={message.msg} />
    </li>
  );
};
export default MovieItem;
