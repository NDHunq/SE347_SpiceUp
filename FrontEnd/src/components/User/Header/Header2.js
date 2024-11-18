import React from "react";
import { Link } from "react-router-dom";
import "./Header2.scss";
import {
  LiaHeadsetSolid,
  LiaShoppingCartSolid,
  LiaSearchSolid,
  LiaUser,
} from "react-icons/lia";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Avatar, Badge, Space } from "antd";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
const Header2 = () => {
  const qtyInCart = useSelector(state => state.qtyInCart.count);
  const dispatch = useDispatch();
  //fetch qtyInCart [dispatch({ type: 'plus', payload: value })]
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
                  <div className="col icon">
                    {" "}
                    <LiaSearchSolid className="icon-1" />
                  </div>
                  <div className="col icon">
                    <Link to="/shopping-cart">
                      <Badge count={qtyInCart} size="small">
                        <LiaShoppingCartSolid className="icon-1" />
                      </Badge>
                    </Link>
                  </div>

                  <div className="col icon">
                    {" "}
                    <Link to="/account/settings" className="link-acc">
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
