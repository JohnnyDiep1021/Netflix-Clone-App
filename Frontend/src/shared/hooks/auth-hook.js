import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authAction } from "../store/auth";
import { useHttpClient } from "./http-hook";

let loggoutTimer;

export const useAuth = () => {
  const dispatch = useDispatch();
  const { sendRequest } = useHttpClient();
  const token = useSelector((state) => state.auth.token);
  const tokenExpDate = useSelector((state) => state.auth.tokenExpDate);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // auto login;
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expTime) > new Date()
    ) {
      dispatch(
        authAction.login({
          token: storedData.token,
          expTime: storedData.expTime,
        })
      );
    }
  }, [dispatch]);

  // auto logout;
  // useEffect(() => {
  //   if (storedData && storedData.token && storedData.expTime) {
  //     const remainingTime =
  //       new Date(storedData.expTime).getTime() - new Date().getTime();
  //     loggoutTimer = setTimeout(async () => {
  //       try {
  //         const responseData = await sendRequest(
  //           `${process.env.REACT_APP_BACKEND_URL}/users/logout`,
  //           "POST",
  //           null,
  //           {
  //             Authorization: `Bearer ${storedData.token}`,
  //           }
  //         );
  //         console.log(responseData);
  //         dispatch(authAction.logout());
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }, remainingTime);
  //   } else {
  //     clearTimeout(loggoutTimer);
  //   }
  // }, [dispatch, sendRequest, storedData?.token]);
  useEffect(() => {
    if (token && tokenExpDate) {
      const remainingTime =
        new Date(tokenExpDate).getTime() - new Date().getTime();
      loggoutTimer = setTimeout(async () => {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/logout`,
            "POST",
            null,
            {
              Authorization: `Bearer ${token}`,
            }
          );
          console.log(responseData);
          dispatch(authAction.logout());
        } catch (err) {
          console.log(err);
        }
      }, remainingTime);
    } else {
      clearTimeout(loggoutTimer);
    }
  }, [dispatch, sendRequest, token, tokenExpDate]);

  return {
    token,
    tokenExpDate,
    isLoggedIn,
  };
};
