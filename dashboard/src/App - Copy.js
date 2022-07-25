import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation/MainNavigation";
import SideBar from "./shared/components/Navigation/SideBar/SideBar";
import Home from "./pages/Home/Home";

import UserList from "./pages/UserList/UserList";
import User from "./pages/User/User";
import NewUser from "./pages/NewUser/NewUser";

import List from "./pages/List/List";
import ListItem from "./pages/ListItem/ListItem";
import NewList from "./pages/NewList/NewList";

import MovieList from "./pages/MovieList/MovieList";
import MovieItem from "./pages/Movie/MovieItem";
import NewMovie from "./pages/NewMovie/NewMovie";

import Login from "./pages/Login/SigninForm";
import { useSelector } from "react-redux";

import "./App.scss";

function App() {
  const token = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.auth.user?.isAdmin);
  let routes;
  if (token && isAdmin) {
    routes = (
      <Fragment>
        <MainNavigation />
        <main className="main-container">
          <SideBar />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/users" exact>
              <UserList />
            </Route>
            <Route path="/users/:userId">
              <User />
            </Route>
            <Route path="/newUser">
              <NewUser />
            </Route>
            <Route path="/movies" exact>
              <MovieList />
            </Route>
            <Route path="/movies/new">
              <NewMovie />
            </Route>
            <Route path="/movies/:movieId">
              <MovieItem />
            </Route>
            <Route path="/lists" exact>
              <List />
            </Route>
            <Route path="/lists/new">
              <NewList />
            </Route>
            <Route path="/lists/:listId">
              <ListItem />
            </Route>

            <Redirect to="/" />
          </Switch>
        </main>
      </Fragment>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }
  return <Fragment>{routes}</Fragment>;
}

export default App;
