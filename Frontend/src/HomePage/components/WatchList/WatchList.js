import React from "react";

import { useSelector } from "react-redux";

import WatchListItem from "../WatchListItem/WatchListItem";
import "./WatchList.scss";

const WatchList = () => {
  const watchList = useSelector((state) => state.auth.watchlist);

  return (
    <div className="watchList-container">
      <ul className="watchList-list">
        {watchList &&
          watchList.map((item) => (
            <WatchListItem movieId={item.movie} key={item.movie} />
          ))}
      </ul>
    </div>
  );
};

export default WatchList;
