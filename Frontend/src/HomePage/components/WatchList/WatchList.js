import React from "react";

import { useSelector } from "react-redux";

import WatchListItem from "../WatchListItem/WatchListItem";

import "./WatchList.scss";

const WatchList = () => {
  const watchList = useSelector((state) => state.auth.watchlist);
  // console.log(watchList);
  return (
    <>
      <div className="watchList-container">
        <ul className="watchList-list">
          {watchList.length > 0 &&
            watchList.map((movieItem) => (
              <WatchListItem movieId={movieItem} key={movieItem} />
            ))}
          {watchList.length === 0 && (
            <p className="watchList-msg">Your watch list is empty.</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default WatchList;
