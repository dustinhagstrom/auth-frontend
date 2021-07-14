import React, { Component } from "react";
import { toast } from "react-toastify";
import Axios from "../../utils/Axios";

export class UpdateProfile extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  };

  componentDidMount() {
    this.handleFetchUserInfo();
  }

  handleUserInputOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFetchUserInfo = async () => {
    try {
      let fetchedUserInfo = await Axios.get("/api/user/get-user-info");

      this.setState({
        firstName: fetchedUserInfo.data.payload.firstName,
        lastName: fetchedUserInfo.data.payload.lastName,
        username: fetchedUserInfo.data.payload.username,
        email: fetchedUserInfo.data.payload.email,
      });
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  handleUserUpdateSubmit = async (event) => {
    event.preventDefault(); //used with form submit buttons mostly, i believe
    try {
      let updatedUserProfile = await Axios.put("/api/user/update-profile", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        password: this.state.password,
      });

      if (updatedUserProfile.status === 202) {
        //status 202 if the user password was updated. -> logout user
        this.props.handleUserLogout();
        this.props.history.push("/login");
      } else {
        this.setState({
          firstName: updatedUserProfile.data.payload.firstName,
          lastName: updatedUserProfile.data.payload.lastName,
          username: updatedUserProfile.data.payload.username,
        });
      }

      toast.success("Profile Updated");
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  render() {
    return (
      <div>
        <div className="update-container">
          <h3>Update Profile</h3>
          <form onSubmit={this.handleUserUpdateSubmit}>
            <div className="input-div">
              <input
                placeholder="first name"
                value={this.state.firstName}
                name="firstName"
                onChange={this.handleUserInputOnChange}
              />
            </div>
            <div className="input-div">
              <input
                placeholder="last name"
                value={this.state.lastName}
                name="lastName"
                onChange={this.handleUserInputOnChange}
              />
            </div>
            <div className="input-div">
              <input
                placeholder="username"
                value={this.state.username}
                name="username"
                onChange={this.handleUserInputOnChange}
              />
            </div>
            <div className="input-div">
              <input
                placeholder="email"
                defaultValue={this.state.email}
                disabled={true}
              />
            </div>
            <div className="input-div">
              <input
                placeholder="password"
                name="password"
                onChange={this.handleUserInputOnChange}
              />
            </div>
            <div className="button-div">
              <button>Update</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateProfile;
