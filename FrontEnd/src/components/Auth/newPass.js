import React from "react";
import "./newPass.scss";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header1 from "../User/Header/Header1";
import Footer from "../User/Footer/footer";
function NewPass() {
  const [otp, setOTP] = useState();
  const [password, setPassword] = useState();
  const [cf_password, setCFPassword] = useState();
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event) => {
    toast.success("Change Password successfully");
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
              name="Otp"
              placeholder="OTP Code"
              value={otp}
              onChange={(event) => setOTP(event.target.value)}
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
