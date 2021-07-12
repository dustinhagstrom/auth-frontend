import React, { Component } from "react";
import { toast } from "react-toastify";
import Axios from "../utils/Axios";
import "./Profile.css";
export class Profile extends Component {
  state = {
    friendFirstName: "",
    friendLastName: "",
    friendMobileNumber: "",
    friendArray: [],
  };
  handleOnFriendChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleFriendSubmit = async (event) => {
    event.preventDefault();
    try {
      let createdFriend = await Axios.post("/api/friend/create-friend", {
        firstName: this.state.friendFirstName,
        lastName: this.state.friendLastName,
        mobileNumber: this.state.friendMobileNumber,
      });
      this.setState({
        friendFirstName: "",
        friendLastName: "",
        friendMobileNumber: "",
        friendArray: [...this.state.friendArray, createdFriend.data],
      });
      toast.success("Friend Created!");
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.payload);
    }
  };
  render() {
    return (
      <div>
        <div className="update-container">
          <h3>Update Profile</h3>
          <form>
            <div className="input-div">
              <input placeholder="first name" />
            </div>
            <div className="input-div">
              <input placeholder="last name" />
            </div>
            <div className="input-div">
              <input placeholder="username" />
            </div>
            <div className="input-div">
              <input placeholder="email" />
            </div>
            <div className="input-div">
              <input placeholder="password" />
            </div>
            <div className="button-div">
              <button>Update</button>
            </div>
          </form>
        </div>
        <hr />
        <div className="update-container">
          <h3>Create Friend</h3>
          <form onSubmit={this.handleFriendSubmit}>
            <div className="input-div">
              <input
                placeholder="first name"
                onChange={this.handleOnFriendChange}
                name="friendFirstName"
                value={this.state.friendFirstName}
              />
            </div>
            <div className="input-div">
              <input
                placeholder="last name"
                onChange={this.handleOnFriendChange}
                name="friendLastName"
                value={this.state.friendLastName}
              />
            </div>
            <div className="input-div">
              <input
                placeholder="mobile number"
                onChange={this.handleOnFriendChange}
                name="friendMobileNumber"
                value={this.state.friendMobileNumber}
              />
            </div>
            <div className="button-div">
              <button>Create Friend</button>
            </div>
          </form>
        </div>
        <div className="update-container"></div>
      </div>
    );
  }
}
export default Profile;
