import React, { Component } from "react"; //bring in react
import { Route, Redirect } from "react-router-dom"; //bring in route and redirect
import checkIfUserIsAuth from "../utils/checkIfUserIsAuth"; // bring in checkuser func

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

//privateroute functional component that takes props obj as arg.
const PrivateRoute = ({ component: Component, handleUserLogout, ...rest }) => {
  console.log(Component); //notice the capital letter for Component
  return (
    <Route
      {...rest} //bring in the props inherent to Route
      render={(
        //render prop can be set to a function that returns react element
        routerProps //routerProps inherent to Route??
      ) =>
        checkIfUserIsAuth() ? ( //display component if user logged in else redirect to login
          <Component {...routerProps} handleUserLogout={handleUserLogout} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute; //export privateroute
