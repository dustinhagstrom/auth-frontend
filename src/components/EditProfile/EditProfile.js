import React, { Component } from "react";

import Axios from "../utils/Axios";

import "./EditProfile.css";

const URL = "http://localhost:8080/";
export class EditProfile extends Component {
  state = {
    firstNameInput: "",
    lastNameInput: "",
    mobileNumberInput: "",
    emailInput: "",
    usernameInput: "",
    passwordInput: "",
  };

  componentDidMount = async () => {
    try {
      let userData = await Axios.get(`${URL}api/user/get-user-info`);
      console.log(userData.data);
      this.setState({
        firstNameInput: userData.data.firstName,
        lastNameInput: userData.data.lastName,
        emailInput: userData.data.email,
        usernameInput: userData.data.username,
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleOnChange = () => {};

  handleOnSubmit = () => {};

  render() {
    return (
      <div className="form-div">
        <div>
          <div className="edit-header">Edit Your Profile</div>
          <div>
            <form onSubmit={this.handleOnSubmit} className="user-info">
              <div>
                <label className="user-label">
                  First Name
                  <input
                    type="text"
                    className="input-box"
                    name="firstNameInput"
                    value={this.state.firstNameInput}
                    onChange={this.handleOnChange}
                  />
                </label>
              </div>
              <div>
                <label className="user-label">
                  Last Name
                  <input
                    type="text"
                    className="input-box"
                    name="lastNameInput"
                    value={this.state.lastNameInput}
                    onChange={this.handleOnChange}
                  />
                </label>
              </div>
              <div>
                <label className="user-label">
                  Email
                  <input
                    type="email"
                    className="input-box"
                    name="emailInput"
                    value={this.state.emailInput}
                    onChange={this.handleOnChange}
                  />
                </label>
              </div>
              <div>
                <label className="user-label">
                  Username
                  <input
                    type="text"
                    className="input-box"
                    name="usernameInput"
                    value={this.state.usernameInput}
                    onChange={this.handleOnChange}
                  />
                </label>
              </div>
              <div>
                <label className="user-label">
                  Password
                  <input
                    type="password"
                    className="input-box"
                    name="passwordInput"
                    placeholder="enter new password if desired"
                    onChange={this.handleOnChange}
                  />
                </label>
              </div>
              <div className="button-div">
                <button type="submit" className="submit-edit">
                  Submit Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;
