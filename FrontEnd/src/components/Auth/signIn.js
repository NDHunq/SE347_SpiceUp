import React from "react";
import "./signIn.scss";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header1 from "../User/Header/Header1";
import Footer from "../User/Footer/footer";
function SignIn() {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    toast.success("Sign in successfully");
    navigate("/home");
  };
  return (
    <>
      <Header1 />
      <div className="center-si">
        <div className="container">
          <h1 className="title">
            <b>Sign In</b>
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
            <label class="custom-checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              <span class="checkmark"></span>
              Remember Me
            </label>
            <Link to="/forget-password" className="forget-pass">
              Forget password
            </Link>
          </div>

          <button className="submit" onClick={handleSubmit}>
            Sign In
          </button>
          <div className="group-icon">
            <Link to="/signin/google">
              <div className="gg"></div>
            </Link>
            <Link to="/signin/facebook">
              <div className="fb"></div>
            </Link>
          </div>
          <div className="sign-upp">
            Do you have any account?{" "}
            <Link className="linkk" to="/signup">
              {" "}
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignIn;
