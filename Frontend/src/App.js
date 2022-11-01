import { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { useAuth } from "./shared/hooks/auth-hook";
import Navbar from "./shared/components/Navigation/Navbar";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

import MovieView from "./HomePage/components/MovieView/MovieView";
import SearchView from "./SearchPage/page/SearchView";
import Home from "./HomePage/pages/HomePage";
import Register from "./HomePage/pages/Registeration/Register";
import Login from "./HomePage/pages/Login/Login";

import "./App.scss";
import WatchList from "./HomePage/components/WatchList/WatchList";

function App() {
  const { isLoggedIn } = useAuth();

  let routes;
  if (isLoggedIn) {
    routes = (
      <Fragment>
        <Switch>
          <Route path="/home" exact>
            {/* <Navbar /> */}
            <MainNavigation />
            <Home />
          </Route>
          <Route path="/category/:type">
            {/* <Navbar /> */}
            <MainNavigation />
            <Home />
          </Route>
          <Route path="/search">
            {/* <Navbar /> */}
            <MainNavigation />
            <SearchView />
          </Route>
          <Route path="/watchlist">
            {/* <Navbar /> */}
            <MainNavigation />
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
