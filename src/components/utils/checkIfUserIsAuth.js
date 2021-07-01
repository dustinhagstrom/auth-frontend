import jwtDecode from "jwt-decode";

const checkIfUserIsAuth = () => {
  //check if token exists, if it doesn't exist then return false.
  //if it does exist, check if token is valid (aka not expired)
  //if expired => false
  //else => true

  let getJwtToken = window.localStorage.getItem("jwtToken");

  if (getJwtToken) {
    const currentTime = Date.now() / 1000;

    let decodedJWTToken = jwtDecode(getJwtToken);
    if (decodedJWTToken.exp < currentTime) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

export default checkIfUserIsAuth;
