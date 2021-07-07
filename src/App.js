import React, { Component } from "react"; //bring in react, toast and jwtDecode
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";

import MainRouter from "./MainRouter"; //bring in MainRouter component
import setAxiosAuthToken from "./components/utils/setAxiosAuthToken";

import "./App.css"; //bring in app css

export class App extends Component {
  //make an app component with a user state to assist logic for whether user is logged in or not
  state = {
    user: null,
  };
  //use component did mount to determine if the jwt exists, and if it does then if it has expired or not
  //if not expired then handleuser login else handleuserlogout
  componentDidMount() {
    let getJwtToken = window.localStorage.getItem("jwtToken"); //get the token from local storage

    if (getJwtToken) {
      //if it exists, do following logic
      const currentTime = Date.now() / 1000; //the current time in secs.

      let decodedJWTToken = jwtDecode(getJwtToken); //use jwtDecode to get data from token

      console.log("currentTime", currentTime);
      console.log("decodedJWTToken", decodedJWTToken);

      if (decodedJWTToken.exp < currentTime) {
        //if it has expired
        this.handleUserLogout(); //go to logout func
      } else {
        this.handleUserLogin(decodedJWTToken); //go to login func
      }
    }
  }

  handleUserLogin = (user) => {
    // accepts user obj
    this.setState({
      user: {
        email: user.email, //set email to user.email
      },
    });
  };

  handleUserLogout = () => {
    window.localStorage.removeItem("jwtToken"); //this uses logic to remove the expired jwt token or if user logs out.
    setAxiosAuthToken(null); //pass in null to delete Authorizations tied to our instance
    this.setState({
      user: null, //reset user obj to null
    });
  };

  render() {
    return (
      <>
        <ToastContainer />
        {/* put the toast container at top and everything else below */}
        <MainRouter
          user={this.state.user} //give mainRouter access to user and login/logout
          handleUserLogin={this.handleUserLogin}
          handleUserLogout={this.handleUserLogout}
        />
      </>
    );
  }
}

export default App; //export app for use in other files
