import React, { Component } from "react";
import { isAlpha, isAlphanumeric, isEmail, isStrongPassword } from "validator";

import Axios from "../../utils/Axios";

import "./UpdateProfile1.css";

const URL = "http://localhost:8080/";
export class UpdateProfile1 extends Component {
  state = {
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    usernameInput: "",
    passwordInput: "",
    firstNameInputError: "",
    lastNameInputError: "",
    emailInputError: "",
    usernameInputError: "",
    passwordInputError: "",
    passwordInputOnFocus: false,
    isButtonDisabled: true,
  };

  componentDidMount = async () => {
    try {
      let userData = await Axios.get(`${URL}api/user/get-user-info`);
      this.setState({
        firstNameInput: userData.data.firstName,
        lastNameInput: userData.data.lastName,
        emailInput: userData.data.email,
        usernameInput: userData.data.username,
        location: "",
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleOnChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        if (
          //handle the various input types and if any errors then button is disabled
          event.target.name === "firstNameInput" ||
          event.target.name === "lastNameInput"
        ) {
          this.handleFirstNameAndLastNameInput(event);
        }
        if (event.target.name === "usernameInput") {
          this.handlesUsernameInput(event);
        }

        if (event.target.name === "emailInput") {
          this.handlesEmailInput(event);
        }
        if (event.target.name === "passwordInput") {
          this.handlesPasswordInput();
        }
      }
    );
  };

  handleOnSubmit = async (event) => {
    event.preventDefault();

    let userInputObj = {
      firstName: this.state.firstNameInput,
      lastName: this.state.lastNameInput,
      email: this.state.emailInput,
      username: this.state.usernameInput,
      password: this.state.passwordInput,
      //TODO: if password not changed then, do change state. if changed validate, hash and salt -> change state.
    };
    try {
      let editedUser = await Axios.put(
        `${URL}api/user/update-profile`,
        userInputObj
      );
      if (editedUser) {
        window.localStorage.removeItem("jwtToken");
        this.props.props.history.push("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };

  ////////////////////////////////////////////
  //        Reused code from signup         //
  ////////////////////////////////////////////
  handleFirstNameAndLastNameInput = (event) => {
    if (this.state[event.target.name].length > 0) {
      if (isAlpha(this.state[event.target.name])) {
        this.setState({
          [`${event.target.name}Error`]: "",
        });
      } else {
        this.setState({
          [`${event.target.name}Error`]: `${event.target.placeholder} can only contain letters!`,
          isButtonDisabled: true,
        });
      }
    } else {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty.`,
        isButtonDisabled: true,
      });
    }
  };

  handlesUsernameInput = (event) => {
    if (this.state.usernameInput.length > 0) {
      if (isAlphanumeric(this.state.usernameInput)) {
        this.setState({
          usernameInputError: "",
        });
      } else {
        this.setState({
          usernameInputError: `${event.target.placeholder} can only have alphanumeric characters.`,
          isButtonDisabled: true,
        });
      }
    } else {
      this.setState({
        usernameInputError: `${event.target.placeholder} cannot be empty.`,
        isButtonDisabled: true,
      });
    }
  };

  handlesEmailInput = (event) => {
    if (this.state.emailInput.length === 0) {
      this.setState({
        emailInputError: "Email cannot be empty.",
        isButtonDisabled: true,
      });
    } else {
      if (isEmail(this.state.emailInput)) {
        this.setState({
          emailInputError: "",
        });
      } else {
        this.setState({
          emailInputError: "Please enter a valid Email!",
          isButtonDisabled: true,
        });
      }
    }
  };

  handlesPasswordInput = () => {
    if (this.state.passwordInput.length > 0) {
      if (isStrongPassword(this.state.passwordInput)) {
        this.setState({
          passwordInputError: "",
        });
      } else {
        this.setState({
          passwordInputError: `Password must be at least 8 characters long, have at least one uppercase and lowercase letter, and contain at least one special character.`,
          isButtonDisabled: true,
        });
      }
    } else {
      this.setState({
        passwordInputError: ``,
        isButtonDisabled: true,
      });
    }
  };

  handleInputOnFocus = (event) => {
    if (!this.state[`${event.target.name}OnFocus`]) {
      this.setState({
        [`${event.target.name}OnFocus`]: true,
      });
    }
  };

  handleOnBlur = (event) => {
    //if a field is empty when focus leaves then this helps display error message for empty field
    if (this.state[event.target.name].length === 0) {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
        isButtonDisabled: true,
      });
    }
  };
  ////////////////////////////////////////////
  //        Reused code from signup         //
  ////////////////////////////////////////////

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.isButtonDisabled === true) {
      if (this.state.passwordInputOnFocus) {
        if (
          this.state.firstNameInputError.length === 0 &&
          this.state.lastNameInputError.length === 0 &&
          this.state.emailInputError.length === 0 &&
          this.state.usernameInputError.length === 0 &&
          this.state.passwordInputError.length === 0 &&
          this.state.passwordInput.length > 7
        ) {
          this.setState({
            isButtonDisabled: false,
          });
        }
      }
    }
  };

  render() {
    const {
      firstNameInputError,
      lastNameInputError,
      emailInputError,
      usernameInputError,
      passwordInputError,
    } = this.state;
    return (
      <div className="form-div" style={{ width: "45%" }}>
        <div style={{ width: "100%" }}>
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
                    placeholder="First name"
                    value={this.state.firstNameInput}
                    onChange={this.handleOnChange}
                  />
                </label>
                <span className="errorMessage">
                  {firstNameInputError && firstNameInputError}
                  {/* if this is a truthy value then return the firstNameError */}
                </span>
              </div>
              <div>
                <label className="user-label">
                  Last Name
                  <input
                    type="text"
                    className="input-box"
                    name="lastNameInput"
                    placeholder="Last name"
                    value={this.state.lastNameInput}
                    onChange={this.handleOnChange}
                  />
                </label>
                <span className="errorMessage">
                  {lastNameInputError && lastNameInputError}
                  {/* if this is a truthy value then return the firstNameError */}
                </span>
              </div>
              <div>
                <label className="user-label">
                  Email
                  <input
                    type="email"
                    className="input-box"
                    name="emailInput"
                    placeholder="Email"
                    value={this.state.emailInput}
                    onChange={this.handleOnChange}
                  />
                </label>
                <span className="errorMessage">
                  {emailInputError && emailInputError}
                  {/* if this is a truthy value then return the firstNameError */}
                </span>
              </div>
              <div>
                <label className="user-label">
                  Username
                  <input
                    type="text"
                    className="input-box"
                    name="usernameInput"
                    placeholder="Username"
                    value={this.state.usernameInput}
                    onChange={this.handleOnChange}
                  />
                </label>
                <span className="errorMessage">
                  {usernameInputError && usernameInputError}
                  {/* if this is a truthy value then return the firstNameError */}
                </span>
              </div>
              <div>
                <label className="user-label">
                  Password
                  <input
                    type="text"
                    className="input-box"
                    name="passwordInput"
                    placeholder="enter new or current password"
                    onFocus={this.handleInputOnFocus}
                    onChange={this.handleOnChange}
                  />
                </label>
                <span className="errorMessage">
                  {passwordInputError && passwordInputError}
                  {/* if this is a truthy value then return the firstNameError */}
                </span>
              </div>
              <div className="button-div">
                <button
                  type="submit"
                  className="submit-edit"
                  disabled={this.state.isButtonDisabled}
                >
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

export default UpdateProfile1;
