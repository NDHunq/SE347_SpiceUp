import React from "react";
import "./setting.css";
const Setting = () => {
  return (
    <div>
      <div className="ccontainer">
        <p className="txtna">Account Settings</p>
        <div className="line"> </div>
        <p className="txtna">Frist Name</p>
        <input type="text" />
        <p className="txtna">Last Name</p>
        <input type="text" />
        <p className="txt_a">Email</p>
        <input type="text" />
        <p className="txtna">Phone Number</p>
        <input type="text" />
      </div>
      <div className="ccontainer"></div>
      <div className="ccontainer"></div>
    </div>
  );
};

export default Setting;
