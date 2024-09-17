import axios from "../utils/axiosCustomize";

const signIn = (email, password) => {
  //....
  return axios.post("/signin", data);
};
const signUp = (data) => {
  //....
  return axios.post("/signup", data);
};
export { signIn, signUp };
