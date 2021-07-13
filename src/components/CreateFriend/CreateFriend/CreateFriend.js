import React, { Component } from "react";
import { toast } from "react-toastify";

import Friend from "./Friend";

import Axios from "../../utils/Axios";

export class CreateFriend extends Component {
  state = {
    friendFirstName: "",
    friendLastName: "",
    friendMobileNumber: "",
    friendArray: [],
  };

  componentDidMount() {
    this.handleGetAllFriends();
  }

  handleGetAllFriends = async () => {
    try {
      let getAllFriends = await Axios.get("/api/friend/get-all-friends");
      this.setState({
        friendArray: getAllFriends.data.friends,
      });
    } catch (e) {
      toast.error(e.response.data.message);
    }
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
      <>
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
        <hr />
        <Friend friendArray={this.state.friendArray} />
      </>
    );
  }
}

export default CreateFriend;
