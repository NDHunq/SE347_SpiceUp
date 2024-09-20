import React, { useEffect, useState } from "react";
import "./setting.css";

import { ConfigProvider } from "antd";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space } from "antd";

const Setting = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [bfirstName, bsetFirstName] = useState("");
  const [blastName, bsetLastName] = useState("");
  const [bcompany, bsetCompany] = useState("");
  const [bcountry, bsetcountry] = useState("");

  const [bcity, bsetcity] = useState("");
  const [bdistrict, bsetdistrict] = useState("");
  const [baddress, bsetAddress] = useState("");

  const [bemail, bsetEmail] = useState("");
  const [bphone, bsetPhone] = useState("");

  const [warning, setWarning] = useState("");
  const [status, setStatus] = useState("none");
  const [bwarning, bsetWarning] = useState("");
  const [bstatus, bsetStatus] = useState("none");

  const [phoneWarning, setPhoneWarning] = useState("");
  const [phoneStatus, setPhoneStatus] = useState("none");

  const [bphoneWarning, bsetPhoneWarning] = useState("");
  const [bphoneStatus, bsetPhoneStatus] = useState("none");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setWarning("Please enter a valid email address.");
      setStatus("error");
    } else {
      setWarning("");
      setStatus("none");
    }
  };
  const bhandleEmailChange = (e) => {
    bsetEmail(e.target.value);
  };

  const bhandleEmailBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bemail)) {
      bsetWarning("Please enter a valid email address.");
      bsetStatus("error");
    } else {
      bsetWarning("");
      bsetStatus("none");
    }
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePhoneBlur = () => {
    const phoneRegex = /^\d{10}$/; // Adjust the regex according to your phone number format
    if (!phoneRegex.test(phone)) {
      setPhoneWarning("Please enter a valid phone number.");
      setPhoneStatus("error");
    } else {
      setPhoneWarning("");
      setPhoneStatus("none");
    }
  };
  const handlePhoneKeyPress = (e) => {
    const charCode = e.charCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };
  const bhandlePhoneChange = (e) => {
    bsetPhone(e.target.value);
  };

  const bhandlePhoneBlur = () => {
    const phoneRegex = /^\d{10}$/; // Adjust the regex according to your phone number format
    if (!phoneRegex.test(bphone)) {
      bsetPhoneWarning("Please enter a valid phone number.");
      bsetPhoneStatus("error");
    } else {
      bsetPhoneWarning("");
      bsetPhoneStatus("none");
    }
  };
  const bhandlePhoneKeyPress = (e) => {
    const charCode = e.charCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };
  useEffect(() => {}, []);

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            activeBorderColor: "#00B207",
            hoverBorderColor: "#00B207",
            paddingBlock: 9,
          },
        },
      }}
    >
      <div className="ccontainer">
        <p className="txtnacc txtna2">Account Settings</p>
        <div className="linee"> </div>
        <div className="divflex">
          <div className="div01">
            <p className="txtna2">Frist Name</p>
            <Input
              placeholder="Frist Name"
              className="input"
              value={firstName}
            />
            <p className="txtna2">Last Name</p>
            <Input placeholder="Last Name" className="input" value={lastName} />
            <p className="txtna2">Email</p>
            <Input
              status={status}
              placeholder="Email"
              className="input"
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
            />{" "}
            {warning && <p className="warning">{warning}</p>}
            <p className="txtna2">Phone Number</p>
            <Input
              placeholder="Phone"
              className="input"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              onKeyPress={handlePhoneKeyPress}
              pattern="[0-9]*"
              status={phoneStatus}
            />
            {phoneWarning && <p className="warning">{phoneWarning}</p>}
          </div>
          <div className="div02">
            <div className="imgframe_container">
              <div className="imgframe"></div>
            </div>
            <br />
            <div className="imgframe_container">
              <div className="button_sv">
                <p className="save"> Choose Image</p>
              </div>
            </div>
          </div>
        </div>

        <div className="button">
          <p className="save"> Save Changes</p>
        </div>
      </div>
      <div className="ccontainer">
        <p className="txtnacc txtna2">Billing Address</p>
        <div className="linee"> </div>
        <div className="divflex2">
          <div className="div13">
            <p className="txtna2">Frist Name</p>
            <Input
              placeholder="Frist Name"
              className="input2"
              value={bfirstName}
            />
          </div>

          <div className="div23">
            <p className="txtna22">Last Name</p>
            <Input
              placeholder="Last Name"
              className="input4"
              value={blastName}
            />
          </div>
          <div className="div33">
            <p className="txtna22">Company Name (optional)</p>
            <Input
              placeholder="Company Name "
              className="input3"
              value={bcompany}
            />
          </div>
        </div>
        <div className="divflex2">
          <div className="div13">
            <p className="txtna2">Country / Region</p>
            <Input
              placeholder="Country / Region"
              className="input2"
              value={bcountry}
            />
          </div>

          <div className="div23">
            <p className="txtna22">City/Province</p>
            <Input
              placeholder="City/Province "
              className="input4"
              value={bcity}
            />
          </div>
          <div className="div33">
            <p className="txtna22">District</p>
            <Input
              placeholder="District "
              className="input3"
              value={bdistrict}
            />
          </div>
        </div>
        <div className="divflex2">
          <div className="div14">
            <p className="txtna2">Detail Address</p>
            <Input
              placeholder="Detail Address"
              className="input2"
              value={baddress}
            />
          </div>
        </div>
        <div className="divflex2">
          <div className="div15">
            <p className="txtna2">Email</p>
            <Input
              status={bstatus}
              placeholder="Email"
              className="input22"
              type="email"
              value={bemail}
              onChange={bhandleEmailChange}
              onBlur={bhandleEmailBlur}
            />{" "}
            {bwarning && <p className="warning">{bwarning}</p>}
          </div>
          <div className="div15">
            <p className="textna23">Phone</p>
            <Input
              placeholder="Phone"
              className="input23"
              type="tel"
              value={bphone}
              onChange={bhandlePhoneChange}
              onBlur={bhandlePhoneBlur}
              onKeyPress={bhandlePhoneKeyPress}
              pattern="[0-9]*"
              status={bphoneStatus}
            />
            {bphoneWarning && <p className="warning2">{bphoneWarning}</p>}
          </div>
        </div>

        <div className="button">
          <p className="save"> Save Changes</p>
        </div>
      </div>
      <div className="ccontainer">
        <p className="txtnacc txtna2">Change Password</p>

        <div className="linee"> </div>
        <div className="divflex2">
          <div className="div14">
            <p className="txtna2">Current Password</p>

            <Input.Password
              className="input2"
              placeholder="Current Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
        </div>
        <div className="divflex2">
          <div className="div15">
            <p className="txtna2">New Password</p>
            <Input.Password
              className="input22"
              placeholder="New Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
          <div className="div15">
            <p className="textna23">Comfirm Password</p>
            <Input.Password
              className="input23"
              placeholder="Comfirm Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
        </div>
        <div className="button">
          <p className="save"> Save Changes</p>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </ConfigProvider>
  );
};

export default Setting;
