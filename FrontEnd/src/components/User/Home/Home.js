import "./Home.scss";
import React from "react";
import { Carousel } from "antd";
import { Link } from "react-router-dom";
import FeaturedProducts from "./FeaturedProducts";
import TopCategories from "./TopCategories";
import Analysis from "./Analysis";
import BestSeller from "./BestSeller";
import LatestRecipe from "./LatestRecipe";
import Review from "./Review";
import {
  LiaShippingFastSolid,
  LiaShoppingBagSolid,
  LiaHeadsetSolid,
  LiaMoneyBillWaveSolid,
} from "react-icons/lia";

const Home = (props) => {
  return (
    <div className="home-container">
      <Carousel
        className="banner"
        arrows
        arrowSize={50}
        //autoplay
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
      <main>
        <div className="container">
          <div className="row">
            <div className="business-info">
              <div className="col info-1">
                <div className="icon">
                  <LiaShippingFastSolid className="inner-icon" />
                </div>
                <div className="title">Free Shipping</div>
                <div className="description">Free shipping with discount</div>
              </div>
              <div className="col info-1">
                {" "}
                <div className="icon">
                  <LiaHeadsetSolid className="inner-icon" />
                </div>
                <div className="title">Great Support 24/7</div>
                <div className="description">Instant access to Contact</div>
              </div>
              <div className="col info-1">
                {" "}
                <div className="icon">
                  <LiaShoppingBagSolid className="inner-icon" />
                </div>
                <div className="title">100% Secure Payment</div>
                <div className="description">We ensure your money is save</div>
              </div>
              <div className="col info-1">
                {" "}
                <div className="icon">
                  <LiaMoneyBillWaveSolid className="inner-icon" />
                </div>
                <div className="title">Money-Back Guarantee</div>
                <div className="description">30 days money-back</div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </main>
      <FeaturedProducts />
      <TopCategories />
      <Analysis />
      <BestSeller />
      <LatestRecipe />
      <Review />
    </div>
  );
};
export default Home;
