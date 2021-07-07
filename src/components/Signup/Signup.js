import React, { Component } from "react"; //bring in react, validator, toast, jwt-decode
import { isAlpha, isAlphanumeric, isEmail, isStrongPassword } from "validator";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

import checkIfUserIsAuth from "../utils/checkIfUserIsAuth"; //bring in checkIfUserIsAuth
import Axios from "../utils/Axios"; //bring in Axios

import "./Signup.css"; //bring in css
export class Signup extends Component {
  //make signup component and assign state
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
    //runs on after render and on refresh
    let isAuth = checkIfUserIsAuth(); //true or false

    if (isAuth) {
      //if true then /movie path
      this.props.history.push("/movie");
    }
  }

  handleOnChange = (event) => {
    //on change event
    this.setState(
      {
        [event.target.name]: event.target.value, //set the corresponding state to input value
      },
      () => {
        if (
          //handle the various input types and if any errors then button is disabled
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
    //check first and last name for alpha chars
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
      //check first and last name for empty
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
      //if alphanumeric and length > 0 ->no errors
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
        //alphanumeric only error
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
      //empty error
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
      //if empty then empty error
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
        //if valid email format then no error
        this.setState(
          {
            emailError: "",
          }
          // () => {
          //   this.handlesIsButtonDisabled();
          // }
        );
      } else {
        //invalid email error
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
    //if password was in focus and the password doesn't match confirm password field then throw error
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
          //otherwise no error
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
        //if length > 0 and is strong password then no error
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
          //else strong password error
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
      //else it is empty so empty error
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
      //length > 0 and passwords match then no error
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
          //else passwords don't match
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
    event.preventDefault(); //prevent page reload

    try {
      let userInputObj = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      }; //obj made from user input
      let success = await Axios.post("/api/user/sign-up", userInputObj); //hit signup path and supply userinputobj
      console.log(success);
      toast.success(`User created - Please login`, {
        //toast success
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      //catch errors
      console.log(e.response);
      console.log(e.response.data.message);
      toast.error(`🦄 ${e.response.data.message}`, {
        //toast error
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
    //if a field is empty when focus leaves then this helps display error message for empty field
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
    //always this order for 1st 2 args
    if (prevState.isButtonDisabled === true) {
      //is the button was disabled
      if (
        //and all the fields were in focus
        this.state.firstNameOnFocus &&
        this.state.lastNameOnFocus &&
        this.state.usernameOnFocus &&
        this.state.emailOnFocus &&
        this.state.passwordOnFocus &&
        this.state.confirmPasswordOnFocus
      ) {
        if (
          //and we don't have any errors and the passwords match each other
          this.state.firstNameError.length === 0 &&
          this.state.lastNameError.length === 0 &&
          this.state.usernameError.length === 0 &&
          this.state.emailError.length === 0 &&
          this.state.passwordError.length === 0 &&
          this.state.confirmPasswordError.length === 0 &&
          this.state.password === this.state.confirmPassword
        ) {
          //then enable the button
          this.setState({
            isButtonDisabled: false,
          });
        }
      }
    }
  };

  handleInputOnFocus = (event) => {
    //handles the focus for each input
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
    } = this.state; //destructure state

    return (
      //jsx with func tied in
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
export default Signup; //export signup
