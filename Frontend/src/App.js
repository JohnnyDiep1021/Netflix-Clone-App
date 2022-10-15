import { Fragment, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { authAction } from "./shared/store/auth";
import { useHttpClient } from "./shared/hooks/http-hook";

import Navbar from "./shared/components/Navigation/Navbar/Navbar";
import MovieView from "./HomePage/components/MovieView/MovieView";
import SearchView from "./SearchPage/page/SearchView";
import Home from "./HomePage/pages/HomePage";
import Register from "./HomePage/pages/Registeration/Register";
import Login from "./HomePage/pages/Login/Login";

import "./App.scss";
import WatchList from "./HomePage/components/WatchList/WatchList";

let loggoutTimer;

function App() {
  // console.log(token);
  const token = useSelector((state) => state.auth.token);
  const tokenExpDate = useSelector((state) => state.auth.tokenExpDate);
  const { sendRequest } = useHttpClient();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const storedData = JSON.parse(localStorage.getItem("userData"));

  // auto login;
  useEffect(() => {
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
  }, [dispatch, storedData]);

  // auto logout;
  useEffect(() => {
    if (storedData && storedData.token && storedData.expTime) {
      const remainingTime =
        new Date(storedData.expTime).getTime() - new Date().getTime();
      loggoutTimer = setTimeout(async () => {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/logout`,
            "POST",
            null,
            {
              Authorization: `Bearer ${storedData.token}`,
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
  }, [dispatch, sendRequest, storedData?.token]);
  let routes;
  if (isLoggedIn) {
    routes = (
      <Fragment>
        <Switch>
          <Route path="/home" exact>
            <Navbar />
            <Home />
          </Route>
          <Route path="/category/:type">
            <Navbar />
            <Home />
          </Route>
          <Route path="/search">
            <Navbar />
            <SearchView />
          </Route>
          <Route path="/watchlist">
            <Navbar />
            <WatchList />
          </Route>
          <Route path="/watch">
            <MovieView />
          </Route>
          <Redirect to="/home" />
        </Switch>
      </Fragment>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }
  return (
    <Fragment>
      <main className="main-container">{routes}</main>
    </Fragment>
  );
}

export default App;
