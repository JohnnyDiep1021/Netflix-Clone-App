import React, { Suspense, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { useAuth } from "./shared/hooks/auth-hook";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

// import Login from "./HomePage/pages/Login/Login";
// import Register from "./HomePage/pages/Registeration/Register";
// import Home from "./HomePage/pages/HomePage";
// import MovieView from "./HomePage/components/MovieView/MovieView";
// import SearchView from "./SearchPage/page/SearchView";
// import WatchList from "./HomePage/components/WatchList/WatchList";

import LoadingSpinner from "./shared/components/UI/Loading/LoadingSpinner";

import "./App.scss";

const Login = React.lazy(() => import("./HomePage/pages/Login/Login"));
const Register = React.lazy(() =>
  import("./HomePage/pages/Registeration/Register")
);
const Home = React.lazy(() => import("./HomePage/pages/HomePage"));
const MovieView = React.lazy(() =>
  import("./HomePage/components/MovieView/MovieView")
);
const SearchView = React.lazy(() => import("./SearchPage/page/SearchView"));
const WatchList = React.lazy(() =>
  import("./HomePage/components/WatchList/WatchList")
);

const App = () => {
  const { isLoggedIn } = useAuth();

  let routes;
  if (isLoggedIn) {
    routes = (
      <Fragment>
        <Switch>
          <Route path="/home" exact>
            <MainNavigation />
            <Home />
          </Route>
          <Route path="/category/:type">
            <MainNavigation />
            <Home />
          </Route>
          <Route path="/search">
            <MainNavigation />
            <SearchView />
          </Route>
          <Route path="/watchlist">
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
      <main className="main-container">
        <Suspense
          // if the dowloading process take more time, render the below fallback
          fallback={
            <div className="">
              <LoadingSpinner asOverlay />
            </div>
          }
        >
          {routes}
        </Suspense>
      </main>
    </Fragment>
  );
};

export default App;
