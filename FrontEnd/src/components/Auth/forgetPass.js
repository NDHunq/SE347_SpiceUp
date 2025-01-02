import React from "react";
import "./forgetPass.scss";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header1 from "../User/Header/Header1";
import Footer from "../User/Footer/footer";
import { sendResetMail } from "../../services/userServices";
function ForgetPass() {
  const [userName, setUserName] = useState();

  const handleSubmit = async (event) => {
    const response = await sendResetMail(userName)

    if(response.status !== 200) {
      toast.error("Cannot send mail. Check your email again");
      return
    }
    toast.success("Send email successfully");
  };
  return (
    <>
      <Header1 />
      <div className="center-fg">
        <div className="container">
          <h1 className="title">
            <b>Forget Password</b>
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

          <button className="submit" onClick={handleSubmit}>
            Send Email
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

export default ForgetPass;
