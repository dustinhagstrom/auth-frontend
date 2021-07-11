import React, { Component } from "react";

import "./EditProfile.css";

export class EditProfile extends Component {
  state = {
    firstNameInput: "",
    lastNameInput: "",
    mobileNumberInput: "",
    emailInput: "",
    usernameInput: "",
    passwordInput: "",
  };

  handleOnChange = () => {};

  handleOnSubmit = () => {};

  render() {
    return (
      <div className="form-div">
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
                  placeholder="firstName"
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
                  placeholder="lastName"
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
                  placeholder="email"
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
                  placeholder="username"
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
    );
  }
}

export default EditProfile;
