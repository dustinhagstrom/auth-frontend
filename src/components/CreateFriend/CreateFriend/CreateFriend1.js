import React, { Component } from "react";
import Axios from "../../utils/Axios";

import FriendList1 from "./Friend1";

import "./CreateFriend1.css";

const URL = "http://localhost:8080/";

export class CreateFriend1 extends Component {
  state = {
    friendList: [],
    firstNameInput: "",
    lastNameInput: "",
    mobileNumberInput: "",
    isButtonDisabled: true,
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
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleOnSubmit = async (event) => {
    //TODO: front-end validations
    try {
      let newFriend = {
        firstName: this.state.firstNameInput,
        lastName: this.state.lastNameInput,
        mobileNumber: this.state.mobileNumberInput,
      };
      let addedFriend = await Axios.post(
        `${URL}api/friend/create-friend`,
        newFriend
      );
      let newFriendArray = this.state.friendList;
      newFriendArray.push(addedFriend.data.payload);
      this.setState({
        friendList: newFriendArray,
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteByID = async (_id) => {
    try {
      let deletedFriend = await Axios.delete(
        `${URL}api/friend/delete-friend/${_id}`
      );
      //   console.log(deletedFriend.data.payload);
      let filteredFriends = this.state.friendList.filter(
        (item) => item._id !== deletedFriend.data.payload._id
      );
      this.setState({
        friendList: filteredFriends,
      });
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
      <div className="friend-component" style={{ width: "45%" }}>
        <div style={{ width: "100%" }}>
          <div className="friend-header">Add Friends</div>
          <div className="form-div">
            <form onSubmit={this.handleOnSubmit} style={{ width: "100%" }}>
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
                <button type="submit" className="add-friend">
                  Add Friend
                </button>
              </div>
            </form>
          </div>
          <div className="friend-header">Your Friends</div>
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: "25px 10px",
            }}
          >
            <thead>
              <tr className="friend-info-table">
                <th>First name</th>
                <th>Last name</th>
                <th>Mobile number</th>
              </tr>
            </thead>
            {this.state.friendList.map((item) => {
              return (
                <FriendList1
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

export default CreateFriend1;
