import "./BestSeller.scss";
import React from "react";
import { Link } from "react-router-dom";

const BestSeller = (props) => {
  return (
    <div className="B-container">
      <main className="main">
        <div className="container ad-container">
          <div className="row">
            <div className="col product1">111111111</div>
            <div className="col product2">2222222222</div>
          </div>
        </div>
        <div className="container product-container">
          <div className="title"> Best Seller Products</div>
          <div className="row">
            <div className="col product1">111111111</div>
            <div className="col product2">2222222222</div>
            <div className="col product3">333333333333</div>
            <div className="col product4">4444444444</div>
            <div className="col product5">4444444444</div>
          </div>
        </div>
        <div className="container detail-container">
          <div className="row">
            <div className="col product1">111111111</div>
            <div className="col product2">2222222222</div>
            <div className="col product3">333333333333</div>
            <div className="col product4">4444444444</div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default BestSeller;
