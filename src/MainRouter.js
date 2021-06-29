import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"; //bring in BrowserRouter component from react-router-dom and rename it as Router. Route is from react-router-dom as well

import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";

const MainRouter = () => {
  return (
    <Router>
      <Nav />
      <>
        <Route exact path="/sign-up" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </>
    </Router>
  );
};

export default MainRouter;
