import React, { useState, Fragment } from "react";

import { useMovieBtn } from "../../shared/hooks/movie-hooks";

import MovieDetail from "../../HomePage/components/MovieDetail/MovieDetail";
import LoadingSpinner from "../../shared/components/UI/Loading/LoadingSpinner";
import Button from "../../shared/components/UI/Button/Button";
import { MessageCornerModal } from "../../shared/components/UI/Modal/MessageModal";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import "./SearchViewItem.scss";
const SearchViewItem = (props) => {
  const { watchListToggleHandler, addMovieState, message } = useMovieBtn(
    props.id
  );

  const [movieItem, setMovieItem] = useState(props.movie);
  const [showDetail, setShowDetail] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <li
      className="searchViewItem-container"
      key={props.movie.id}
      onMouseLeave={hideOnLeaveHandler}
    >
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
          {isHovered && !showDetail && (
            <video
              className={`trailer-video ${!isHovered && "deactive"}`}
              src={movieItem.trailer.file}
              autoPlay={isHovered}
              muted
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
                    // trigger: triggerHandler,
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
                <Button className="btn-icon" onClick={showDetailHandler}>
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

export default SearchViewItem;
