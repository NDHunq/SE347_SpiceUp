import React from "react";
import Header from "../../widget/top";
import { useState,useEffect } from "react";
import {CloseCircleOutlined, LeftCircleFilled, LeftOutlined}from '@ant-design/icons';
import { Radio,Button,AutoComplete ,  Card,message, Space, Select,Input  } from 'antd';

import { DownOutlined, UserOutlined} from '@ant-design/icons';
import "./Checkout.css"
import { Link } from "react-router-dom";
const { TextArea } = Input;


function Checkout() {
    const navItems=[
      { link: "/shopping-cart", text: "Shopping Cart" },{link:"/shopping-cart/checkout",text:"Checkout"}];
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [orderNotes, setOrderNotes] = useState("");
    const [subTotal,setSubtotal]=useState();
    const [district,setDistrict]=useState(null);
    const [province,setProvince]=useState(null);
    const [commune,setCommune]=useState(null);
    const [districts,setDistricts]=useState([]);
    const [provinces,setProvinces]=useState([]);
    const [communes,setCommunes]=useState([]);
    const apiKey ="a84f0896-7c1a-11ef-8e53-0a00184fe694";
    useEffect(() => {
      const fetchProvinces = async () => {
        try {
          const response = await fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Token': apiKey
            }
          });
          const data = await response.json();
          setProvinces(data.data.map(item => ({
            label: item.ProvinceName,
            value: item.ProvinceID
          })));
        } catch (error) {
          console.error('Error fetching provinces:', error);
        }
      };
      fetchProvinces();
    }, [apiKey]);
  
    useEffect(() => {
      if (province) {
        const fetchDistricts = async () => {
          const response = await fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Token': apiKey 
            },
            body: JSON.stringify({ "province_id": province })
          });
          const data = await response.json();
          setDistricts(data.data.map(item => ({
            label: item.DistrictName,
            value: item.DistrictID
          })));
        };
  
        fetchDistricts();
      } else {
        setDistricts([]); 
      }
      setCommune(null); 
      setDistrict(null); 
    }, [province, apiKey]);
  
    useEffect(() => {
      if (district) {
        const fetchCommunes = async () => {
          try {
            const response = await fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Token': apiKey 
              },
              body: JSON.stringify({ "district_id": district })
            });
            
            const data = await response.json();
            console.log('Fetched communes data:', data); 
            
            if (data && data.data) {
              setCommunes(data.data.map(item => ({
                label: item.WardName,
                value: item.WardCode
              })));            } else {
              setCommunes([]); 
            }
          } catch (error) {
            console.error('Error fetching communes:', error);
            setCommunes([]); 
          }
        };
    
        fetchCommunes();
      } else {
        setCommunes([]); 
      }
      setCommune(null); 
    }, [district, apiKey]);
    

    const [orderItems, setOrderItems]  = useState([
      {
        key: '1',
        product:{
          name: 'cabage',
          url_img:'https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg',
          price:50,
          qty:3
        },
      },
      {
        key: '2',
        product:{
          name: 'cabage 2',
          url_img:'https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg',
          price:10,
          qty:2
        },
        
      }
  ]  )
    useEffect(() => {
      const total = orderItems.reduce((acc, item) => acc + (item.product.qty * item.product.price), 0);
      setSubtotal(total);  
    }, [orderItems]);
    
    const handleMenuClick = (e) => {
      message.info();
    };
    const namePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const phonePattern = /^[0-9]+$/;
    const [errors, setErrors] = useState({});  

    const validateForm = () => {
      const newErrors = {};
  
      if (!firstName) {
        newErrors.firstName = "Please enter your first name.";
      } else if (!namePattern.test(firstName)) {
        newErrors.firstName = "First name should contain only letters.";
      }
  
      if (!lastName) {
        newErrors.lastName = "Please enter your last name.";
      } else if (!namePattern.test(lastName)) {
        newErrors.lastName = "Last name should contain only letters.";
      }
  
      if (!email) {
        newErrors.email = "Please enter your email.";
      } else if (!emailPattern.test(email)) {
        newErrors.email = "Please enter a valid email address.";
      }
  
      if (!phone) {
        newErrors.phone = "Please enter your phone number.";
      } else if (!phonePattern.test(phone)) {
        newErrors.phone = "Phone number should contain only numbers.";
      }
  
      if (!province) newErrors.province = "Please select a province.";
      if (!district) newErrors.district = "Please select a district.";
      if (!commune) newErrors.commune = "Please select a commune.";
      if (!detailAddress) newErrors.detailAddress = "Please enter your detailed address.";
  
      if (payments==0) {
        newErrors.payments = "Please select a payment method.";
      }
  
      setErrors(newErrors);
  
      return Object.keys(newErrors).length === 0;
    };
  
  
    const handlePlaceOrder = () => {
      if (validateForm()) {
        message.success("Order placed successfully!");
        // update database
      }
    };
  
    const onChangePayment = (e) => {
      setPayments(e.target.value);
    };

    const [payments, setPayments] = useState(0);


    return(
        <div class="user-checkout">
            <Header navItems={navItems}/>
            <main>
                <div class="container margintop60px marginbt160px">
                    <div class="row">
                        <div class="info col-9">
                          <h2>Billing Infomation</h2>
                          <div>
                            <div class="input-line">
                              <div className="w333">
                                <p class="name-field">First name</p>
                                <AutoComplete
                                className="w100"
                                placeholder="Your first name"
                                value={firstName}
                                onChange={setFirstName}
                                status={errors.firstName?"error":""}
                              />
                              {errors.firstName && <p className="error">{errors.firstName}</p>}
                              </div>
                              <div className="w333">
                                <p class="name-field">Last name</p>
                                <AutoComplete
                                className="w100"
                                placeholder="Your last name"
                                value={lastName}
                                onChange={setLastName}
                                status={errors.lastName?"error":""}
                              />
                              {errors.lastName && <p className="error">{errors.lastName}</p>}
                              </div>
                              <div className="w333">
                                <p class="name-field">Company name <span class="grey">(optional)</span></p>
                                <AutoComplete
                                className="w100"
                                placeholder="Your company name"
                                value={companyName}
                                onChange={setCompanyName}
                              />
                              </div>
                            </div>
                            <div class="input-line">
                              <div className="w333">
                                <p class="name-field">Province</p>
                                <Space.Compact class="w100">
                                  <Select  
                                    className="w100"
                                    defaultValue="Select Province"
                                    value={province}
                                    onChange={setProvince}
                                    options={provinces} 
                                    status={errors.province?"error":""}
                                    />
                                    {errors.province && <p className="error">{errors.province}</p>}
                                </Space.Compact>
                              </div>
                              <div className="w333">
                                <p class="name-field">District</p>
                                <Space.Compact class="w100">
                                  <Select  
                                    className="w100"
                                    value={district}
                                    disabled={!province}
                                    onChange={setDistrict}
                                    defaultValue="Select District"
                                    status={errors.district?"error":""}
                                    options={districts} />
                                    {errors.district && <p className="error">{errors.district}</p>}
                                </Space.Compact>
                              </div>
                              <div className="w333">
                                <p class="name-field">Commune</p>
                                <Space.Compact class="w100">
                                  <Select  
                                    className="w100"
                                    value={commune}
                                    onChange={setCommune}
                                    disabled={!district} 
                                    defaultValue="Select Commune"
                                    status={errors.commune?"error":""}
                                    options={communes} />
                                    {errors.commune && <p className="error">{errors.commune}</p>}
                                </Space.Compact>
                              </div>
                            </div>
                            <div class="input-line">
                              <div className="w100">
                                <p class="name-field">Detail Address</p>
                                <AutoComplete
                                className="w100"
                                placeholder="Detail address"
                                value={detailAddress}
                                status={errors.detailAddress?"error":""}
                                onChange={setDetailAddress}
                              />
                              {errors.detailAddress && <p className="error">{errors.detailAddress}</p>}
                              </div>
                            </div>
                            <div class="input-line">
                              <div className="w50">
                                <p class="name-field">Email</p>
                                <AutoComplete
                                className="w100"
                                placeholder="Email address"
                                value={email}
                                onChange={setEmail}
                                status={errors.email?"error":""}
                              />
                              {errors.email && <p className="error">{errors.email}</p>}
                              </div>
                              <div className="w50">
                                <p class="name-field">Phone</p>
                                <AutoComplete
                                className="w100"
                                placeholder="Phone number"
                                value={phone}
                                onChange={setPhone}
                                status={errors.phone?"error":""}
                              />
                              {errors.phone && <p className="error">{errors.phone}</p>}
                              </div>
                            </div>
                            <hr/>
                            <h2>Addtional Infomation</h2>
                            <div class="input-line">
                              <div className="w100">
                                <p class="name-field">Order Notes <span class="grey">(optional)</span></p>
                                <TextArea 
                                rows={4}
                                value={orderNotes}
                                onChange={(e) => setOrderNotes(e.target.value)}
                                placeholder="Notes about your order, e.g. special notes for delivery" />
                              </div>
                            </div>

                          </div>
                        </div>
                        <div class="order col-3">
                            <Card class="container-order-info">
                              <h4 class="marginbt8px">Order Summery</h4>
                              {orderItems.map(orderItem => (
                                <div className="order-items" key={orderItem.id}>
                                  <div class="img-name">
                                    <img class="marginr8px" width={32} height={32} src={orderItem.product.url_img}></img>
                                    <p>{orderItem.product.name}    x{orderItem.product.qty}</p>
                                  </div>
                                  <b>${orderItem.product.qty*orderItem.product.price}</b>
                                </div>
                              ))}
                              <div class="container-info margint8px">
                                <p>Subtotal</p>
                                <b class="align-right">${subTotal}</b>
                              </div>
                              <hr/>
                              <div class="container-info">
                                <p>Shipping</p>
                                <b>Free</b>
                              </div>
                              <hr/>
                              <div class="container-info">
                                <p>Total</p>
                                <b class="size24">${subTotal}</b>
                              </div>  
                              <h4 class="marginbt8px">Payment Method</h4>
                              <Radio.Group onChange={onChangePayment} value={payments}>
                                <Space direction="vertical">
                                  <Radio value={"Cash on Delivery"}>Cash on Delivery</Radio>
                                  <Radio value={"Internet banking"}>Internet banking</Radio>
                                  <Radio value={"Momo"}>Momo</Radio>
                                </Space>
                              </Radio.Group>
                              {errors.payments && <p className="error">{errors.payments}</p>}
                              <Button 
                              className="full-width-btn margint8px" 
                              onClick={handlePlaceOrder}
                              type="primary">Place Order</Button>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Checkout;