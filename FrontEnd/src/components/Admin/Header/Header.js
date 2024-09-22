import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { LiaHeadsetSolid, LiaSearchSolid, LiaUser } from "react-icons/lia";

const Header = () => {
  return (
    <div className="header-admin">
      <main className="content">
        <div className="container">
          <div className="row App-header">
            <div className="col-3">
              <div className="display">
                <Link to="/admin/home" className="col feature-navi">
                  Home
                </Link>
                <Link to="/admin/shop" className="col feature-navi">
                  Shop
                </Link>
                <Link to="/admin/recipes" className="col feature-navi">
                  Recipes
                </Link>
              </div>
            </div>
            <div className="col-5">
              <div className="display">
                <div className="logo"></div>
                <p className="app-navi">SpiceUp</p>
              </div>
            </div>
            <div className="col-4">
              <div className="row display">
                <Link to="/contact" className="col conta ">
                  <div className="display">
                    <LiaHeadsetSolid className="contact"></LiaHeadsetSolid>
                    <p className="phone-navi" style={{ fontWeight: 500 }}>
                      Contact Us
                    </p>
                    <Link to="/contact"></Link>
                  </div>
                </Link>
                <div className="col icon-group">
                  <div className="col icon"> </div>
                  <div className="col icon">
                    {" "}
                    <LiaSearchSolid className="icon-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Header;
