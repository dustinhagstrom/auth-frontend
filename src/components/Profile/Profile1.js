import React from "react";

import Friend1 from "../Friend/Friend1";
import EditProfile1 from "../EditProfile/EditProfile1";

function Profile1(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-evenly",
      }}
    >
      <EditProfile1 props={props} />
      <Friend1 />
    </div>
  );
}

export default Profile1;
