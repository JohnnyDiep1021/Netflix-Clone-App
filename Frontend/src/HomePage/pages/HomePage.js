import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHttpClient } from "../../shared/hooks/http-hook";

import MovieList from "../components/MovieList/MovieList";
import FeatureOption from "../components/Feature/FeatureOtp";
import Navbar from "../../shared/components/Navigation/Navbar/Navbar";

import "./HomePage.scss";

const Home = (props) => {
  const token = useSelector((state) => state.auth.token);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [movieList, setMovieList] = useState([]);
  const { type = "movies", genre = "" } = props;
  useEffect(() => {
    const fetchMovieList = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/lists${
            type && "?type=" + type
          }${genre && "&genre=" + genre}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        console.log(responseData.lists);
        setMovieList(responseData.lists);
      } catch (error) {}
    };
    fetchMovieList();
  }, [token, sendRequest, type, genre]);
  return (
    <div className="home">
      <Navbar />
      <FeatureOption type={type} />
      <div className="movie-list-container">
        {movieList.map((list) => (
          <MovieList movieList={list} key={list._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
