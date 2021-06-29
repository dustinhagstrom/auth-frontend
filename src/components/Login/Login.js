import React, { Component } from "react";
import { toast } from "react-toastify";
import { isEmail, isEmpty } from "validator";

import Axios from "../utils/Axios";

import "./Login.css";
export class Login extends Component {
  state = {
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    emailOnFocus: false,
    passwordOnFocus: false,
    isButtonDisabled: true,
  };

  handleOnChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        if (event.target.name === "email") {
          if (isEmpty(this.state.email)) {
            this.setState({
              emailError: "Email cannot be empty",
              isButtonDisabled: true,
            });
          } else {
            if (isEmail(this.state.email)) {
              this.setState({
                emailError: "",
              });
            } else {
              this.setState({
                emailError: "Please enter a valid email.",
                isButtonDisabled: true,
              });
            }
          }
        }
        if (event.target.name === "password") {
          if (isEmpty(this.state.password)) {
            this.setState({
              passwordError: "Password cannot be empty",
              isButtonDisabled: true,
            });
          } else {
            this.setState({
              passwordError: "",
            });
          }
        }
      }
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isButtonDisabled === true) {
      if (this.state.emailOnFocus && this.state.passwordOnFocus) {
        if (
          this.state.emailError.length === 0 &&
          this.state.passwordError.length === 0 &&
          this.state.email &&
          this.state.password
        ) {
          this.setState({
            isButtonDisabled: false,
          });
        }
      }
    }
  }

  handleOnBlur = (event) => {
    if (this.state[event.target.name].length === 0) {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
        isButtonDisabled: true,
      });
    }
  };

  // handlesEmailInput = (event) => {
  //   if (this.state.email.length === 0) {
  //     this.setState({
  //       emailError: "Email cannot be empty.",
  //       isButtonDisabled: true,
  //     });
  //   } else {
  //     this.setState({
  //       emailError: "",
  //       isButtonDisabled: false,
  //     });
  //   }
  // };

  // handlesPasswordInput = (event) => {
  //   if (this.state.password.length === 0) {
  //     this.setState({
  //       passwordError: "Password cannot be empty",
  //       isButtonDisabled: true,
  //     });
  //   } else {
  //     this.setState({
  //       passwordError: "",
  //       isButtonDisabled: false,
  //     });
  //   }
  // };

  handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      let userInputObj = {
        email: this.state.email,
        password: this.state.password,
      };
      let success = await Axios.post("api/user/login", userInputObj);

      let jwtToken = success.data.payload;

      window.localStorage.setItem("jwtToken", jwtToken);

      console.log(success.data.message);
      toast.success("🦄 Login success!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      console.log(e);
      console.log(e.response.status);
      if (e.response.status === 429) {
        toast.error(e.response.data);
      }
      console.log(e.response.data.payload);
      toast.error(`🦄 ${e.response.data.payload}`, {
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

  handleInputOnFocus = (event) => {
    if (!this.state[`${event.target.name}OnFocus`]) {
      this.setState({
        [`${event.target.name}OnFocus`]: true,
      });
    }
  };

  render() {
    const { email, password, emailError, passwordError, isButtonDisabled } =
      this.state;
    return (
      <div className="container">
        <div className="form-text">Login</div>
        <div className="form-div">
          <form onSubmit={this.handleOnSubmit} className="form">
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  name="email"
                  placeholder="Email"
                  onChange={this.handleOnChange}
                  autoFocus
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">{emailError && emailError}</div>
              </div>
            </div>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  id="password"
                  value={password}
                  name="password"
                  placeholder="Password"
                  onChange={this.handleOnChange}
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
                  {passwordError && passwordError}
                </div>
              </div>
            </div>
            <div className="button-container">
              <button type="submit" disabled={isButtonDisabled}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
