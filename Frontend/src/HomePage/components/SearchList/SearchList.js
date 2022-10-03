import React from "react";

import SearchItem from "../SearchItem/SearchItem";

import LoadingSpinner from "../../../shared/components/UI/Loading/LoadingSpinner";
import "./SearchList.scss";

const SearchList = (props) => {
  console.log(props.resultList);
  if (props.resultList.message) {
    return (
      <div className="emptyList-container">
        <div className="emptyList_content">
          {props.isLoading && <LoadingSpinner asOverlay="center" inherit />}
          {!props.isLoading && props.resultList.message}
        </div>
      </div>
    );
  }
  return (
    <ul className={`searchList-container ${props.isLoading && "loading"}`}>
      <div className="searchList_content">
        {props.isLoading && <LoadingSpinner asOverlay="center" inherit />}
        {!props.isLoading &&
          props.resultList.movies.map((movie) => {
            return <SearchItem key={movie._id} element="sml" movie={movie} />;
          })}
      </div>
    </ul>
  );
};

export default SearchList;
