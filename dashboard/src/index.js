import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./shared/store/store";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
