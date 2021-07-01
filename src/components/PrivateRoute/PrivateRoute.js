import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import checkIfUserIsAuth from "../utils/checkIfUserIsAuth";

// const PrivateRoute = (props) => {
//   console.log(props);

//   return <Route exact path={props.path} component={props.component} />;
// };

// const PrivateRoute = (props) => {
//   console.log(props);

//   return (
//     <Route
//       exact
//       path={props.path}
//       render={() => (props.user ? props.component : <Redirect to="/login" />)}
//     />
//   );
// };

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  console.log(Component);
  return (
    <Route
      {...rest}
      render={(routerProps) =>
        checkIfUserIsAuth ? (
          <Component {...routerProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
