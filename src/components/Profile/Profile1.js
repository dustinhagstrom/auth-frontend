import React from "react";

import CreateFriend1 from "../CreateFriend/CreateFriend/CreateFriend1";
import UpdateProfile1 from "./UpdateProfile/UpdateProfile1";

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
      <UpdateProfile1 props={props} />
      <CreateFriend1 />
    </div>
  );
}

export default Profile1;
