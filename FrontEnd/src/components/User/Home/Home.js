import "./Home.scss";
import React from "react";
import { Carousel } from "antd";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div className="home-container">
      <Carousel
        className="banner"
        arrows
        arrowSize={50}
        autoplay
        infinite={true}>
        <div className="banner1">
          <div className="col-2 banner1-1"></div>
          <div className="col-4 banner1-2"></div>
          <div className="col-4 banner1-3">
            <div className="text-1">WELCOME TO SPICEUP</div>
            <div className="text-2">Fresh & Healthy</div>
            <div className="text-2 text-2-1">Organic Food</div>
            <div className="text-3">
              Sale up to <span className="text-4">30% OFF</span>
            </div>
            <div className="text-5">
              Free shipping on all your order. we deliver, you enjoy
            </div>
            <Link to="/shop">
              <div className="shop-now">Shop now</div>
            </Link>
          </div>
          <div className="col-2 banner1-4"></div>
        </div>
        <div className="banner2"></div>
        <div className="banner3"></div>
        <div className="banner4"></div>
      </Carousel>
    </div>
  );
};
export default Home;
