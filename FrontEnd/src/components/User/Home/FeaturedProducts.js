import "./FeaturedProducts.scss";
import React from "react";
import { Link } from "react-router-dom";

const FeaturedProducts = (props) => {
  return (
    <div className="FP-container">
      <main className="main">
        <div className="container">
          <div className="title">Featured Products</div>
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
export default FeaturedProducts;
