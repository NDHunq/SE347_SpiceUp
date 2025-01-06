import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { LiaHeadsetSolid, LiaSearchSolid, LiaUser } from "react-icons/lia";

const Header = () => {
  const navigate = useNavigate();
  const handelLOgout = () => {
    localStorage.clear();
    navigate("/signin");
  };
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
                  <div className="display"></div>
                </Link>
                <div className="col icon-group">
                  <div className="col icon"> </div>
                  <div className=" Logout-btn " onClick={handelLOgout}>
                    Log out
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
