import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"; //bring in BrowserRouter component from react-router-dom and rename it as Router. Route is from react-router-dom as well

import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import Movie from "./components/Movie/Movie";
import MovieDetail from "./components/Movie/MovieDetail";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const MainRouter = (props) => {
  return (
    <Router>
      <Nav user={props.user} handleUserLogout={props.handleUserLogout} />
      <>
        <PrivateRoute exact path="/movie" component={Movie} />
        <Route exact path="/sign-up" component={Signup} />
        <Route
          exact
          path="/login"
          render={(routerProps) => (
            <Login {...routerProps} handleUserLogin={props.handleUserLogin} />
          )}
        />
        {/* <Route
            exact
            path="/login"
            render={({ history, location, match, staticContext }) => (
              <Login
                history={history}
                location={location}
                match={match}
                staticContext={staticContext}
                handleUserLogin={props.handleUserLogin}
              />
            )}
          /> */}
        <PrivateRoute
          exact
          path="/movie-detail/:movieTitle"
          component={MovieDetail}
        />
        <Route exact path="/" component={Home} />
      </>
    </Router>
  );
};

export default MainRouter;
