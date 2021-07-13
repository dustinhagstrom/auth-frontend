import React, { Component } from "react";

export class FriendList extends Component {
  state = {
    toggle: false,
    firstName: "",
    lastName: "",
    mobileNumber: "",
  };

  handleToggle = () => {
    this.setState((prevState) => {
      return {
        toggle: !prevState.toggle,
      };
    });
  };

  handleUpdateFriendChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { friend } = this.props;
    const { toggle } = this.state;
    return (
      <tr key={friend._id}>
        {toggle ? (
          <>
            <td>
              <input
                name="firstName"
                onChange={this.handleUpdateFriendChange}
                defaultValue={friend.firstName}
              />
            </td>
            <td>
              <input
                name="lastName"
                onChange={this.handleUpdateFriendChange}
                defaultValue={friend.lastName}
              />
            </td>
            <td>
              <input
                name="mobileNumber"
                onChange={this.handleUpdateFriendChange}
                defaultValue={friend.mobileNumber}
              />
            </td>
          </>
        ) : (
          <>
            <td>{friend.firstName}</td>
            <td>{friend.lastName}</td>
            <td>{friend.mobileNumber}</td>
          </>
        )}

        <td onClick={this.handleToggle}>Edit</td>
        <td>Delete</td>
      </tr>
    );
  }
}

export default FriendList;
