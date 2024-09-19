import "./BestSeller.scss";
import React from "react";
import { Link } from "react-router-dom";

const BestSeller = (props) => {
  const hotDeals = [{}, {}, {}];
  const bestSeller = [{}, {}, {}];
  const topRated = [{}, {}, {}];
  return (
    <div className="B-container">
      <main className="main">
        <div className="container ad-container">
          <div className="row">
            <div className="col ">
              <div className=" product1">
                <div className="sub-title">100% Organic</div>
                <div className="title">Fruit & Vegetable</div>
                <div className="price">
                  Starting at: <span className="pricee">$5.99</span>
                </div>
                <Link to="/shop">
                  {" "}
                  <div className="shop-now">Shop now</div>
                </Link>
              </div>
            </div>
            <div className="col ">
              {" "}
              <div className=" product2">
                {" "}
                <div className="sub-title">SALE OF THE WEEK</div>
                <div className="title">Sales of the Year</div>
                <div className="day">19/09/2024 - 26/09/2024</div>
                <Link to="/shop">
                  {" "}
                  <div className="shop-now">Shop now</div>
                </Link>
              </div>
            </div>
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
            <div className="col product">
              <div className="title">Hot Deals</div>
              <div className="list-pro">
                {hotDeals.map((item, index) => (
                  <div className="col ">
                    <div className="sub-product"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col product">
              <div className="title">Best Seller</div>
              <div className="list-pro">
                {bestSeller.map((item, index) => (
                  <div className="col ">
                    <div className="sub-product"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col product">
              <div className="title">Top Rated</div>
              <div className="list-pro">
                {topRated.map((item, index) => (
                  <div className="col ">
                    <div className="sub-product"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col product4">
              <div className="text-1">HOT SALE</div>
              <div className="text-2">
                <strong>Save 27%</strong> on
              </div>
              <div className="text-2 text-2-1">Every Order</div>
              <Link to="/shop">
                {" "}
                <div className="shop-now">Shop now</div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default BestSeller;
