import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useHttpClient } from "./http-hook";

import { authAction } from "../store/auth";

export const useMovieBtn = (movieState) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { sendRequest } = useHttpClient();
  const [addMovieState, setAddMovieState] = useState(movieState);
  const [message, setMessage] = useState();
  const watchListToggleHandler = useCallback(
    async (movieId) => {
      try {
        if (!addMovieState) {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/watchlist/add`,
            "PATCH",
            JSON.stringify({
              movie: movieId,
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
          setMessage("Added movie to watch list");
        } else {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/watchlist/remove`,
            "PATCH",
            JSON.stringify({
              movie: movieId,
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
          setMessage("Removed movie from watch list");
        }
      } catch (error) {
        throw error;
      }
    },
    [addMovieState, dispatch, sendRequest, token]
  );
  return { watchListToggleHandler, addMovieState, message };
};
