import React, { useEffect, useState } from "react";
import "./setting.css";

import { ConfigProvider } from "antd";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space, message } from "antd";
import {
  getUserInfo,
  getBillingAddress,
  change_password,
  changUserInfo,
  getImage,
  pushImage,
} from "../../../../../services/userServices";

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
  const [avatar, setAvatar] = useState("");

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
  const userId = "66f6cd4a06a448abe23763e0";
  const bhandlePhoneKeyPress = (e) => {
    const charCode = e.charCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };
  const handleChangePass = async () => {
    const currentPassword = document.querySelector(".input2 input").value;

    const newPassword = document.querySelector(".input22 input").value;

    const confirmPassword = document.querySelector(".input23 input").value;
    if (
      currentPassword == "" ||
      (newPassword == "") | (confirmPassword == "")
    ) {
      message.error("Please fill in all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      message.error("New password and Confirm password do not match.");
    } else {
      const response = await change_password(userId, {
        oldPassword: currentPassword,
        newPassword: newPassword,
      });
      message.info(response.data.message);
    }
  };
  const handleSave = async () => {
    const response = await changUserInfo(userId, {
      firstname: firstName,
      lastname: lastName,
    });
    message.info(response.data.message);
  };
  const handleSave2 = async () => {
    const response = await changUserInfo(userId, {
      billingAddress: {
        firstName: bfirstName,
        lastName: blastName,
        companyName: bcompany,
        country: bcountry,
        province: bcity,
        district: bdistrict,
        detailAddress: baddress,
      },
    });
    message.info(response.data.message);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getUserInfo({
          user_id: userId,
        });
        const bresponse = await getBillingAddress(userId);
        const bresponseData = bresponse.data;
        const bdata = bresponseData.data;
        bsetFirstName(bdata.firstName);
        bsetLastName(bdata.lastName);
        bsetCompany(bdata.companyName);
        bsetcountry(bdata.country);
        bsetcity(bdata.province);
        bsetdistrict(bdata.district);
        bsetAddress(bdata.detailAddress);

        const responseData = response.data;
        const data = responseData.userInfo;
        setFirstName(data.firstname);
        setLastName(data.lastname);
        setEmail(data.email);
        setPhone(data.phone);
        const avatarId = data.avatar;
        const url = await getImage(avatarId);

        setAvatar(url);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);
  const handleChooseImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await pushImage(formData);
        const imageUrl = response.data.file.fileId;

        const url = await getImage(imageUrl);

        setAvatar(url);
        await changUserInfo(userId, {
          avatar: imageUrl,
        });

        message.info("Image uploaded successfully!");
      }
    };
    input.click();
  };

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
              onChange={(e) => setFirstName(e.target.value)}
            />
            <p className="txtna2">Last Name</p>
            <Input
              placeholder="Last Name"
              className="input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <p className="txtna2">Email</p>
            <Input
              placeholder="Email"
              className="input"
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              readOnly
            />{" "}
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
              readOnly
            />
          </div>
          <div className="div02">
            <div className="imgframe_container">
              <img className="imgframe" src={avatar} alt="Profile" />
            </div>
            <br />
            <div className="imgframe_container">
              <div className="button_sv">
                <p className="save" onClick={handleChooseImage}>
                  {" "}
                  Choose Image
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="button" onClick={handleSave}>
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
              className="input2 fristname"
              value={bfirstName}
              onChange={(e) => bsetFirstName(e.target.value)}
            />
          </div>

          <div className="div23">
            <p className="txtna22">Last Name</p>
            <Input
              placeholder="Last Name"
              className="input4 lastname"
              value={blastName}
              onChange={(e) => bsetLastName(e.target.value)}
            />
          </div>
          <div className="div33">
            <p className="txtna22">Company Name (optional)</p>
            <Input
              placeholder="Company Name "
              className="input3"
              value={bcompany}
              onChange={(e) => bsetCompany(e.target.value)}
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
              onChange={(e) => bsetcountry(e.target.value)}
            />
          </div>

          <div className="div23">
            <p className="txtna22">City/Province</p>
            <Input
              placeholder="City/Province "
              className="input4"
              value={bcity}
              onChange={(e) => bsetcity(e.target.value)}
            />
          </div>
          <div className="div33">
            <p className="txtna22">District</p>
            <Input
              placeholder="District "
              className="input3"
              value={bdistrict}
              onChange={(e) => bsetdistrict(e.target.value)}
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
              onChange={(e) => bsetAddress(e.target.value)}
            />
          </div>
        </div>
        {/* <div className="divflex2">
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
        </div> */}

        <div className="button" onClick={handleSave2}>
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
          <p className="save" onClick={handleChangePass}>
            {" "}
            Save Changes
          </p>
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
