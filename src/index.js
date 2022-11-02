import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";
import { Provider } from "react-redux";
import rootReducer from "./redux/rootReducer";
import reduxThunk from "redux-thunk";

const composeEnhancers = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"];

function loggerMiddleware(store) {
  return function (next) {
    return function (action) {
      const result = next(action);
      //console.log('Middleware', store.getState());
      return result;
    };
  };
}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, reduxThunk))
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
