import React, {useEffect} from "react";
import Header from "../../widget/top";
import { useState } from "react";
import { Radio,Button,AutoComplete ,  Card,message, Space, Select,Input  } from 'antd';
import "./Checkout.css"
import {useNavigate} from "react-router-dom";
import instance from "../../../../utils/axiosCustomize";
import { useDispatch } from 'react-redux';
import {setTotalCartItem} from "../../../../redux/reducer/qtyInCart"
const { TextArea } = Input;


function Checkout() {
  const dispatch = useDispatch();

  // format number with dots
  const formatNumberWithDots = (number) => {
    // Convert the number to a string
    let numberStr = number?.toString();

    // Use a regular expression to add dots every three digits from the end
    let formattedStr = numberStr?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return formattedStr;
  }

    const navigate = useNavigate();
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
    const user_id = localStorage.getItem('user_id');

    const [cartItems, setCartItems] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [billingAddress, setBillingAddress] = useState({});
    const [payments, setPayments] = useState('');

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
  
    // useEffect(() => {
    //   if (province) {
    //     const fetchDistricts = async () => {
    //       const response = await fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district', {
    //         method: 'POST',
    //         headers: { 
    //           'Content-Type': 'application/json',
    //           'Token': apiKey 
    //         },
    //         body: JSON.stringify({ "province_id": province })
    //       });
    //       const data = await response.json();
    //       setDistricts(data.data?.map(item => ({
    //         label: item.DistrictName,
    //         value: item.DistrictID
    //       })));
    //     };
  
    //     fetchDistricts();
    //   } else {
    //     setDistricts([]); 
    //   }
    //   setCommune(null); 
    //   setDistrict(null); 
    // }, [province, apiKey]);
  
    // useEffect(() => {
    //   if (district) {
    //     const fetchCommunes = async () => {
    //       try {
    //         const response = await fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
    //           method: 'POST',
    //           headers: { 
    //             'Content-Type': 'application/json',
    //             'Token': apiKey 
    //           },
    //           body: JSON.stringify({ "district_id": district })
    //         });
            
    //         const data = await response.json();
    //         console.log('Fetched communes data:', data); 
            
    //         if (data && data.data) {
    //           setCommunes(data.data.map(item => ({
    //             label: item.WardName,
    //             value: item.WardCode
    //           })));            } else {
    //           setCommunes([]); 
    //         }
    //       } catch (error) {
    //         console.error('Error fetching communes:', error);
    //         setCommunes([]); 
    //       }
    //     };
    
    //     fetchCommunes();
    //   } else {
    //     setCommunes([]); 
    //   }
    //   setCommune(null); 
    // }, [district, apiKey]);


    const [orderItems, setOrderItems]  = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [cartItemsResponse, billingAddressResponse] = await Promise.all([
            instance.get(`api/v1/cartItem/user/${user_id}`),
            instance.get(`api/v1/user/billingAddress/${user_id}`)
          ]);
          setCartItems(cartItemsResponse.data.data.cartItems);
          setSubtotal(cartItemsResponse.data.data.cartItems.reduce((acc, item) => acc + item.sub_total, 0));
          setBillingAddress(billingAddressResponse.data.data);

          for (let i = 0; i < cartItemsResponse.data.data.cartItems.length; i++) {
            const res = await instance.get(`api/v1/image/${cartItemsResponse.data.data.cartItems[i]?.product_id.product_images[0]}`, {
              responseType: 'arraybuffer'
            })
            const blob = new Blob([res.data], { type: `${res.headers["content-type"]}` });
            const url = URL.createObjectURL(blob);
            setProductImages((prevImages) => [...prevImages, url]);
          }
        }
        catch (error) {
          console.log("error", error);
        }
      }

      fetchData();
    }, []);

  useEffect(() => {
    const newOrderItems = cartItems.map((item, index) => {
      return {
        key: item._id,
        product: {
          name: item.product_id.product_name,
          url_img: productImages[index],
          price: item.product_id.selling_price,
          qty: item.quantities
        }
      }
    });
    setOrderItems(newOrderItems);
  }, [cartItems, productImages]);

  useEffect(() => {
    if (billingAddress) {
      setFirstName(billingAddress.firstName);
      setLastName(billingAddress.lastName);
      setCompanyName(billingAddress.companyName);
      setEmail(billingAddress.email);
      setPhone(billingAddress.phone);
      setProvince(billingAddress.province);
      setDetailAddress(billingAddress.detailAddress);
    }
  }, [billingAddress]);

  // useEffect(() => {
  //   if (billingAddress) {
  //     setDistrict(billingAddress.district);
  //     setCommune(billingAddress.commune);
  //   }
  // }, [province, district]);
    
    const handleMenuClick = (e) => {
      message.info();
    };
    const namePattern = /^[\p{L}\s]+$/u;
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
  
      if (payments === '') {
        newErrors.payments = "Please select a payment method.";
      }
  
      setErrors(newErrors);
  
      return Object.keys(newErrors).length === 0;
    };
  
  
    const handlePlaceOrder = () => {
      if (validateForm()) {
        const orderItems = cartItems.map(item => (item._id));
        const createOrder = async () => {
          try {
            let order = {
                user_id: user_id,
                order_items: orderItems,
                total_cost: subTotal,
                payment_method: payments,
                order_notes: orderNotes,
                billing_address: {
                  firstName: firstName,
                  lastName: lastName,
                  companyName: companyName,
                  province: province,
                  district: district,
                  commune: commune,
                  detailAddress: detailAddress,
                  email: email,
                  phone: phone
                }
            }

            await instance.post('api/v1/order', order);

            dispatch(setTotalCartItem(0));
            message.success("Order placed successfully");
            navigate(-1);
          }
          catch (error) {
            console.log("error", error);
          }
        }

        createOrder();
      }
    };
  
    const onChangePayment = (e) => {
      setPayments(e.target.value);
    };

    return(
      <div class="user-checkout">
      <Header navItems={navItems} />
      <main>
        <div class="container mt-4 mb-5">
          <div class="row">
            <div class="info col-lg-9 col-md-8 col-sm-12 mb-4">
              <h2>Billing Information</h2>
              <div>
                <div class="row g-3 mb-3">
                  <div class="col-md-4">
                    <label class="form-label">First name</label>
                    <Input
                      className="form-control"
                      placeholder="Your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      status={errors.firstName ? "error" : ""}
                    />
                    {errors.firstName && <p className="error">{errors.firstName}</p>}
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">Last name</label>
                    <Input
                      className="form-control"
                      placeholder="Your last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      status={errors.lastName ? "error" : ""}
                    />
                    {errors.lastName && <p className="error">{errors.lastName}</p>}
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">
                      Company name <span class="text-muted">(optional)</span>
                    </label>
                    <Input
                      className="form-control"
                      placeholder="Your company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                </div>
    
                <div class="row g-3 mb-3">
                  <div class="col-md-4">
                    <label class="form-label">Province</label>
                    <Input
                      className="form-control"
                      placeholder="Province"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      status={errors.province ? "error" : ""}
                    />
                     {errors.province && (
                    <p className="error">{errors.district}</p>
                  )}
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">District</label>
                    <Input
                      className="form-control"
                      placeholder="District"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      status={errors.district ? "error" : ""}
                    />
                     {errors.district && (
                    <p className="error">{errors.district}</p>
                  )}
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">Commune</label>
                    <Input
                      className="form-control"
                      placeholder="Commune"
                      value={commune}
                      onChange={(e) => setCommune(e.target.value)}
                      status={errors.commune ? "error" : ""}
                    />
                     {errors.commune && (
                    <p className="error">{errors.commune}</p>
                  )}
                  </div>
                </div>
    
                <div class="mb-3">
                  <label class="form-label">Detail Address</label>
                  <Input
                    className="form-control"
                    placeholder="Detail address"
                    value={detailAddress}
                    status={errors.detailAddress ? "error" : ""}
                    onChange={(e) => setDetailAddress(e.target.value)}
                  />
                  {errors.detailAddress && (
                    <p className="error">{errors.detailAddress}</p>
                  )}
                </div>
    
                <div class="row g-3 mb-3">
                  <div class="col-md-6">
                    <label class="form-label">Email</label>
                    <Input
                      className="form-control"
                      placeholder="Email address"
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      status={errors.email ? "error" : ""}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Phone</label>
                    <Input
                      className="form-control"
                      placeholder="Phone number"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      status={errors.phone ? "error" : ""}
                    />
                    {errors.phone && <p className="error">{errors.phone}</p>}
                  </div>
                </div>
    
                <hr />
                <h2>Additional Information</h2>
                <div class="mb-3">
                  <label class="form-label">
                    Order Notes <span class="text-muted">(optional)</span>
                  </label>
                  <TextArea
                    rows={4}
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Notes about your order, e.g. special notes for delivery"
                  />
                </div>
              </div>
            </div>
    
            <div class="order col-lg-3 col-md-4 col-sm-12">
              <Card class="p-3 shadow">
                <h4 class="mb-3">Order Summary</h4>
                {orderItems.map((orderItem) => (
                  <div className="d-flex justify-content-between mb-2" key={orderItem.id}>
                    <div class="d-flex align-items-center">
                      <img
                        class="me-2"
                        width={32}
                        height={32}
                        src={orderItem.product.url_img}
                      />
                      <p class="mb-0">
                        {orderItem.product.name} x{orderItem.product.qty}
                      </p>
                    </div>
                    <b>đ {formatNumberWithDots((orderItem.product.qty * orderItem.product.price).toFixed(0))}</b>
                  </div>
                ))}
                <div class="d-flex justify-content-between border-top pt-2 mt-2">
                  <p>Subtotal</p>
                  <b>đ {formatNumberWithDots(subTotal)}</b>
                </div>
                <div class="d-flex justify-content-between border-top pt-2 mt-2">
                  <p>Shipping</p>
                  <b>Free</b>
                </div>
                <div class="d-flex justify-content-between border-top pt-2 mt-2">
                  <p>Total</p>
                  <b class="fs-4">đ {formatNumberWithDots(subTotal)}</b>
                </div>
                <h4 class="mt-3">Payment Method</h4>
                <Radio.Group onChange={onChangePayment} value={payments}>
                  <Space direction="vertical">
                    <Radio value={"Cash on Delivery"}>Cash on Delivery</Radio>
                    <Radio value={"Internet banking"}>Internet banking</Radio>
                    <Radio value={"Momo"}>Momo</Radio>
                  </Space>
                </Radio.Group>
                {errors.payments && <p className="error">{errors.payments}</p>}
                <Button
                  className="w-100  mt-3"
                  onClick={handlePlaceOrder}
                  type="primary"
                >
                  Place Order
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
    )
}

export default Checkout;