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
      {...rest} //bring in the props inherent to Route
      render={(
        routerProps //routerProps inherent to Route??
      ) =>
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
