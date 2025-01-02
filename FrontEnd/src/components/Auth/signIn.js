import React from "react";
import "./signIn.scss";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header1 from "../User/Header/Header1";
import Footer from "../User/Footer/footer";
import { signIn } from "../../services/authServices";
function SignIn() {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    debugger;

    const response = await signIn({
      email: userName,
      password: password,
    });

    if (response.status !== 200) {
      toast.error("Wrong email or password");
      return;
    }

    localStorage.setItem("jwt", response.data.data.jwt);
    localStorage.setItem("user_id", response.data.data.user_id);
    localStorage.setItem("email", response.data.data.email);
    localStorage.setItem("avatar", response.data.data.avatar);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", response.data.data.role);

    toast.success("Sign in successfully");
    if (response.data.data.role === "RS2") {
      navigate("/admin/home");
    } else {
      navigate("/home");
    }
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
