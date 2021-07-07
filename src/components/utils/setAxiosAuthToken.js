import Axios from "./Axios";

//make a function to set the Bearer token to our instance of Axios. takes in jwtToken at creation and ties it to our instance if the jwtToken exists, otherwise it will delete all stored Authorizations -- ex. logging out.
const setAxiosAuthToken = (jwtToken) => {
  //accepts token as arg
  if (jwtToken) {
    //if the token exists then, (from axios documents) set the Authorization header for `Bearer ${jwtToken}`
    Axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  } else {
    //else delete anything that is set for Authorization header
    delete Axios.defaults.headers.common["Authorization"];
  }
};

export default setAxiosAuthToken; //export func
