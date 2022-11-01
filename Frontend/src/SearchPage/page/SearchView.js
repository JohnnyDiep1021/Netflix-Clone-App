import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import queryString from "query-string";

import MovieItem from "../../HomePage/components/MovieItem/MovieItem";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./SearchView.scss";

const SearchView = (props) => {
  const token = useSelector((state) => state.auth.token);
  const { isLoading, sendRequest } = useHttpClient();
  const [queryResult, setQueryResult] = useState([]);
  const { search } = useLocation();
  const { q } = queryString.parse(search);
  useEffect(() => {
    const fetchInitData = async () => {
      const responseMovieData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/movies?search=${q}`,
        "GET",
        null,
        { Authorization: `Bearer ${token}` }
      );
      // console.log(responseMovieData);
      setQueryResult(responseMovieData);
    };
    fetchInitData();
  }, [q, sendRequest, token]);
  return (
    <div className="searchResult-container" movies={queryResult}>
      <ul className="searchResult-list">
        {Object.keys(queryResult).length !== 0 &&
          queryResult.movies.map((movie) => (
            <MovieItem
              className="large"
              key={movie.id}
              movie={movie}
              id={movie.id}
              loading={isLoading}
            />
          ))}
        {queryResult.message && (
          <div className="searchResult-msg">
            Oops, no movie found. Please, search movies by the title!
          </div>
        )}
      </ul>
    </div>
  );
};

export default SearchView;
