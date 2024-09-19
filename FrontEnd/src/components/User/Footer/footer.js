import "./footer.scss";
function Footer() {
  return (
    <div className="footer-container">
      <div className="col-5 top">
        <div className="col-4 decor-left">
          <div className="col decor-image"></div>
          <div className="col content">
            <div className="display">
              <div className="logo"></div>
              <p className="app-navi">SpiceUp</p>
            </div>
            <div className="texxt">
              Enhance each of your dishes with rich taste from all over the
              world.
            </div>
            <div className="contact">
              <u>(034) 566-4024</u> <span className="or"> or </span>{" "}
              <u>spiceup@gmail.com</u>
            </div>
          </div>
        </div>
        <div className="col-4 content-center ">
          <div className="col rong"></div>
          <div className=" cc  rong">
            <div>
              <b className="title">My Account</b>
            </div>
            <div>My Account</div>
            <div>Order History</div>
            <div>Shopping cart</div>
          </div>
          <div className="col cc">
            <div>
              <b className="title">Helps</b>
            </div>
            <div>Contact</div>
            <div>Terms & Condition</div>
            {/* <div>Privacy Policy</div> */}
          </div>
          <div className="col cc">
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
