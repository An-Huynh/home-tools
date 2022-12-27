import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_HOME_TOOLS_SERVICE,
  headers: {
    "content-type": "application/json",
    accept: "application/json",
  },
});

export default instance;
