import React from "react";
import Header from "../widget/top";
import { useState,useEffect } from "react";
import {CloseCircleOutlined}from '@ant-design/icons';
import { Table,Button,Popconfirm,Empty, Card } from 'antd';
import "./Cart.css"
import {
  Link,
  useNavigate,
} from "react-router-dom";
function Cart() {
  const navigate = useNavigate();

  const [navItems, setNavItems] = useState([
    { link: "/shopping-cart", text: "Shopping Cart" },
  ]);
  const handleNavItemClick = (text, path) => {
    setNavItems((prevItems) => [
        ...prevItems.slice(0, -1),
        { link: path, text: text },
    ]);
    navigate(path);  
};
    const [subTotal,setSubtotal]=useState();
    const [dataSource, setDataSource]  = useState([
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
      const total = dataSource.reduce((acc, item) => acc + (item.product.qty * item.product.price), 0);
      setSubtotal(total);  
    }, [dataSource]);
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        //update in database
        setDataSource(newData);
    };
    const handleQtyChange = (key, operation) => {
      const newData = dataSource.map(item => {
          if (item.key === key) {
              const newQty = operation === "increase" ? item.product.qty + 1 : item.product.qty - 1;
              if(newQty>0){
                //update in database
              }
              return {
                  ...item,
                  product: { ...item.product, qty: newQty > 0 ? newQty : 1 }
              };
          }
          return item;
      });
      setDataSource(newData);
  };
    const columns = [
        {
          title: 'PRODUCT',
          dataIndex: 'product',
          key: 'product',
          render: (product) => 
          <div class="flex jtf-ct-fs align-vertical">
            <img src={product.url_img} width={60} height={60} class="mgr-8">
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
          render:(product)=> <p>${product.price}</p>
        },
        {
            title: 'QUANTITY',
            dataIndex: 'product',
            key: 'product',
            render:(product,record)=>
                <div className="container-qty flex jtf-ct-fs">
                    <Button onClick={()=>{
                        handleQtyChange(record.key, "decrease")
                    }} type="primary" className="qty-btn" shape="circle">-</Button>
                    <p className="qty-display">{product.qty}</p>
                    <Button onClick={()=>{
                        handleQtyChange(record.key, "increase")
                    }} type="primary" className="qty-btn" shape="circle">+</Button>
                </div>
        },
        {
            title:'SUBTOTAL',
            dataIndex: 'product',
            key: 'product',
            render:(product)=><b>${(product.qty)*(product.price)}</b>
        },
        {
            title: '',
            dataIndex: '',
            align:'right',
            render: (_, record) =>
              dataSource.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                  <CloseCircleOutlined />
                </Popconfirm>
              ) : null,
          },
      ];
    return(
        <div class="user-cart">
            <Header navItems={navItems}/>
            <h2>My Shopping Cart</h2>
            <main>
                <div class="container">
                    <div class="row">
                        
                        <div class="cart-product col-9">
                            <Table columns={columns} dataSource={dataSource} 
                               locale={{
                                emptyText: <Empty description="No items in cart"></Empty>,
                              }}
                              footer={() => 
                                <Link to="/shop">
                                    <Button class="primary">Return to Shop</Button>
                                </Link>
                              }/>;
                        </div>
                        <div class="fee col-3">
                            <Card class="container-cart-info">
                              <h4>Cart Total</h4>
                              <div class="container-info">
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
                                <b>${subTotal}</b>
                              </div>                                  
                              <Button className="full-width-btn" type="primary" onClick={() => navigate('/shopping-cart/checkout')}>
                                Proceed to checkout
                              </Button>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}


  
export default Cart;