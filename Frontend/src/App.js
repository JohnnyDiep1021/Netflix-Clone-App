import { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import MovieView from "./HomePage/components/MovieView/MovieView";
import Home from "./HomePage/pages/HomePage";
import Register from "./HomePage/pages/Registeration/Register";
import Login from "./HomePage/pages/Login/Login";
function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);
  console.log(isAuthenticated);
  console.log(token);
  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/movies">
          <Home type="movies" />
        </Route>
        <Route path="/series">
          <Home type="series" />
        </Route>
        <Route path="/watch">
          <MovieView />
        </Route>
        <Redirect to="/" />
      </Switch>
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
  return <Fragment>{routes}</Fragment>;
}

export default App;
