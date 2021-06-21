import React, { Component } from "react";
import "./Signup.css";

export class Signup extends Component {
  render() {
    return (
      <div className="container">
        <div className="form-text">Sign up</div>
        <div className="form-div">
          <form className="form">
            <div className="form-group-inline">
              <div className="inline-container">
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" />
              </div>
              <div className="inline-container">
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" />
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" />
              </div>
            </div>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
