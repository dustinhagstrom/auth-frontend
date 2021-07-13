import React, { Component } from "react";

import UpdateProfile from "./UpdateProfile/UpdateProfile";

import "./Profile.css";
export class Profile extends Component {
  render() {
    return (
      <div>
        <UpdateProfile />
      </div>
    );
  }
}
export default Profile;
