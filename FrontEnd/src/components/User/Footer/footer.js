import { useNavigate } from "react-router";
import "./footer.scss";
function Footer() {
  const nav = useNavigate();
  return (
    <div className="footer-container">
      <div className="col-5 top">
        <div className="col-4 decor-left">
          <div className="col decor-image"></div>
          <div className="col-8 content">
            <div className="display">
              <div className="logo"></div>
              <p className="app-navi">SpiceUp</p>
            </div>
            <div className="texxt">
              Enhance each of your dishes with rich taste from all over the
              world.
            </div>
            <div className="contact">
              <u>(034) 566-4024 </u>
              <span className="or"> or </span> <u> spiceup@gmail.com</u>
            </div>
          </div>
        </div>
        <div className="col-4 content-center ">
          <div className="col rong"></div>
          <div className=" cc  rong">
            <div>
              <b className="title">My Account</b>
            </div>
            <div
              onClick={() => {
                const isLoggedIn = localStorage.getItem("isLoggedIn");
                if (isLoggedIn === "false" || isLoggedIn === null) {
                  nav("/signin");
                  window.scrollTo(0, 0);
                } else {
                  nav("/account/settings");
                  window.scrollTo(0, 0);
                }
              }}>
              My Account
            </div>
            <div
              onClick={() => {
                const isLoggedIn = localStorage.getItem("isLoggedIn");
                if (isLoggedIn === "false" || isLoggedIn === null) {
                  nav("/signin");
                  window.scrollTo(0, 0);
                } else {
                  nav("/account/order");
                  window.scrollTo(0, 0);
                }
              }}>
              Order History
            </div>
            <div
              onClick={() => {
                const isLoggedIn = localStorage.getItem("isLoggedIn");
                if (isLoggedIn === "false" || isLoggedIn === null) {
                  nav("/signin");
                  window.scrollTo(0, 0);
                } else {
                  nav("/shopping-cart");
                  window.scrollTo(0, 0);
                }
              }}>
              Shopping cart
            </div>
          </div>
          <div
            className="col cc"
            onClick={() => {
              const isLoggedIn = localStorage.getItem("isLoggedIn");
              if (isLoggedIn === "false" || isLoggedIn === null) {
                nav("/signin");
                window.scrollTo(0, 0);
              } else {
                nav("/contact");
                window.scrollTo(0, 0);
              }
            }}>
            <div>
              <b className="title">Helps</b>
            </div>
            <div>Contact</div>
            <div>Terms & Condition</div>
            {/* <div>Privacy Policy</div> */}
          </div>
          <div
            className="col cc"
            onClick={() => {
              const isLoggedIn = localStorage.getItem("isLoggedIn");
              if (isLoggedIn === "false" || isLoggedIn === null) {
                nav("/signin");
                window.scrollTo(0, 0);
              } else {
                nav("/shop");
                window.scrollTo(0, 0);
              }
            }}>
            <div>
              <b className="title">Categories</b>
            </div>
            <div>Fruit & Vegetable</div>
            <div>Meat & Fish</div>
            {/* <div>Bread & Bakery</div> */}
          </div>
        </div>
        <div className="col-4 decor-right">
          <div className="col"></div>
          <div className="col decor-image"></div>
        </div>
      </div>
      <hr />
      <div className="col-1 bottom">
        SpiceUp &#169; 2024. All Rights Reserved
      </div>
    </div>
  );
}

export default Footer;
