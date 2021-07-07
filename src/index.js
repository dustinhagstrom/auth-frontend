import React from "react"; // bring in react, react-dom, and  app component
import ReactDOM from "react-dom";
import App from "./App";

import "react-toastify/dist/ReactToastify.css"; //bring in toastify css, base, and index css
import "./_base.css";
import "./index.css";
//below is the rendering of the entire website
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
