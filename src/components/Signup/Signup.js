import React, { Component } from "react";
import { isAlpha, isAlphanumeric, isEmail, isStrongPassword } from "validator";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

import checkIfUserIsAuth from "../utils/checkIfUserIsAuth";
import Axios from "../utils/Axios";

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
    isButtonDisabled: true,
    firstNameOnFocus: false,
    lastNameOnFocus: false,
    usernameOnFocus: false,
    emailOnFocus: false,
    passwordOnFocus: false,
    confirmPasswordOnFocus: false,
  };

  //TODO max character limit for inputs, no whitespace, min lengths, etc.

  componentDidMount() {
    let isAuth = checkIfUserIsAuth();

    if (isAuth) {
      this.props.history.push("/movie");
    }
  }

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
          }
          // () => {
          //   this.handlesIsButtonDisabled();
          // }
        );
      } else {
        this.setState(
          {
            [`${event.target.name}Error`]: `${event.target.placeholder} can only contain letters!`,
            isButtonDisabled: true,
          }
          // () => {
          //   this.handlesIsButtonDisabled();
          // }
        );
      }
    } else {
      this.setState(
        {
          [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty.`,
          isButtonDisabled: true,
        }
        // () => {
        //   this.handlesIsButtonDisabled();
        // }
      );
    }
  };

  handlesUsernameInput = (event) => {
    if (this.state.username.length > 0) {
      if (isAlphanumeric(this.state.username)) {
        this.setState(
          {
            usernameError: "",
          }
          // () => {
          //   this.handlesIsButtonDisabled();
          // }
        );
      } else {
        this.setState(
          {
            usernameError: `${event.target.placeholder} can only have alphanumeric characters.`,
            isButtonDisabled: true,
          }
          // () => {
          //   this.handlesIsButtonDisabled();
          // }
        );
      }
    } else {
      this.setState(
        {
          usernameError: `${event.target.placeholder} cannot be empty.`,
          isButtonDisabled: true,
        }
        // () => {
        //   this.handlesIsButtonDisabled();
        // }
      );
    }
  };

  handlesEmailInput = (event) => {
    if (this.state.email.length === 0) {
      this.setState(
        {
          emailError: "Email cannot be empty.",
          isButtonDisabled: true,
        }
        // () => {
        //   this.handlesIsButtonDisabled();
        // }
      );
    } else {
      if (isEmail(this.state.email)) {
        this.setState(
          {
            emailError: "",
          }
          // () => {
          //   this.handlesIsButtonDisabled();
          // }
        );
      } else {
        this.setState(
          {
            emailError: "Please enter a valid Email!",
            isButtonDisabled: true,
          }
          // () => {
          //   this.handlesIsButtonDisabled();
          // }
        );
      }
    }
  };

  //i want it to check to see if the password is strong, if it is then no error message. but if the password doesn't match the confirm password block then I want the confirm password block to throw a matching error

  handlesPasswordInput = () => {
    if (this.state.confirmPasswordOnFocus) {
      if (this.state.password !== this.state.confirmPassword) {
        this.setState(
          {
            confirmPasswordError: "Your passwords do not match!",
            isButtonDisabled: true,
          }
          // () => {
          //   this.handlesIsButtonDisabled();
          // }
        );
      } else {
        this.setState(
          {
            confirmPasswordError: "",
          }
          // () => {
          //   this.handlesIsButtonDisabled();
          // }
        );
      }
    }

    if (this.state.password.length > 0) {
      if (isStrongPassword(this.state.password)) {
        this.setState(
          {
            passwordError: "",
          }
          // () => {
          //   this.handlesIsButtonDisabled();
          // }
        );
      } else {
        this.setState(
          {
            passwordError: `Password must be at least 8 characters long, have at least one uppercase and lowercase letter, and contain at least one special character.`,
            isButtonDisabled: true,
          }
          // () => {
          //   this.handlesIsButtonDisabled();
          // }
        );
      }
    } else {
      this.setState(
        {
          passwordError: `Password cannot be empty`,
          isButtonDisabled: true,
        }
        // () => {
        //   this.handlesIsButtonDisabled();
        // }
      );
    }
  };

  handlesConfirmPasswordInput = () => {
    if (this.state.confirmPassword.length > 0) {
      if (this.state.confirmPassword === this.state.password) {
        this.setState(
          {
            confirmPasswordError: "",
          }
          // () => {
          //   this.handlesIsButtonDisabled();
          // }
        );
      } else {
        this.setState(
          {
            confirmPasswordError: "Your passwords do not match!",
            isButtonDisabled: true,
          }
          // () => {
          //   this.handlesIsButtonDisabled();
          // }
        );
      }
    }
  };

  handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      let userInputObj = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      };
      let success = await Axios.post("/api/user/sign-up", userInputObj);
      console.log(success);
      toast.success(`User created - Please login`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      console.log(e.response);
      console.log(e.response.data.message);
      toast.error(`🦄 ${e.response.data.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  handleOnBlur = (event) => {
    if (this.state[event.target.name].length === 0) {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
        isButtonDisabled: true,
      });
    }
  };

  // handlesIsButtonDisabled = () => {
  //   if (
  //     this.state.firstName &&
  //     this.state.lastName &&
  //     this.state.username &&
  //     this.state.email &&
  //     this.state.password &&
  //     this.state.confirmPassword
  //   ) {
  //     if (
  //       this.state.confirmPasswordError ||
  //       this.state.passwordError ||
  //       this.state.usernameError ||
  //       this.state.emailError ||
  //       this.state.firstNameError ||
  //       this.state.lastNameError
  //     ) {
  //       this.setState({
  //         isButtonDisabled: true,
  //       });
  //     } else {
  //       this.setState({
  //         isButtonDisabled: false,
  //       });
  //     }
  //   } else {
  //     this.setState({
  //       isButtonDisabled: true,
  //     });
  //   }
  // };

  //any time setState called componentDidUpdate is called
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.isButtonDisabled === true) {
      if (
        this.state.firstNameOnFocus &&
        this.state.lastNameOnFocus &&
        this.state.usernameOnFocus &&
        this.state.emailOnFocus &&
        this.state.passwordOnFocus &&
        this.state.confirmPasswordOnFocus
      ) {
        if (
          this.state.firstNameError.length === 0 &&
          this.state.lastNameError.length === 0 &&
          this.state.usernameError.length === 0 &&
          this.state.emailError.length === 0 &&
          this.state.passwordError.length === 0 &&
          this.state.confirmPasswordError.length === 0 &&
          this.state.password === this.state.confirmPassword
        ) {
          this.setState({
            isButtonDisabled: false,
          });
        }
      }
    }
  };

  handleInputOnFocus = (event) => {
    if (!this.state[`${event.target.name}OnFocus`]) {
      this.setState({
        [`${event.target.name}OnFocus`]: true,
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
                  onFocus={this.handleInputOnFocus}
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
                  onFocus={this.handleInputOnFocus}
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
                  onFocus={this.handleInputOnFocus}
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
                  onFocus={this.handleInputOnFocus}
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
                  onFocus={this.handleInputOnFocus}
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
                  onFocus={this.handleInputOnFocus}
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
