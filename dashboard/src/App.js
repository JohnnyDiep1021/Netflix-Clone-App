import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation/MainNavigation";
import SideBar from "./shared/components/Navigation/SideBar/SideBar";
import Home from "./pages/Home/Home";
import UserList from "./pages/UserList/UserList";
import User from "./pages/User/User";
import NewUser from "./pages/NewUser/NewUser";

import "./App.scss";

function App() {
  return (
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
          <Redirect to="/" />
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
