import axios from "../utils/axiosCustomize";

const signIn = async (data) => {
  try{
    const response = await axios.post("/api/v1/login", data)
    return response
  } catch(e) {
    return e
  }
};


const signUp = async (data) => {
  try{
    const response = await axios.post("/api/v1/register", data)
    return response
  } catch(e) {
    return e
  }
  
};
export { signIn, signUp };
