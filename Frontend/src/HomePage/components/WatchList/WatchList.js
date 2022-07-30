import React, { useState, useEffect } from "react";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useSelector } from "react-redux";

import WatchListItem from "../WatchListItem/WatchListItem";

import "./WatchList.scss";

const WatchList = () => {
  const token = useSelector((state) => state.auth.token);
  const [watchList, setWatchList] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchWatchList = async () => {
      const responseData = sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/watchlist`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(responseData);
      setWatchList(responseData.watchList);
    };
  }, [token, sendRequest]);
  return (
    <div className="watchList-container">
      <ul className="watchList-list">
        <WatchListItem />
        <WatchListItem />
        <WatchListItem />
        <WatchListItem />
      </ul>
    </div>
  );
};

export default WatchList;
