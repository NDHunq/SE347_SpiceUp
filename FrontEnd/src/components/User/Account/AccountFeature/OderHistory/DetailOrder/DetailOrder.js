import React from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Button, Table, Card, ConfigProvider, Row, Col, Typography, Divider, Modal, Rate, Input, message } from 'antd';
import { useState, useEffect } from "react";
import './DetailOrder.css';

const { Text } = Typography;
const { TextArea } = Input;

const DetailOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ratee, setRatee] = useState(0); 
  const [contentRate, setContentRate] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rateError, setRateError] = useState(false); 
  const [date, setDate] = useState('April 24,2021');
  const [num, setNum] = useState(3);
  const [firstName, setFirstName] = useState('Danniel');
  const [lastName, setLastName] = useState('Russel');
  const [email, setEmail] = useState('daine.ressel@gmail.com');
  const [phone, setPhone] = useState('098765432');
  const [detailAdress, setDetailAdress] = useState('4140 Parker');
  const [commune, setCommune] = useState('Rd.');
  const [district, setDistrict] = useState('Allentown');
  const [province, setProvince] = useState('New Mexico');
  const [subTotal, setSubtotal] = useState(0);
  const [payment, setPaymet] = useState('Paypal');
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      product: {
        id:'1',
        name: 'cabage',
        url_img: 'https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg',
        price: 50,
        qty: 3,
        rate: [3, "content review"]
      },
    },
    {
      key: '2',
      product: {
        id: '2',
        name: 'cabage 2',
        url_img: 'https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg',
        price: 10,
        qty: 2,
        rate: [0,""] // no submit
      },
    }
  ]);

  useEffect(() => {
    const total = dataSource.reduce((acc, item) => acc + (item.product.qty * item.product.price), 0);
    setSubtotal(total);
  }, [dataSource]);

  const columns = [
    {
      title: 'PRODUCT',
      dataIndex: 'product',
      key: 'product',
      render: (product) =>
        <div className="flex jtf-ct-fs align-vertical">
          <img src={product.url_img} width={60} height={60} className="mgr-8">
          </img>
          <p>
            {product.name}
          </p>
        </div>,
    },
    {
      title: 'PRICE',
      dataIndex: 'product',
      key: 'product',
      render: (product) => <p>${product.price}</p>
    },
    {
      title: 'QUANTITY',
      dataIndex: 'product',
      key: 'product',
      render: (product, record) =>
        <div >
          <p>x{product.qty}</p>
        </div>
    },
    {
      title: 'SUBTOTAL',
      dataIndex: 'product',
      key: 'product',
      render: (product) => <b>${(product.qty) * (product.price)}</b>
    },
    {
      title: '',
      dataIndex: 'product',
      align: 'right',
      render: (product) =>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#f9c73d',
              borderRadius: '20px',
            },
          }}
        >
          <Button type="primary" onClick={() => showModal(product)}>
            Review{Array.isArray(product.rate) && product.rate[0] ? "ed" : ""}
          </Button>
        </ConfigProvider>
    },
  ];
  const showModal = (product) => {
    setSelectedProduct(product);
    setRatee(product.rate[0]); 
    setContentRate(product.rate[1]); 
    setOpen(true);
    setRateError(false);
  };

  const handleOk = () => {
    if (!ratee) {
      setRateError(true);
      return;
    }
    setLoading(true);

    setSelectedProduct({
      ...selectedProduct,
      rate: [ratee, contentRate],
    });

    setLoading(false);
    setOpen(false);
    message.success("Review Submitted")
  };


  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (selectedProduct) {
      const updatedDataSource = dataSource.map(item => {
        if (item.product.id === selectedProduct.id) {
          // update rate in database
          return {
            ...item,
            product: {
              ...item.product,
              rate: selectedProduct.rate, 
            },
          };
        }
        return item; 
      });
      
      setDataSource(updatedDataSource);
      console.log(dataSource)
    }
  }, [selectedProduct]);

  const orderTitle = <span className="orderTitle">Order Details <span>-</span> <span className="normal">{date}</span> <span>-</span> <span className="normal">{num} Product{num > 1 ? 's' : ''}</span></span>;
  const billingTitle = <span className="normal gray">BILIING ADRESS</span>;
  const priceTitle = <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '8px', textAlign: 'center' }}>
    <div>
      <div className="normal gray">Order ID</div>
      <p className="normal">{id}</p>
    </div>
    <Divider type="vertical" height={'100%'} />

    <div>
      <div className="normal gray">Payment Method</div>
      <p className="normal">{payment}</p>
    </div>
  </div>;

  return (
    <div>
      <Card title={orderTitle}
        width={'100%'}
        className="margint20px"
        extra={
          <a>
            <Text
              type="success"
              onClick={() => { window.history.back(); }}
            >
              Back to List
            </Text>
          </a>}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <Card
              type="inner"
              title={billingTitle}
            >
              <p className="margin4">{firstName} {lastName}</p>
              <p className="gray">{detailAdress} {commune} {district}, {province}</p>
              <br />
              <p className="gray margin4">EMAIL</p>
              <p className="margin4">{email}</p>
              <p className="gray margin4">PHONE</p>
              <p className="margin4">{phone}</p>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Card
              type="inner"
              title={priceTitle}
            >
              <div className="container-info">
                <p>Subtotal</p>
                <b className="align-right">${subTotal}</b>
              </div>
              <hr />
              <div className="container-info">
                <p>Shipping</p>
                <b>Free</b>
              </div>
              <hr />
              <div className="container-info">
                <p>Total</p>
                <b className="total">${subTotal}</b>
              </div>
            </Card>
          </Col>
        </Row>
        <Table className="margint20px" columns={columns} dataSource={dataSource} />;
      </Card>
      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={!(selectedProduct && selectedProduct.rate[0]) && (
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
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
