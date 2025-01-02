import React from "react";
import "./newPass.scss";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header1 from "../User/Header/Header1";
import Footer from "../User/Footer/footer";
import { changePassword } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
function NewPass() {
  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState();
  const [cf_password, setCFPassword] = useState();
  const nav = useNavigate()
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (event) => {
    const userId = localStorage.getItem("user_id")
    if(password !== cf_password) {
      toast.error("Confirmed passsword doesn't match");
      return 
    }
    
    const response = await changePassword(userId, oldPassword, password)

    if(response.status !== 200) {
      toast.error("Wrong old password")
      return
    }

    toast.success("Change password succesfully")
    nav("/home")
  };
  return (
    <>
      <Header1 />
      <div className="center-np">
        <div className="container">
          <h1 className="title">
            <b>New Password</b>
          </h1>

          <div>
            <input
              className="password"
              type="text"
              name="oldPassword"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(event) => setOldPassword(event.target.value)}
            />
          </div>
          <div>
            <input
              className="password"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div>
            <input
              className="password"
              type="password"
              name="password"
              placeholder="Confirm Password"
              value={cf_password}
              onChange={(event) => setCFPassword(event.target.value)}
            />
          </div>

          <button className="submit" onClick={handleSubmit}>
            Change Password
          </button>

          <div className="sign-up">
            Already have account{" "}
            <Link className="link" to="/signin">
              {" "}
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NewPass;
