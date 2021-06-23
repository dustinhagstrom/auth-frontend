import React, { Component } from "react";
import { isAlpha, isAlphanumeric, isEmail, isStrongPassword } from "validator";
import "./Signup.css";
export class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstNameError: "",
    lastNameError: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    onConfirmPasswordFocus: false,
    isButtonDisabled: true,
  };

  handleOnChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        if (
          event.target.name === "firstName" ||
          event.target.name === "lastName"
        ) {
          this.handleFirstNameAndLastNameInput(event);
        }
        if (event.target.name === "username") {
          this.handlesUsernameInput(event);
        }

        if (event.target.name === "email") {
          this.handlesEmailInput(event);
        }
        if (event.target.name === "password") {
          this.handlesPasswordInput();
        }
        if (event.target.name === "confirmPassword") {
          this.handlesConfirmPasswordInput();
        }
      }
    );
  };

  handleFirstNameAndLastNameInput = (event) => {
    if (this.state[event.target.name].length > 0) {
      if (isAlpha(this.state[event.target.name])) {
        this.setState(
          {
            [`${event.target.name}Error`]: "",
          },
          () => {
            this.handlesIsButtonDisabled();
          }
        );
      } else {
        this.setState(
          {
            [`${event.target.name}Error`]: `${event.target.placeholder} can only contain letters!`,
          },
          () => {
            this.handlesIsButtonDisabled();
          }
        );
      }
    } else {
      this.setState(
        {
          [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty.`,
        },
        () => {
          this.handlesIsButtonDisabled();
        }
      );
    }
  };

  handlesUsernameInput = (event) => {
    if (this.state.username.length > 0) {
      if (isAlphanumeric(this.state.username)) {
        this.setState(
          {
            usernameError: "",
          },
          () => {
            this.handlesIsButtonDisabled();
          }
        );
      } else {
        this.setState(
          {
            usernameError: `${event.target.placeholder} can only have alphanumeric characters.`,
          },
          () => {
            this.handlesIsButtonDisabled();
          }
        );
      }
    } else {
      this.setState(
        {
          usernameError: `${event.target.placeholder} cannot be empty.`,
        },
        () => {
          this.handlesIsButtonDisabled();
        }
      );
    }
  };

  handlesEmailInput = (event) => {
    if (this.state.email.length === 0) {
      this.setState(
        {
          emailError: "Email cannot be empty.",
        },
        () => {
          this.handlesIsButtonDisabled();
        }
      );
    } else {
      if (isEmail(this.state.email)) {
        this.setState(
          {
            emailError: "",
          },
          () => {
            this.handlesIsButtonDisabled();
          }
        );
      } else {
        this.setState(
          {
            emailError: "Please enter a valid Email!",
          },
          () => {
            this.handlesIsButtonDisabled();
          }
        );
      }
    }
  };

  //i want it to check to see if the password is strong, if it is then no error message. but if the password doesn't match the confirm password block then I want the confirm password block to throw a matching error

  handlesPasswordInput = () => {
    if (this.state.onConfirmPasswordFocus) {
      if (this.state.password !== this.state.confirmPassword) {
        this.setState(
          {
            confirmPasswordError: "Your passwords do not match!",
          },
          () => {
            this.handlesIsButtonDisabled();
          }
        );
      } else {
        this.setState(
          {
            confirmPasswordError: "",
          },
          () => {
            this.handlesIsButtonDisabled();
          }
        );
      }
    }

    if (this.state.password.length > 0) {
      if (isStrongPassword(this.state.password)) {
        this.setState(
          {
            passwordError: "",
          },
          () => {
            this.handlesIsButtonDisabled();
          }
        );
      } else {
        this.setState(
          {
            passwordError: `Password must be at least 8 characters long, have at least one uppercase and lowercase letter, and contain at least one special character.`,
          },
          () => {
            this.handlesIsButtonDisabled();
          }
        );
      }
    } else {
      this.setState(
        {
          passwordError: `Password cannot be empty`,
        },
        () => {
          this.handlesIsButtonDisabled();
        }
      );
    }
  };

  handlesConfirmPasswordInput = () => {
    if (this.state.confirmPassword.length > 0) {
      if (this.state.confirmPassword === this.state.password) {
        this.setState(
          {
            confirmPasswordError: "",
          },
          () => {
            this.handlesIsButtonDisabled();
          }
        );
      } else {
        this.setState(
          {
            confirmPasswordError: "Your passwords do not match!",
          },
          () => {
            this.handlesIsButtonDisabled();
          }
        );
      }
    }
  };

  handleOnSubmit = (event) => {
    event.preventDefault();

    console.log(this.state);
  };

  handleOnBlur = (event) => {
    if (this.state[event.target.name].length === 0) {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
      });
    }
  };

  handlesConfirmPasswordOnFocus = () => {
    if (!this.state.onConfirmPasswordFocus) {
      this.setState({
        onConfirmPasswordFocus: true,
      });
    }
  };

  handlesIsButtonDisabled = () => {
    if (
      this.state.firstName &&
      this.state.lastName &&
      this.state.username &&
      this.state.email &&
      this.state.password &&
      this.state.confirmPassword
    ) {
      if (
        this.state.confirmPasswordError ||
        this.state.passwordError ||
        this.state.usernameError ||
        this.state.emailError ||
        this.state.firstNameError ||
        this.state.lastNameError
      ) {
        this.setState({
          isButtonDisabled: true,
        });
      } else {
        this.setState({
          isButtonDisabled: false,
        });
      }
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  };

  render() {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      firstNameError,
      lastNameError,
      usernameError,
      emailError,
      passwordError,
      confirmPasswordError,
    } = this.state;

    return (
      <div className="container">
        <div className="form-text">Sign up</div>
        <div className="form-div">
          <form className="form" onSubmit={this.handleOnSubmit}>
            <div className="form-group-inline">
              <div className="inline-container">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  placeholder="First Name"
                  name="firstName"
                  onChange={this.handleOnChange}
                  autoFocus
                  onBlur={this.handleOnBlur}
                />
                <div className="errorMessage">
                  {firstNameError && firstNameError}
                  {/* if this is a truthy value then return the firstNameError */}
                </div>
              </div>
              <div className="inline-container">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  placeholder="Last Name"
                  name="lastName"
                  onChange={this.handleOnChange}
                  onBlur={this.handleOnBlur}
                />
                <div className="errorMessage">
                  {lastNameError && lastNameError}
                </div>
              </div>
            </div>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  placeholder="Email"
                  name="email"
                  onChange={this.handleOnChange}
                  onBlur={this.handleOnBlur}
                />
                <div className="errorMessage">{emailError && emailError}</div>
              </div>
            </div>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  placeholder="username"
                  name="username"
                  onChange={this.handleOnChange}
                  onBlur={this.handleOnBlur}
                />
                <div className="errorMessage">
                  {usernameError && usernameError}
                </div>
              </div>
            </div>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  id="password"
                  value={password}
                  placeholder="Password"
                  name="password"
                  onChange={this.handleOnChange}
                  onBlur={this.handleOnBlur}
                />
                <div className="errorMessage">
                  {passwordError && passwordError}
                </div>
              </div>
            </div>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="text"
                  id="confirmPassword"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={this.handleOnChange}
                  onBlur={this.handleOnBlur}
                  onFocus={this.handlesConfirmPasswordOnFocus}
                />
                <div className="errorMessage">
                  {confirmPasswordError && confirmPasswordError}
                </div>
              </div>
            </div>
            <div className="button-container">
              <button type="submit" disabled={this.state.isButtonDisabled}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Signup;
