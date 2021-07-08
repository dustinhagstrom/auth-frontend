import React, { Component } from "react";
import Friend from "../Friend/Friend";
import EditProfile from "../EditProfile/EditProfile";

export class Profile extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-evenly",
        }}
      >
        <EditProfile />
        <Friend />
      </div>
    );
  }
}

export default Profile;
