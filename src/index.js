//import "./assets/styles/index.css";
import React from "react";
import ReactDOM from "react-dom";
//import "./assets/styles/normalize.css";
import App from "./App";
import store from "./redux/store";
import "fontsource-roboto";



import { Provider } from "react-redux";

store.subscribe(() => {
  console.log("Mudança no Estado", store.getState());
});


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

