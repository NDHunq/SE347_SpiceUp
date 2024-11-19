import React from "react";
import "./signUp.scss";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header1 from "../User/Header/Header1";
import Footer from "../User/Footer/footer";
function SignUp() {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [cf_password, setCFPassword] = useState();
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    toast.success("Sign up successfully");
    navigate("/home");
  };
  return (
    <>
      <Header1 />
      <div className="center-su">
        <div className="container">
          <h1 className="title">
            <b>Sign Up</b>
          </h1>
          <div>
            <input
              className="email"
              type="email"
              name="Username"
              placeholder="Email"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
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
          <div>
            <label class="custom-checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              <span class="checkmark"></span>
              Accept all terms & Conditions
            </label>
          </div>

          <button className="submit" onClick={handleSubmit}>
            Sign Up
          </button>

          <div className="sign-upp">
            Already have account{" "}
            <Link className="linkk" to="/signin">
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

export default SignUp;
