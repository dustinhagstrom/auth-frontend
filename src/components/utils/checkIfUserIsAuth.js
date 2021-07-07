import jwtDecode from "jwt-decode"; //bring in jwt decode

import setAxiosAuthToken from "./setAxiosAuthToken"; //bring in setAxiosAuthToken

const checkIfUserIsAuth = () => {
  //check if token exists, if it doesn't exist then return false.
  //if it does exist, check if token is valid (aka not expired)
  //if expired => false
  //else => true

  let getJwtToken = window.localStorage.getItem("jwtToken"); //get the token from local storage

  if (getJwtToken) {
    //if we have a token then
    const currentTime = Date.now() / 1000; //this is current time

    let decodedJWTToken = jwtDecode(getJwtToken); //decode the token
    if (decodedJWTToken.exp < currentTime) {
      //check if token expired
      setAxiosAuthToken(null); //if it is expired then send null as arg to setAxiosAuthToken func
      return false; //return false for authuser
    } else {
      setAxiosAuthToken(getJwtToken); //if not expired then send token as arg to setAxiosAuthToken func
      return true; //return false for authuser
    }
  } else {
    //all other cases the user is not auth so return false
    return false;
  }
};

export default checkIfUserIsAuth; //export checkifuserisauth
