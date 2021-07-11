import React from "react";

import Friend from "../Friend/Friend";
import EditProfile from "../EditProfile/EditProfile";

function Profile(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-evenly",
      }}
    >
      <EditProfile props={props} />
      <Friend />
    </div>
  );
}

export default Profile;
