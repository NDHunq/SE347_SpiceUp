import "./TopCategories.scss";
import React from "react";
import { Link } from "react-router-dom";

const TopCategories = (props) => {
  return (
    <div className="TC-container">
      <main className="main">
        <div className="container">
          <div className="title"> Shop by Top Categories</div>
          <div className="row-1">
            <div className="col product1">111111111</div>
            <div className="col product2">2222222222</div>
            <div className="col product3">333333333333</div>
            <div className="col product4">4444444444</div>
            <div className="col product5">4444444444</div>
            <div className="col product6">4444444444</div>
          </div>
          <div className="space"></div>
          <div className="row-2">
            <div className="col-6 imgg">
              <div className="col-5 product1">111111111</div>
              <div className="col-7 product2">2222222222</div>
            </div>
            <div className="col-6 product3">333333333333</div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default TopCategories;
