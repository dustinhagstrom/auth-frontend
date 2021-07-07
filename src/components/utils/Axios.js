import axios from "axios";

const Axios = axios.create({
  //create an instance of axios and assign a baseUrl based on dev or prod
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "DEPLOY CLOUD ADDRESS",
  timeout: 50000, //set a timeout to kill the instance if not made within 5 seconds
});

export default Axios; //export Axios
