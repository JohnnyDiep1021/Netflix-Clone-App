import React, { Fragment, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation/MainNavigation";
import SideBar from "./shared/components/Navigation/SideBar/SideBar";
import Home from "./pages/Home/Home";
import UserList from "./pages/UserList/UserList";
import User from "./pages/User/User";
import NewUser from "./pages/NewUser/NewUser";
import ProductList from "./pages/ProductList/ProductList";
import Product from "./pages/Product/Product";
import NewProduct from "./pages/NewProduct/NewProduct";
import Login from "./pages/Login/SigninForm";
import { useSelector } from "react-redux";

import "./App.scss";

function App() {
  const token = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.auth.user?.isAdmin);
  let routes;
  console.log(token, isAdmin);
  if (token && isAdmin) {
    console.log("logging in!");
    routes = (
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
        <Route path="/products" exact>
          <ProductList />
        </Route>
        <Route path="/products/:productId">
          <Product />
        </Route>
        <Route path="/newProduct">
          <NewProduct />
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
        <Redirect to="/login" />
      </Switch>
    );
  }
  return (
    <Fragment>
      <MainNavigation />
      <main className="main-container">
        <SideBar />
        {routes}
      </main>
    </Fragment>
  );
}

export default App;
