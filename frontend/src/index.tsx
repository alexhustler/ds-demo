import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import "./index.css";
import App from "./App";
import { store } from "./redux/configure-store";
import * as serviceWorker from "./serviceWorker";

const rootElement = document.getElementById("root");

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
};

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
