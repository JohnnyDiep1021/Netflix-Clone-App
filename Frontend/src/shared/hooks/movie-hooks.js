import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useHttpClient } from "./http-hook";

import { authAction } from "../store/auth";

let list;
export const useMovieBtn = (id = "") => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const watchList = useSelector((state) => state.auth.watchlist);
  const { sendRequest } = useHttpClient();
  const [addMovieState, setAddMovieState] = useState(
    watchList.some((item) => item.movie === id)
  );
  const [message, setMessage] = useState({ msg: undefined, isShow: false });
  const watchListToggleHandler = useCallback(async () => {
    console.log(addMovieState);
    try {
      if (!addMovieState) {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/watchlist/add`,
          "PATCH",
          JSON.stringify({
            movie: id,
          }),
          {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        );
        console.log(responseData);
        setAddMovieState(true);
        dispatch(authAction.setWatchList(responseData.watchList));
        console.log("Added movie to watch list");
        setMessage({ msg: "Added movie to watch list", isShow: true });
      } else {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/watchlist/remove`,
          "PATCH",
          JSON.stringify({
            movie: id,
          }),
          {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        );
        console.log(responseData);
        setAddMovieState(false);
        dispatch(authAction.setWatchList(responseData.watchList));
        console.log("Removed movie from watch list");
        setMessage({ msg: "Removed movie from watch list", isShow: true });
      }
      clearMessage();
      console.log(watchList);
    } catch (error) {
      throw error;
    }
  }, [addMovieState, dispatch, sendRequest, token, id]);
  function clearMessage() {
    const timer = setTimeout(() => {
      setMessage((prevState) => {
        return { ...prevState, isShow: false };
      });
    }, 3000);
    return () => clearTimeout(timer);
  }
  return {
    watchListToggleHandler,
    addMovieState,
    message,
    clearMessage,
  };
};
