import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";

import MainRouter from "./MainRouter";

import "./App.css";

export class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    let getJwtToken = window.localStorage.getItem("jwtToken");

    if (getJwtToken) {
      const currentTime = Date.now() / 1000;

      let decodedJWTToken = jwtDecode(getJwtToken);

      console.log("currentTime", currentTime);
      console.log("decodedJWTToken", decodedJWTToken);

      if (decodedJWTToken.exp < currentTime) {
        this.handleUserLogout();
      } else {
        this.handleUserLogin(decodedJWTToken);
      }
    }
  }

  handleUserLogin = (user) => {
    this.setState({
      user: {
        email: user.email,
      },
    });
  };

  handleUserLogout = () => {
    window.localStorage.removeItem("jwtToken"); //this uses logic to remove the expired jwt token or if user logs out.
    this.setState({
      user: null,
    });
  };

  render() {
    return (
      <>
        <ToastContainer />

        <MainRouter
          user={this.state.user}
          handleUserLogin={this.handleUserLogin}
          handleUserLogout={this.handleUserLogout}
        />
      </>
    );
  }
}

export default App;
