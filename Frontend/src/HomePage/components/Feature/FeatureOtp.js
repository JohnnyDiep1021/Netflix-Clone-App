import React, { useState, useEffect, Fragment } from "react";

import { useSelector } from "react-redux";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import LoadingSpinner from "../../../shared/components/UI/Loading/LoadingSpinner";
import { Play, Info } from "../../../shared/components/Icon/MovieIcons";

import "./FeatureOtp.scss";

const FeatureOption = (props) => {
  const token = useSelector((state) => state.auth.token);
  const [movieShowcase, setMovieShowcase] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/movies/find/random`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` }
        );
        console.log(responseData[0]);
        setMovieShowcase(responseData[0]);
      } catch (error) {}
    };
    fetchMovie();
  }, [token, sendRequest]);
  return (
    <div className="featured">
      {props.type && (
        <div className="category">
          <span>{props.type === "movies" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      {movieShowcase && (
        <Fragment>
          <img src={movieShowcase.image} alt="" />
          <div className="info">
            <img src={movieShowcase.imageTitle} alt="" />
            <span className="desc">{movieShowcase.desc}</span>
            <div className="buttons">
              <button className="play">
                <Play width="25px" height="25px" />
                <span>Play</span>
              </button>
              <button className="more">
                <Info width="30px" height="30px" />
                <span>More Info</span>
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default FeatureOption;
