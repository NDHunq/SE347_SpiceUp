import React from "react";
import "./top.css";

const Header = ({ navItems }) => {
  const endIndex = navItems.length - 1; // Lấy phần tử cuối cùng
  const lastItem = navItems[endIndex]; // Lấy phần tử cuối cùng
  return (
    <div className="header_route">
      <div className="container">
        <div className="row App-header ">
          <div className="col">
            <div className="col text">
              <div className="displayFlex">
                <div className="home_icon">
                  <div className="home_icon">
                    <a href="/home"> </a>
                  </div>
                </div>

                {navItems.slice(0, endIndex).map((item, index) => (
                  <div className="displayFlex" key={index}>
                    <div className="larger_icon"></div>
                    <div className="col text">
                      <a href={item.link} className="feature-navi">
                        {item.text}
                      </a>
                    </div>
                  </div>
                ))}
                <div className="displayFlex">
                  <div className="larger_icon"></div>
                  <div className="col text2">
                    <a href={lastItem.link} className="feature-navi">
                      {lastItem.text}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col text"></div>
          <div className="col text"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
