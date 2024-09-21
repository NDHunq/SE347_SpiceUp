import { toast } from "react-toastify";
import Header from "../widget/top";
import Review from "../Home/Review";
import { Link } from "react-router-dom";
import {
  LiaLeafSolid,
  LiaStar,
  LiaShippingFastSolid,
  LiaHeadsetSolid,
  LiaShoppingBagSolid,
  LiaBoxSolid,
  LiaCheckCircle,
} from "react-icons/lia";

import "./About.scss";
function About() {
  const navItems = [{ link: "/about", text: "About Us" }];

  return (
    <div className="AB-container">
      <Header navItems={navItems} />
      <main className="content-1">
        <div className="container">
          <div className="row ">
            <div className="about1">
              <div className="col about1-content">
                <div className="text-2-A">Fresh & Healthy</div>
                <div className="text-2-A text-2-1-A">Organic Food</div>
                <div className="content">
                  Discover a world of flavors with our collection of delicious
                  and high-quality recipes! Whether you're a seasoned chef or a
                  home cook, we offer a diverse range of mouthwatering dishes
                  that are sure to impress. From savory meals to sweet treats,
                  each recipe is crafted with care to ensure exceptional taste
                  and quality. Explore our culinary treasures and elevate your
                  cooking experience today!
                </div>
              </div>
              <div className="col about1-image"></div>
            </div>
          </div>
        </div>
      </main>
      <main className="content-2">
        <div className="container">
          <div className="col"></div>
          <div className="col content">
            <div className="text-2-AB">100% Trusted</div>
            <div className="text-2-AB text-2-1-AB">Organic Food Store</div>
            <div className="des">
              Enjoy our wide range of fresh, high-quality ingredients! From
              crisp vegetables to juicy fruits, we provide the freshness you
              need to make every meal exceptional.
            </div>
            <div className="info">
              <div className="col col1">
                <div className="detail-info">
                  <LiaLeafSolid className="icon" />
                  <div>
                    <div className="title">100% Organic food</div>
                    <div className="dess"> 100% healthy & Fresh food.</div>
                  </div>
                </div>
                <div className="detail-info">
                  <LiaStar className="icon" />
                  <div>
                    <div className="title">Customer Feedback</div>
                    <div className="dess"> Our happy customer</div>
                  </div>
                </div>
                <div className="detail-info">
                  <LiaShippingFastSolid className="icon" />
                  <div>
                    <div className="title">Free Shipping</div>
                    <div className="dess"> Free shipping with discount</div>
                  </div>
                </div>
              </div>
              <div className="col col1">
                <div className="detail-info">
                  <LiaHeadsetSolid className="icon" />
                  <div>
                    <div className="title">Great Support 24/7</div>
                    <div className="dess"> Instant access to Contact</div>
                  </div>
                </div>
                <div className="detail-info">
                  <LiaShoppingBagSolid className="icon" />
                  <div>
                    <div className="title">100% Sucure Payment</div>
                    <div className="dess"> We ensure your money is save</div>
                  </div>
                </div>
                <div className="detail-info">
                  <LiaBoxSolid className="icon" />
                  <div>
                    <div className="title">100% Organic Food</div>
                    <div className="dess"> 100% healthy & Fresh food.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <main className=" content-3">
        <div className="container ">
          <div className="col content">
            <div className="text-2-AB">We Delivered, You </div>
            <div className="text-2-AB text-2-1-AB">Enjoy Your Order.</div>
            <div className="des">
              At{" "}
              <span style={{ color: "#009F06", fontWeight: 500 }}>SpiceUp</span>{" "}
              we are committed to ensuring a seamless experience from start to
              finish. Our promise includes:
            </div>
            <div className="desss">
              <LiaCheckCircle className="icon" />
              <span className="content">
                <strong>Timely Delivery:</strong> We guarantee prompt and
                reliable delivery right to your door, so you can enjoy your
                order exactly when you expect it.
              </span>
            </div>
            <div className="desss">
              <LiaCheckCircle className="icon" />
              <span className="content">
                <strong>Quality Assurance:</strong> Every item is carefully
                inspected to meet our high standards, ensuring you receive only
                the freshest and highest quality products.
              </span>
            </div>
            <div className="desss">
              <LiaCheckCircle className="icon" />
              <span className="content">
                <strong>Customer Satisfaction:</strong> Your satisfaction is our
                top priority. If you have any issues, our dedicated support team
                is here to resolve them swiftly and effectively.
              </span>
            </div>
            <Link to="/shop">
              <div className="shop-now">Shop now</div>
            </Link>
          </div>
          <div className="col image"></div>
        </div>
      </main>
      <main className="content-4">
        <div className="container">
          <div className="title">Our Awesome Team</div>
          <div className="content">
            Meet our talented and passionate team, dedicated to delivering
            excellence in everything we do, <br />
            and driven by creativity and innovation to bring your ideas to life.
          </div>
          <div className="team">
            <div className="col member">
              <div className="image1"></div>
              <div className="name">John Doe</div>
              <div className="position">CEO</div>
            </div>
            <div className="col member">
              <div className="image2"></div>
              <div className="name">John Doe</div>
              <div className="position">CEO</div>
            </div>{" "}
            <div className="col member">
              <div className="image3"></div>
              <div className="name">John Doe</div>
              <div className="position">CEO</div>
            </div>{" "}
            <div className="col member">
              <div className="image4"></div>
              <div className="name">John Doe</div>
              <div className="position">CEO</div>
            </div>{" "}
          </div>
        </div>
      </main>
      <Review />
    </div>
  );
}

export default About;
