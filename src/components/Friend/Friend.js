import React, { Component } from "react";
import Axios from "../utils/Axios";

import FriendList from "./FriendList";

import "./Friend.css";

const URL = "http://localhost:8080/";

export class Friend extends Component {
  state = {
    friendList: [],
    firstNameInput: "",
    lastNameInput: "",
    mobileNumberInput: "",
  };

  async componentDidMount() {
    try {
      let allFriends = await Axios.get(`${URL}api/friend/get-all-friends`);

      console.log(allFriends.data.friends);
      this.setState({
        friendList: allFriends.data.friends,
      });
    } catch (e) {
      console.log(e);
    }
  }

  handleOnChange = (event) => {
    console.log(event.target);
    this.setState({
      firstNameInput: event.target.value,
    });
  };

  handleOnSubmit = () => {};

  handleDeleteByID = async (_id) => {
    try {
    } catch (e) {
      console.log(e);
    }
  };

  handleEditByID = async (
    _id,
    editFirstNameInput,
    editLastNameInput,
    editMobilePhoneInput
  ) => {
    try {
      await Axios.put(`${URL}api/friend/edit-friend/${_id}`, {
        firstName: editFirstNameInput,
        lastName: editLastNameInput,
        mobileNumber: editMobilePhoneInput,
      });
      let updatedFriendListArray = this.state.friendList.map((item) => {
        if (item._id === _id) {
          item.firstName = editFirstNameInput;
          item.lastName = editLastNameInput;
          item.mobileNumber = editMobilePhoneInput;
        }
        return item;
      });
      this.setState({
        friendList: updatedFriendListArray,
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div className="friend-component">
        <div>
          <div className="friend-header">Add Friends</div>
          <div className="form-div">
            <form onSubmit={this.handleOnSubmit}>
              <label className="friend-label">
                Friend's First Name
                <input
                  type="text"
                  className="friend-info"
                  name="firstNameInput"
                  placeholder="Enter Friend's First Name"
                  value={this.state.firstNameInput}
                  onChange={this.handleOnChange}
                />
              </label>
              <label className="friend-label">
                Friend's Last Name
                <input
                  type="text"
                  className="friend-info"
                  name="lastNameInput"
                  placeholder="Enter Friend's Last Name"
                  onChange={this.handleOnChange}
                />
              </label>
              <label className="friend-label">
                Friend's Mobile Number
                <input
                  type="tel"
                  className="friend-info"
                  name="mobileNumberInput"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  placeholder="Enter Friend's Mobile Number"
                  onChange={this.handleOnChange}
                />
              </label>
              <div className="add-friend-div">
                <button className="add-friend">Add Friend</button>
              </div>
            </form>
          </div>
          <table>
            {this.state.friendList.map((item) => {
              return (
                <FriendList
                  item={item}
                  key={item._id}
                  inputID={item._id}
                  handleDeleteByID={this.handleDeleteByID}
                  handleEditByID={this.handleEditByID}
                />
              );
            })}
          </table>
        </div>
      </div>
    );
  }
}

export default Friend;
