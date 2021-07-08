import React, { Component } from "react";

export class FriendList extends Component {
  state = {
    editInput: "",
    canEdit: false,
    friend: "bobby", //this only here temporary, should come from props
  };

  handleOnChange = () => {};
  render() {
    const { canEdit, friend } = this.state;
    // const { friend } = this.props;
    return (
      <tbody className="friends-list">
        <tr>
          {canEdit ? (
            <td>
              <input
                type="text"
                name="editInput"
                // value={editInput}
                onChange={this.handleOnChange}
                // id={inputID}
              />
            </td>
          ) : (
            <td>{friend}</td>
          )}
          <td>
            <button>Edit Friend</button>
          </td>
          <td>
            <button>Delete Friend</button>
          </td>
        </tr>
      </tbody>
    );
  }
}

export default FriendList;
