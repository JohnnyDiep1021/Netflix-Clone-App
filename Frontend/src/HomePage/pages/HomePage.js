import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import { authAction } from "../../shared/store/auth";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Footer from "../components/Footer/Footer";
import MovieList from "../components/MovieList/MovieList";
import FeatureOption from "../components/Feature/FeatureOtp";

import "./HomePage.scss";

const Home = (props) => {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.movie.type);
  const genre = useSelector((state) => state.movie.genre);
  const token = useSelector((state) => state.auth.token);

  const { sendRequest } = useHttpClient();
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    const fetchInitData = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/lists${
            type ? `?type=${type}` : ""
          }${genre ? `&genre=${genre}` : ""}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        const responseDataWatchList = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/watchlist`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` }
        );

        dispatch(authAction.setWatchList(responseDataWatchList.watchList));
        // console.log(responseData.lists);
        setMovieList(responseData.lists);
      } catch (error) {}
    };
    fetchInitData();
  }, [token, sendRequest, type, genre, dispatch]);
  return (
    <Fragment>
      <div className="home">
        <FeatureOption type={type} />
        <div className="movie-list-container">
          {movieList.length === 0 ? (
            <div className="warning">
              <h2>This movie genre will be coming soon. Stay tuned!</h2>
            </div>
          ) : (
            movieList.map((list) => (
              <MovieList movieList={list} key={list._id} />
            ))
          )}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Home;
