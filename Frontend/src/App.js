import { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./shared/components/Navigation/Navbar/Navbar";
import MovieView from "./HomePage/components/MovieView/MovieView";
import Home from "./HomePage/pages/HomePage";
import Register from "./HomePage/pages/Registeration/Register";
import Login from "./HomePage/pages/Login/Login";

import "./App.scss";
import WatchList from "./HomePage/components/WatchList/WatchList";
function App() {
  const token = useSelector((state) => state.auth.token);
  // console.log(token);
  let routes;
  if (token) {
    routes = (
      <Fragment>
        <Switch>
          <Route path="/" exact>
            <Navbar />
            <Home type="" />
          </Route>
          <Route path="/category/:type" exact>
            <Navbar />
            <Home />
          </Route>
          {/* <Route path="/search/:match">
            <Home type="" />
          </Route> */}
          {/* <Route path="/movies">
            <Navbar />
            <Home type="movies" />
          </Route>
          <Route path="/series">
            <Navbar />
            <Home type="series" />
          </Route> */}
          <Route path="/watchlist">
            <Navbar />
            <WatchList />
          </Route>
          <Route path="/watch">
            <MovieView />
          </Route>
          <Redirect to="/" />
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
