import { toast } from "react-toastify";
import Header from "../widget/top";
import { Link } from "react-router-dom";
import {
  LiaPhoneVolumeSolid,
  LiaEnvelopeOpenTextSolid,
  LiaMapMarkedAltSolid,
} from "react-icons/lia";

import "./contact.scss";
function contact() {
  const navItems = [{ link: "/contact", text: "Contact Us" }];

  return (
    <>
      <Header navItems={navItems} />

      <div className="CT-container">
        <main>
          <div className="container">
            <div className="col-3 left">
              <div className="col left-child ">
                <LiaMapMarkedAltSolid className="icon"></LiaMapMarkedAltSolid>
                <div className="text">Trường Đại học Công nghệ Thông tin</div>
                <div className="text">Khu phố 6, Thủ Đức, Hồ Chí Minh</div>
              </div>
              <hr />
              <div className="col left-child">
                <LiaEnvelopeOpenTextSolid className="icon"></LiaEnvelopeOpenTextSolid>
                <div className="text">spiceup@gmail.com </div>
                <div className="text">help.spiceup@gmail.com</div>
              </div>{" "}
              <hr />
              <div className="col left-child">
                <LiaPhoneVolumeSolid className="icon"></LiaPhoneVolumeSolid>
                <div className="text">(034) 566 4024</div>
                <div className="text">1900 0000</div>
              </div>
            </div>
            <div className="col-9 right">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18021.43806956653!2d106.78867847136047!3d10.869907632836236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527587e9ad5bf%3A0xafa66f9c8be3c91!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgVGjDtG5nIHRpbiAtIMSQSFFHIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1726798154222!5m2!1svi!2s"
                width="100%"
                height="500"
                style={{ border: 0, borderRadius: "10px" }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default contact;
