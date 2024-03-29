import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useSelector } from "react-redux";

import MovieDetail from "../MovieDetail/MovieDetail";

import { Play, Info } from "../../../shared/components/Icon/MovieIcons";
import Button from "../../../shared/components/UI/Button/Button";
import LoadingSpinner from "../../../shared/components/UI/Loading/LoadingSpinner";

import "./FeatureOtp.scss";

const FeatureOption = (props) => {
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);
  const selectRef = useRef();
  const { type, genre } = props;
  const [movieShowcase, setMovieShowcase] = useState();
  const [showDetail, setShowDetail] = useState(false);
  const { isLoading, sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/movies/find/random?type=${type}`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` }
        );
        //useRef() cannot reference to the element that is not present/ rendered on the screen
        selectRef.current.selectedIndex = 0;
        // console.log(responseData[0]);
        setMovieShowcase(responseData[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovie();
  }, [token, sendRequest, type]);
  const genreChangeHandler = (e) => {
    history.push(`/category/${props.type}?genre=${e.target.value}`);
  };
  const showDetailHandler = () => {
    setShowDetail(true);
  };
  const hideDetailHandler = () => {
    setShowDetail(false);
  };
  return (
    <div className="featured">
      {isLoading && <LoadingSpinner asOverlay inherit />}
      {/* {type && ( */}
      <div className={`category ${!type && "hidden"}`}>
        <span>{type === "movies" ? "Movies" : "Series"}</span>
        <select
          name="genre"
          id="genre"
          onChange={genreChangeHandler}
          ref={selectRef}
        >
          <option value="adventure">Adventure</option>
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="crime">Crime</option>
          <option value="education">Education</option>
          <option value="fantasy">Fantasy</option>
          <option value="horror">Horror</option>
          <option value="romance">Romance</option>
          <option value="sci-fi">Sci-fi</option>
          <option value="thriller">Thriller</option>
          <option value="drama">Drama</option>
        </select>
      </div>
      {/* )} */}
      {movieShowcase && (
        <div
          className="showcase-container"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0),rgba(11, 11, 11)),url(${movieShowcase.image.file})`,
          }}
        >
          {/* <img src={movieShowcase.image.file} alt="" /> */}
          <div className="info">
            <img src={movieShowcase.imageTitle.file} alt="title" />
            <span className="desc">
              {movieShowcase.desc.length > 30
                ? movieShowcase.desc.split(" ").splice(0, 30).join(" ") +
                  "....."
                : movieShowcase.desc}
            </span>
            <div className="buttons">
              <Button
                element="link"
                to={{ pathname: "/watch", movie: movieShowcase }}
                className="btn-func-icon striking"
              >
                <Play width="30px" height="30px" />
                <span>Play</span>
              </Button>
              <Button
                className="btn-func-icon more"
                onClick={showDetailHandler}
              >
                <Info width="25px" height="25px" />
                <span>More Info</span>
              </Button>
            </div>
          </div>
        </div>
      )}
      {movieShowcase && (
        <MovieDetail
          show={showDetail}
          onClose={hideDetailHandler}
          id={movieShowcase._id}
          movie={movieShowcase}
        />
      )}
    </div>
  );
};

export default FeatureOption;
