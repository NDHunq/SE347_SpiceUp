import "./TopCategories.scss";
import React from "react";
import { Link } from "react-router-dom";
import { BsCheck2Circle } from "react-icons/bs";
import topCate1 from "../../../assets/images/Home/topCate1.svg";
import topCate2 from "../../../assets/images/Home/topCate2.svg";
import topCate3 from "../../../assets/images/Home/topCate3.svg";
import topCate4 from "../../../assets/images/Home/topCate4.svg";
import topCate5 from "../../../assets/images/Home/topCate5.svg";
import topCate6 from "../../../assets/images/Home/topCate6.svg";

const TopCategories = (props) => {
  const topCategories = [
    {
      image: topCate1,
      name: "Vegetables",
      count: 135,
    },
    {
      image: topCate2,
      name: "Fresh Fruit",
      count: 355,
    },
    {
      image: topCate3,
      name: "Fish",
      count: 53,
    },
    {
      image: topCate4,
      name: "Meat",
      count: 55,
    },
    {
      image: topCate5,
      name: "Water and Drinks",
      count: 22,
    },
    {
      image: topCate6,
      name: "Snacks",
      count: 35,
    },
  ];
  return (
    <div className="TC-container">
      <main className="main">
        <div className="container">
          <div className="title"> Shop by Top Categories</div>
          <div className="row-1">
            {topCategories.map((item, index) => {
              return (
                <div className="col product">
                  <div className="col productt">
                    <image className="img">
                      <Link to="/product/id">
                        <img src={item.image} alt="product" />
                      </Link>
                    </image>
                    <div className="name">{item.name}</div>
                    <div className="count">{item.count} Products</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="space"></div>
          <div className="row-2">
            <div className="col-6 imgg">
              <div className="col-5 product1"></div>
              <div className="col-7 product2"></div>
            </div>
            <div className="col-6 product3">
              <div className="text-2">100% Trusted</div>
              <div className="text-2 text-2-1">Organic Food Store</div>
              <div className="title1">
                <BsCheck2Circle className="check" />
                Healthy & natural food for lovers of healthy food.
              </div>
              <div className="content">
                Enjoy a wide selection of nutritious and all-natural foods,
                carefully crafted for health-conscious individuals. Perfect for
                those who prioritize wellness and balanced eating in their daily
                lives.
              </div>
              <div className="title1">
                <BsCheck2Circle className="check" />
                Every day fresh and quality products for you.
              </div>
              <div className="content">
                We bring you fresh, top-quality products every single day,
                ensuring you always have the best. Our commitment is to deliver
                premium ingredients to elevate your meals.
              </div>
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
export default TopCategories;
