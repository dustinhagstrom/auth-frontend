import React, { Component } from "react";

export class FriendList extends Component {
  state = {
    editFirstNameInput: this.props.item.firstName,
    editLastNameInput: this.props.item.lastName,
    editMobilePhoneInput: this.props.item.mobileNumber,
    canEdit: false,
  };

  //   componentDidMount = () => {
  //     this.setState({});
  //   };

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmitOnClick = (_id) => {
    this.handleEditOnClick();

    this.props.handleEditByID(
      _id,
      this.state.editFirstNameInput,
      this.state.editLastNameInput,
      this.state.editMobilePhoneInput
    );
  };

  handleEditOnClick = (_id) => {
    this.setState((prevState) => {
      return {
        canEdit: !prevState.canEdit,
      };
    });
  };

  render() {
    const {
      canEdit,
      editFirstNameInput,
      editLastNameInput,
      editMobilePhoneInput,
    } = this.state;
    const { firstName, lastName, mobileNumber, _id } = this.props.item;
    return (
      <tbody className="friends-list">
        <tr>
          {canEdit ? (
            <>
              <td>
                <input
                  type="text"
                  name="editFirstNameInput"
                  value={editFirstNameInput}
                  onChange={this.handleOnChange}
                  className={_id}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="editLastNameInput"
                  value={editLastNameInput}
                  onChange={this.handleOnChange}
                  className={_id}
                />
              </td>
              <td>
                <input
                  type="tel"
                  name="editMobilePhoneInput"
                  value={editMobilePhoneInput}
                  onChange={this.handleOnChange}
                  className={_id}
                />
              </td>
            </>
          ) : (
            <>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{mobileNumber}</td>
            </>
          )}
          {canEdit ? (
            <td>
              <button
                onClick={() => {
                  this.handleSubmitOnClick(
                    _id,
                    editFirstNameInput,
                    editLastNameInput,
                    editMobilePhoneInput
                  );
                }}
              >
                Submit
              </button>
            </td>
          ) : (
            <td>
              <button
                onClick={() => {
                  this.handleEditOnClick(_id);
                }}
              >
                Edit Friend
              </button>
            </td>
          )}
        </tr>
      </tbody>
    );
  }
}

export default FriendList;
