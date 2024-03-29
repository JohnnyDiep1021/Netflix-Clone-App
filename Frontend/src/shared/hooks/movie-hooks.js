import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useHttpClient } from "./http-hook";

import { authAction } from "../store/auth";

export const useMovieBtn = (id = "") => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const watchList = useSelector((state) => state.auth.watchlist);
  const { sendRequest } = useHttpClient();
  const [addMovieState, setAddMovieState] = useState(
    watchList.some((movieId) => movieId === id)
  );
  const [message, setMessage] = useState({ msg: undefined, isShow: false });
  const watchListToggleHandler = useCallback(async () => {
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
        // console.log(responseData);
        if (!responseData.movieIsExisted) {
          dispatch(authAction.setWatchList(responseData.watchList));
          console.log("Added movie to watch list");
        }
        setAddMovieState(true);
        setMessage({
          msg: responseData.message || "Added movie to watch list",
          isShow: true,
        });
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
        // console.log(responseData);
        if (!responseData.movieIsExisted) {
          dispatch(authAction.setWatchList(responseData.watchList));
          console.log("Removed movie from watch list");
        }
        setAddMovieState(false);
        setMessage({
          msg: responseData.message || "Removed movie from watch list",
          isShow: true,
        });
      }
      clearMessage();
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
