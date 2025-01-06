import React, {useEffect} from "react";
import Header from "../widget/top";
import { useState } from "react";
import {CloseCircleOutlined}from '@ant-design/icons';
import {Table, Button, Popconfirm, Empty, Card, Skeleton, message} from 'antd';
import "./Cart.css"
import {
  Link,
  useNavigate,
} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import instance from "../../../utils/axiosCustomize";
import {toast} from "react-toastify";

function Cart() {
    // format number with dots
    const formatNumberWithDots = (number) => {
        // Convert the number to a string
        let numberStr = number?.toString();

        // Use a regular expression to add dots every three digits from the end
        let formattedStr = numberStr?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return formattedStr;
    }

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

    const token = localStorage.getItem('token');
    const decodedData = jwtDecode(token);
    const user_id = decodedData.id;

    const [cartItems, setCartItems] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [subTotal,setSubtotal]=useState();
    const [dataSource, setDataSource]  = useState([]);

    useEffect(() => {
      const total = dataSource.reduce((acc, item) => acc + (item.product.qty * item.product.price), 0);
      setSubtotal(total);  
    }, [dataSource]);

    const handleDelete = (key) => {
        const deleteCartItem = async () => {
            try {
                await instance.delete(`api/v1/cartItem/${key}`);
                const newData = dataSource.filter(item => item.key !== key);
                setDataSource(newData);
            }
            catch (error) {
                console.log("error", error);
            }
        }

        deleteCartItem();
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
              {productImages.length > 0
                  ?
                  <img src={product.url_img} width={60} height={60} className="mgr-8"/>
                  :
                  <Skeleton.Image active={true} style={{ width: 60, height: 60, marginRight: 8 }} />}

              <p>
                  {product.name}
              </p>
          </div>,
        },
        {
          title: 'PRICE',
          dataIndex: 'product',
          key: 'product',
          render:(product)=> <p>đ {formatNumberWithDots(product.price)}</p>
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
            render:(product)=><b>đ {formatNumberWithDots(((product.qty)*(product.price)).toFixed(0))}</b>
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get(`api/v1/cartItem/user/${user_id}`);
                setCartItems(response.data.data.cartItems);

                for (let i = 0; i < response.data.data.cartItems.length; i++) {
                    const res = await instance.get(`api/v1/image/${response.data.data.cartItems[i]?.product_id.product_images[0]}`, {
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
        const newDataSource = cartItems.map((item, index) => {
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
        setDataSource(newDataSource);
    }, [cartItems, productImages]);

    const handleCheckout = () => {
        if (dataSource.length === 0) {
            toast.error("No items in cart");
            return;
        }
        const updateCart = async () => {
            try {
                for (let i = 0; i < dataSource.length; i++) {
                    await instance.patch(`api/v1/cartItem/${dataSource[i].key}`, {
                        quantities: dataSource[i].product.qty
                    });
                }
            }
            catch (error) {
                console.log("error", error);
            }
            finally {
                navigate('/shopping-cart/checkout');
            }
        }

        updateCart();
    }
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
                                <b class="align-right">đ {formatNumberWithDots(subTotal)}</b>
                              </div>
                              <hr/>
                              <div class="container-info">
                                <p>Shipping</p>
                                <b>Free</b>
                              </div>
                              <hr/>
                              <div class="container-info">
                                <p>Total</p>
                                <b>đ {formatNumberWithDots(subTotal)}</b>
                              </div>                                  
                              <Button className="full-width-btn" type="primary" onClick={handleCheckout}>
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