import React from "react";
import { Link } from "react-router-dom";
import "./Header1.css";

const Header1 = () => {
  return (
    <div className="header">
      <main className="content">
        <div className="container">
          <div className="row App-header">
            <div className="col">
              <div className="display">
                <Link to="/home" className="col feature-navi">
                  Home
                </Link>
                <Link to="/shop" className="col feature-navi">
                  Shop
                </Link>
                <Link to="/recipes" className="col feature-navi">
                  Recipes
                </Link>
                <Link to="/about" className="col feature-navi">
                  About Us
                </Link>
              </div>
            </div>
            <div className="col">
              <div className="display">
                <div className="logo"></div>
                <p className="app-navi">SpiceUp</p>
              </div>
            </div>
            <div className="col">
              <div className="row display">
                <div className="col display">
                  <div className="phone"></div>
                  <p className="phone-navi">033333333</p>
                </div>
                <Link className="col SignUp-btn" to="/signup">
                  {" "}
                  <div>Sign Up</div>
                </Link>
                <Link className="col SignIn-btn" to="/signin">
                  {" "}
                  <div>Sign In</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Header1;
