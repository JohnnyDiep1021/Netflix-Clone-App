import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useMovieBtn } from "../../../shared/hooks/movie-hooks";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import MovieDetail from "../MovieDetail/MovieDetail";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Button from "../../../shared/components/UI/Button/Button";
import "./WatchListItem.scss";

const WatchListItem = (props) => {
  const token = useSelector((state) => state.auth.token);
  const { sendRequest } = useHttpClient();

  const [movie, setMovie] = useState();
  const [isHovered, setIsHovered] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const { watchListToggleHandler, addMovieState } = useMovieBtn(props.movieId);

  useEffect(() => {
    const fetchInitData = async () => {
      try {
        const responseData = await sendRequest(
          `${
            process.env.REACT_APP_BACKEND_URL
          }/movies/${props.movieId.toString()}`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` }
        );
        // console.log(responseData);
        setMovie(responseData.movie);
      } catch (error) {}
    };
    fetchInitData();
  }, [token, props.movieId, sendRequest]);

  const showDetailHandler = () => {
    setShowDetail(true);
  };
  const hideDetailHandler = () => {
    setShowDetail(false);
  };
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
              {(!isHovered || showDetail) && (
                <Link to={{ pathname: "/watch", movie }}>
                  <img
                    src={movie.image.file}
                    alt="movie-poster"
                    className="movie-poster"
                  />
                </Link>
              )}
              {isHovered && !showDetail && (
                <Link to={{ pathname: "/watch", movie }}>
                  <video
                    src={movie.trailer.file}
                    autoPlay
                    loop
                    muted
                    className={`movie-trailer ${!isHovered && "deactive"}`}
                  />
                </Link>
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
                  <span className="type">
                    {movie.isSeries ? "Series" : "Movie"}
                  </span>
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
                    {movie.desc.length > 40
                      ? movie.desc.split(" ").splice(0, 40).join(" ") + "....."
                      : movie.desc}
                  </p>
                </div>
              </div>
              <div className="btn-container">
                <div className="left-btn">
                  <Button
                    className="btn-func-icon striking"
                    element="link"
                    to={{ pathname: "/watch", movie }}
                  >
                    <PlayArrowIcon />
                    Play
                  </Button>
                </div>
                <div className="right-btn">
                  <Button
                    className={`btn-icon ${addMovieState && "added"}`}
                    onClick={async () => {
                      await watchListToggleHandler(props.movieId);
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
            </div>
          </Fragment>
        )}
        {movie && (
          <MovieDetail
            show={showDetail}
            onClose={hideDetailHandler}
            id={props.movieId}
            movie={movie}
          />
        )}
      </li>
    </Fragment>
  );
};

export default WatchListItem;
