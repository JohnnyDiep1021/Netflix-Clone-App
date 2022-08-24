import React, { useState, useEffect } from "react";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useSelector } from "react-redux";

import WatchListItem from "../WatchListItem/WatchListItem";
import "./WatchList.scss";

const WatchList = () => {
  const token = useSelector((state) => state.auth.token);
  const [watchList, setWatchList] = useState([]);
  const { sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchWatchList = async () => {
      const responseData = await sendRequest(
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
    fetchWatchList();
  }, [token, sendRequest]);
  return (
    <div className="watchList-container">
      <ul className="watchList-list">
        {watchList && watchList.map((item) => <WatchListItem movieId={item} />)}
      </ul>
    </div>
  );
};

export default WatchList;
