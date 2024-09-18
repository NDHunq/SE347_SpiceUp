import React from "react";
import { Link } from "react-router-dom";
import "./Header2.scss";
import { LiaShoppingCartSolid, LiaSearchSolid, LiaUser } from "react-icons/lia";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Avatar, Badge, Space } from "antd";
const Header2 = () => {
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
                <div className="col icon-group">
                  <div className="col icon">
                    {" "}
                    <LiaSearchSolid className="icon-1" />
                  </div>
                  <div className="col icon">
                    <Link to="/shopping-cart">
                      <Badge count={5} size="small">
                        <LiaShoppingCartSolid className="icon-1" />
                      </Badge>
                    </Link>
                  </div>

                  <div className="col icon">
                    {" "}
                    <Link to="/account" className="link-acc">
                      <LiaUser className="icon-1" />
                    </Link>
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

export default Header2;
