import React, { Component } from "react";

import "./EditProfile.css";

export class EditProfile extends Component {
  state = {
    firstNameInput: "",
    lastNameInput: "",
    mobileNumberInput: "",
    emailInput: "",
    passwordInput: "",
  };

  handleOnChange = () => {};

  handleOnSubmit = () => {};

  render() {
    return (
      <div className="form-div">
        <div>
          <div className="edit-header">Edit Your Profile</div>
          <form className="user-info" onSubmit={this.handleOnSubmit}>
            <label className="user-label">
              First Name
              <input
                type="text"
                className="input-box"
                name="firstNameInput"
                placeholder="firstName"
                onChange={this.handleOnChange}
              />
            </label>
            <label className="user-label">
              Last Name
              <input
                type="text"
                className="input-box"
                name="lastNameInput"
                placeholder="lastName"
                onChange={this.handleOnChange}
              />
            </label>
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
            <div className="button-div">
              <button className="submit-edit">Submit Changes</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditProfile;
