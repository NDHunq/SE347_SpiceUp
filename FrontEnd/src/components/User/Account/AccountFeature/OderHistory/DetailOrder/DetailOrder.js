import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Button,
  Table,
  Card,
  ConfigProvider,
  Row,
  Col,
  Typography,
  Divider,
  Modal,
  Rate,
  Input,
  message,
} from "antd";
import instance from "../../../../../../utils/axiosCustomize";
import "./DetailOrder.css";
import {jwtDecode} from "jwt-decode";
const { Text } = Typography;
const { TextArea } = Input;

const DetailOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const token = localStorage.getItem("jwt");

  // State variables
  const [dataSource, setDataSource] = useState([]);
  const [ratee, setRatee] = useState(0);
  const [contentRate, setContentRate] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rateError, setRateError] = useState(false);
  const [userId,setUserId]=useState(null);
  const [date,setDate]=useState(null);
  // Additional State for Order Details
  const [orderDetails, setOrderDetails] = useState({
    date: "",
    num: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    detailAddress: "",
    commune: "",
    district: "",
    province: "",
    payment: "",
    subTotal: 0,
  });
  useEffect(() => {
    if (!token) {
      navigate("/signin"); 
    } else {
      try {
        const decodedData = jwtDecode(token);
        setUserId(decodedData.id); 
      } catch (error) {
        console.error("Invalid token:", error);
        navigate("/signin"); 
      }
    }
  }, [token, navigate]);
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await instance.get(`/api/v1/order/${id}`);
        console.log(response.data)
        setDataSource(
          response.data.data.order_items_post.map((item) => ({
            key: item._id,
            product: {
              id: item.product_id._id,
              name: item.product_id.product_name,
              price: item.product_id.price,
              qty: item.quantities,
              subTotal: item.sub_total,
              url_img: item.product_id.product_images[0] || "default_image_url", 
              rate: [0, ""],
            },
          }))
        );
        const tmp = new Date(response.data.data.date_ordered);
        setDate(tmp.toLocaleString())
        setOrderDetails({
          date: response.data.data.date_ordered || "Unknown Date",
          num: response.data.data.order_items_post.length || 0,
          firstName: response.data.data.user_id.billingAddress.firstName,
          lastName: response.data.data.user_id.billingAddress.lastName,
          detailAddress: response.data.data.user_id.billingAddress.detailAddress,
          commune: response.data.data.user_id.billingAddress.commune,
          district: response.data.data.user_id.billingAddress.district,
          province: response.data.data.user_id.billingAddress.province,
          payment: response.data.data.payment_method,
          subTotal: response.data.data.total_cost,
        });


      } catch (err) {
        console.error(err);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const columns = [
    {
      title: "PRODUCT",
      dataIndex: "product",
      key: "product",
      render: (product) => (
        <div className="flex jtf-ct-fs align-vertical">
          <img
            src={product.url_img}
            width={60}
            height={60}
            className="mgr-8"
            alt={product.name}
          />
          <p>{product.name}</p>
        </div>
      ),
    },
    {
      title: "PRICE",
      dataIndex: "product",
      key: "product",
      render: (product) => <p>${product.price}</p>,
    },
    {
      title: "QUANTITY",
      dataIndex: "product",
      key: "product",
      render: (product) => <p>x{product.qty}</p>,
    },
    {
      title: "SUBTOTAL",
      dataIndex: "product",
      key: "product",
      render: (product) => <b>${product.qty * product.price}</b>,
    },
    {
      title: "",
      dataIndex: "product",
      align: "right",
      render: (product) => (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#f9c73d",
              borderRadius: "20px",
            },
          }}
        >
          <Button
            type="primary"
            onClick={() => showModal(product)}
          >
            Review
          </Button>
        </ConfigProvider>
      ),
    },
  ];

  const showModal = async (product) => {
    const product_id = product.id;
    const foundProduct = dataSource.find(item => item.product.id === product.id);

    if (foundProduct) 
      setSelectedProduct(foundProduct.product);  
  
    
    try {
      setOpen(true);
      const user_id=userId;
      const response = await instance.get("/api/v1/review", {
        params: { user_id, product_id },
      });
  
      if (response?.data?.status === "success" && response?.data?.data) {
        const reviewData = response.data.data;
  
        const updatedProduct = {
          ...product,
          rate: [reviewData?.rating || 0, reviewData?.content || ""],
        };
  
        setSelectedProduct(updatedProduct);
        setRatee(reviewData?.rating || 0);
        setContentRate(reviewData?.content || "");
      } else {
        const updatedProduct = {
          ...product,
          rate: [0, ""],
        };
  
        setSelectedProduct(updatedProduct);
        setRatee(0);
        setContentRate("");
      }
    } catch (error) {
      console.error("Error during API request:", error);
      message.error("Could not fetch product review data.");
      setSelectedProduct(product);
      setRatee(0);
      setContentRate("");
    } 
  };
  
  const handleOk = async () => {
    if (!ratee) {
      message.error("Please provide a rating.");
      return;
    }
    const payload = {
      user_id:userId,
      product_id: selectedProduct.id,
      content: contentRate,
      rating: ratee,
    };
  
    try {
      const response = await instance.post('/api/v1/review', payload);
  
      if (response?.data?.status === "success") {
        const updatedDataSource = dataSource.map((item) =>
          item.product.id === selectedProduct.id
            ? { ...item, product: { ...item.product, rate: [ratee, contentRate] } }
            : item
        );
  
        setDataSource(updatedDataSource);
        setOpen(false);
        message.success("Review submitted successfully!");
        setRatee(0);
        setContentRate("");
      } else {
        message.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      message.error("Failed to submit the review. Please try again.");
    }
  };
  

  const handleCancel = () => {
    setOpen(false);
  };



  return (
    <div>
      <Card
        title={`Order Details - ${date} - ${orderDetails.num} Product${
          orderDetails.num > 1 ? "s" : ""
        }`}
        className="margint20px"
        extra={
          <a onClick={() => navigate(-1)}>
            <Text type="success">Back to List</Text>
          </a>
        }
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={16}>
            <Card type="inner" title="Billing Address">
              <p>{orderDetails.firstName} {orderDetails.lastName}</p>
              <p>{orderDetails.detailAddress}, {orderDetails.commune}, {orderDetails.district}, {orderDetails.province}</p>
              <p>Email: {orderDetails.email}</p>
              <p>Phone: {orderDetails.phone}</p>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Card type="inner" title="Order Summary">
              <p>Payment Method: {orderDetails.payment}</p>
              <p>Total: ${orderDetails.subTotal}</p>
            </Card>
          </Col>
        </Row>
        <Table columns={columns} dataSource={dataSource} />
      </Card>
      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={!(selectedProduct && selectedProduct.rate[0]) && (
          <Button key="submit" type="primary"  onClick={handleOk}>
            Submit
          </Button>
        )}
      >
        {selectedProduct && (
          <div>
            <div className="row-product">
              <img src={selectedProduct.url_img} alt={selectedProduct.name} width={100} />
              <p><h3>{selectedProduct.name}</h3></p>
              <p>${selectedProduct.price}</p>
              <p>x{selectedProduct.qty}</p>
              <p><b>${selectedProduct.price * selectedProduct.qty}</b></p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Rate value={ratee} 
              disabled={selectedProduct.rate[0]!=0}
              onChange={(value) => {
                setRatee(value);
                setRateError(false);
              }}
              />
            </div>
            {rateError && <p style={{ color: 'red', textAlign: 'center' }}>Please select a rating.</p>}
            <h5>Review</h5>
            <TextArea
              showCount
              maxLength={100}
              placeholder="Write your review"
              style={{
                height: 100,
                resize: 'none',
                marginBottom: '12px'
              }}
              value={contentRate}
              onChange={(e) => setContentRate(e.target.value)} 
              disabled={selectedProduct.rate[0]!=0}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DetailOrder;
