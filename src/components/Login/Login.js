import React, { Component } from "react"; //bring in react, toast, validator, jwtdecode
import { toast } from "react-toastify";
import { isEmail, isEmpty } from "validator";
import jwtDecode from "jwt-decode";
import setAxiosAuthToken from "../utils/setAxiosAuthToken"; //bring in setAxiosAuthToken

import checkIfUserIsAuth from "../utils/checkIfUserIsAuth"; //bring in checkIfUserIsAuth
import Axios from "../utils/Axios"; //bring in Axios

import "./Login.css"; //bring in our css
export class Login extends Component {
  //make a login component and give state to track
  state = {
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    emailOnFocus: false,
    passwordOnFocus: false,
    isButtonDisabled: true,
  };

  componentDidMount() {
    //component did mount runs on refresh and initial page load
    let isAuth = checkIfUserIsAuth(); //checkIfUserIsAuth() returns true or false

    if (isAuth) {
      //if true then we are logged in -> go to /movie path
      this.props.history.push("/movie");
    }
  }

  handleOnChange = (event) => {
    //onchange func runs when there is an event
    this.setState(
      {
        //set the target field value to corresponding state name
        [event.target.name]: event.target.value,
      },
      () => {
        if (event.target.name === "email") {
          //if the target name is email
          if (isEmpty(this.state.email)) {
            // if empty then send message
            this.setState({
              emailError: "Email cannot be empty",
              isButtonDisabled: true,
            });
          } else {
            //if not email then set error to empty string
            if (isEmail(this.state.email)) {
              this.setState({
                emailError: "",
              });
            }
          }
        }
        if (event.target.name === "password") {
          //if the target name is password
          if (isEmpty(this.state.password)) {
            // if empty then send message
            this.setState({
              passwordError: "Password cannot be empty",
              isButtonDisabled: true,
            });
          } else {
            //if not password then set error to empty string
            this.setState({
              passwordError: "",
            });
          }
        }
      }
    );
  };

  componentDidUpdate(prevProps, prevState) {
    //these are always the first two args. this func is run after component did mount and runs after state change
    if (prevState.isButtonDisabled === true) {
      //if the button was already disabled
      if (this.state.emailOnFocus && this.state.passwordOnFocus) {
        //and we had focus on these two fields
        if (
          //and there are no errors and there is something within these fields then
          this.state.emailError.length === 0 &&
          this.state.passwordError.length === 0 &&
          this.state.email &&
          this.state.password
        ) {
          this.setState({
            //enable the button
            isButtonDisabled: false,
          });
        }
      }
    }
  }

  handleOnBlur = (event) => {
    //event occurs when focus is lost from target
    if (this.state[event.target.name].length === 0) {
      //if there is no content in field
      this.setState({
        //then throw cannot be empty message and make sure button is disabled.
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
    //func runs on button click for form submit
    event.preventDefault(); //prevent reloading everything

    try {
      //set user obj to values of state which is value of input field
      let userInputObj = {
        email: this.state.email,
        password: this.state.password,
      };
      let success = await Axios.post("api/user/login", userInputObj); //use Axios to make post req. with user obj to login
      console.log(success);
      let jwtToken = success.data.payload; //this is the token that was payload from backend
      console.log(jwtToken);

      setAxiosAuthToken(jwtToken); //tie the jwtToken to this instance. Now Axios will have this as the token. this sets up the authorization bearer token for sms message

      let decodedToken = jwtDecode(jwtToken); //use jwt decode to decode the jwt token into information
      console.log(decodedToken);

      this.props.handleUserLogin(decodedToken); //send the decoded token to app.js handleuserlogin func

      window.localStorage.setItem("jwtToken", jwtToken); //stores the jwt token in local storage

      this.props.history.push("/movie"); //the push here is from Router props history object. this handles the redirect

      console.log(success.data.message);
      toast.success("🦄 Login success!", {
        //make a toast happen
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
      console.log(e);
      console.log(e.response.status);
      if (e.response.status === 429) {
        //too many req status code
        toast.error(e.response.data); //make a error toast with response data
      }
      console.log(e.response.data.payload);
      toast.error(`🦄 ${e.response.data.payload}`, {
        //make a toast with all other error codes
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
    //sets focus states for each field from false to true if onfocus
    if (!this.state[`${event.target.name}OnFocus`]) {
      //makes the user go through all the fields
      this.setState({
        [`${event.target.name}OnFocus`]: true,
      });
    }
  };

  render() {
    //render func
    const { email, password, emailError, passwordError, isButtonDisabled } =
      this.state; //destructures from state
    return (
      //return all the jsx, inputs and buttons tied to funcs above through props
      <div className="container">
        <div className="form-text">Login</div>
        <div className="form-div">
          <form onSubmit={this.handleOnSubmit} className="form">
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
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

export default Login; //export login
