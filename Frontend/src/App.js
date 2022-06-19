import { Switch, Route, Link } from "react-router-dom";
import MovieView from "./HomePage/components/MovieView/MovieView";
import Home from "./HomePage/pages/HomePage";
import Register from "./HomePage/pages/Registeration/Register";
import Login from "./HomePage/pages/Login/Login";
function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
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
    </Switch>
  );
}

export default App;
