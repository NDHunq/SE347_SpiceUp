import React from "react";
import { Rate ,Card, Button, Modal, Carousel,Avatar, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from "react";
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import {
    LinkOutlined
  } from '@ant-design/icons';
import './product.css'
import { useSelector, useDispatch } from 'react-redux';
import {jwtDecode} from "jwt-decode";
import instance from "../../../../utils/axiosCustomize";
import {toast} from "react-toastify";

function Product(props){
    // format number with dots
    const formatNumberWithDots = (number) => {
        // Convert the number to a string
        let numberStr = number?.toString();

        // Use a regular expression to add dots every three digits from the end
        let formattedStr = numberStr?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return formattedStr;
    }

    const token = localStorage.getItem('token');
    const decodedData = jwtDecode(token);
    const user_id = decodedData.id;

    const [soldCount, setSoldCount] = useState(props.sold);
    const [soldOut, setSoldOut] = useState(props.stock === 0);
    const qtyInCart = useSelector(state=>state.qtyInCart.count);
    const dispatch=useDispatch();
    const [star, setStar] = useState(props.average_rating);
    const [hovered, setHovered] = useState(false);
    const [hoveredButton, setHoveredButton]=useState(false);
    const [percentSale, serPercentSale]=useState(props.discount);
    const [qty, setQty]=useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // for modal
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentQty, setCurrentQty] = useState(1);
    const [category, setCategory]=useState("");
    const [amountRate,setAmountRate]=useState(props.review_count);
    const [openRate, setOpenRate]=useState(false);
    const [loading, setLoading] = useState(false);
    const [rateContent, setRateContent] = useState([]);
    const [description, setDescription]= useState(props.description);
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(images[0]);
    const copyUrlPage=()=>{

    }

    const [userAvatar, setUserAvatar] = useState([]);
    const loadMoreRateContent = async () => {
        if (loading) {
            return;
        }

        // Call API to get all reviews
        try {
            setLoading(true);
            const response = await instance.get(`api/v1/review/${props.id}`);
            setRateContent(response.data.data.reviews);
            for (let i = 0; i < response.data.data.reviews.length; i++) {
                const res = await instance.get(`api/v1/image/${response.data.data.reviews[i]?.user_id.avatar}`, {
                    responseType: 'arraybuffer'
                })
                const blob = new Blob([res.data], { type: `${res.headers["content-type"]}` });
                const url = URL.createObjectURL(blob);
                setUserAvatar((prevAvatar) => [...prevAvatar, url]);
            }
        }
        catch (error) {
            console.log(error);
            setLoading(false);
        }
        finally {
            setLoading(false);
        }

        return () => {
            // Revoke image URL
            for (let avatar of userAvatar) {
                URL.revokeObjectURL(avatar);
            }
        }
    };

    useEffect(() => {
        loadMoreRateContent();
    }, [props.review_count]);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const promises = props.urls_img.map((image) =>
                    instance.get(`api/v1/image/${image}`, { responseType: 'arraybuffer' })
                );
                const responses = await Promise.all(promises); // Call API song song
                const tempImages = responses.map((response) => {
                    const blob = new Blob([response.data], { type: `${response.headers["content-type"]}` });
                    return URL.createObjectURL(blob);
                });
                setImages(tempImages); // Cập nhật state một lần
            } catch (error) {
                console.log(error);
            }
        };

        fetchImage();

        return () => {
            // Revoke tất cả URL
            images.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [props.urls_img]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await instance.get(`api/v1/category/${props.category}`);
                setCategory(response.data.data.category_name);
            }
            catch (error) {
                console.log(error);
            }
        };

        fetchCategory();
    }, [props.category]);

    useEffect(() => {
        setCurrentImage(images[0]);
    }, [images]);

    const handleBeforeChange = (from, to) => {
        setCurrentSlide(to);
        setCurrentImage(images[to]);

    };
    const increaseQty = () => {
        setCurrentQty(currentQty >= props.stock ? props.stock : currentQty + 1);
      };
    
      const decreaseQty = () => {
        if (currentQty > 1) { 
          setCurrentQty(prevQty => prevQty - 1);
        }
      };
    
    
    const showModal = () => {
        setIsModalOpen(true);
      };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
      };

    const handleAddToCart = async () => {
        dispatch({ type: 'plus', payload: currentQty });

        // Call API to add product to cart
        try {
            let body = {
                user_id: user_id,
                product_id: props.id,
                quantities: currentQty
            }
            await instance.post('api/v1/cartItem', body);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            toast.success("Add to cart successfully");
            setCurrentQty(1);
            setIsModalOpen(false);
        }
    }

    return (
        <Card
        hoverable
        style={{ width: 320, height: 400 }}
        className="card-product"
        cover={null}
        onMouseEnter={() => setHovered(true)}   
        onMouseLeave={() => setHovered(false)}  
      >
        <div onClick={showModal}>
            <div style={{ position: 'relative' }}>
                { images[0]
                    ?
                    <img alt="product_image" src={images[0]} className="product_image"/>
                    :
                    <Skeleton.Image active={true} style={{ width: 270, height: 270}}/>}

                    {soldOut ? (
                        <div className="sold-out-label">
                            Sold Out
                        </div>
                    ) : (
                        (percentSale * 100) > 0 && (
                            <div className="sale-label">
                                Sale {(percentSale*100).toFixed(0)}%
                            </div>
                        )
                    )}
                </div>
            <div class="container-product" >
                <div class="container-info">
                    {hovered?<p class="primary-color margin0">{props.name}</p>:<p class="margin0">{props.name}</p>}
                    {(percentSale * 100)>0?
                        <div><p><b>đ {formatNumberWithDots((1 - percentSale).toFixed(2) * props.price)}</b> <span class="strikethrough grey">đ {formatNumberWithDots(props.price)}</span></p></div>
                        :<b >đ {formatNumberWithDots(props.price)}</b>}
                    <Rate class="rate" disabled defaultValue={star} fontSize   />
                </div>
                <div class="container-right">
                    <Button        
                    onMouseEnter={() => setHoveredButton(true)}   
                    onMouseLeave={() => setHoveredButton(false)}  
                    onClick={(event) => {
                        event.stopPropagation(); 
                        dispatch({ type: 'plus', payload: 1 })
                        //add 1 to cart 
                    }}
                    >
                        <img width="24" height="24" src={hoveredButton?"https://img.icons8.com/?size=100&id=21821&format=png&color=00b207":"https://img.icons8.com/ios/50/bag-front-view.png"} alt="bag-front-view"/>
                    </Button>
                    <p>{soldCount} sold</p>
                </div>
            </div>
        </div>
        <Modal title="" 
            class="detail-product"
            open={isModalOpen} 
            onOk={handleOk} 
            onCancel={() => {
                setIsModalOpen(false);
            }}
            width={1200}
            bodyStyle={{ height: '500px' }}  
            footer={null}>
            <div className="modal-content">
                <div className="im-area">
                    <div class="img-list">
                    <Carousel class="custom-carousel" 
                        arrows={true}
                        dotPosition="left" 
                        infinite={false} 
                        slidesToShow={3} 
                        dots={false}
                        slidesToScroll={1}
                        beforeChange={handleBeforeChange}
                        
                        >
                    { images.length > 0 ?
                        props.urls_img.map((_, index) => (
                            <div key={index} className="carousel-item">
                            <img
                                src={images[index]}
                                className={index === currentSlide ? 'active-slide' : ''}
                                alt={`Slide ${index + 1}`}
                                onClick={
                                    ()=>{
                                        setCurrentSlide(index)
                                        setCurrentImage(images[index]);
                                    }
                                }
                            />
                            </div>
                    ))
                        :
                        <Skeleton.Image active={true} style={{width: 96, height: 96}}/>}
                    </Carousel>

                    </div>
                    <div class="img-product">
                        <img class="current-img"src={currentImage}/>
                    </div>
                </div>
                <div className="info-area">
                    <div class="info-1">
                        <div class="product-info">
                            <h2 class="product-name">{props.name}</h2>
                            {props.product_status === "In Stock" ? <div class="status in-stock">In Stock</div>:<div class="status out-stock">Out of Stock</div>}
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                <button
                                className="accordion-button"
                                type="button"
                                onClick={() => setOpenRate(!openRate)}
                                aria-expanded={openRate}
                                aria-controls="panelsStayOpen-collapseRate"
                                >
                                <div className="container-review">
                                    <Rate disabled defaultValue={star} className="rv-rate" />
                                    <p className="marginl8px">{amountRate} Review</p>
                                    <span className="marginl8px">
                                    {openRate ? <UpOutlined /> : <DownOutlined />}
                                    </span>
                                </div>
                                </button>
                            </h2>
                            <div
                                id="panelsStayOpen-collapseRate"
                                className={`accordion-collapse collapse ${openRate ? 'show' : ''}`}
                                aria-labelledby="panelsStayOpen-headingOne"
                            >
                                <div className="accordion-body">
                                <div className="rate-cmt-container">
                                    <div
                                    id="scrollableDiv"
                                    style={{
                                        height: 220,
                                        overflow: 'auto',
                                        padding: '0 16px',
                                        border: '1px solid rgba(140, 140, 140, 0.35)',
                                    }}
                                    >
                                    <InfiniteScroll
                                        dataLength={rateContent.length}
                                        next={loadMoreRateContent}
                                        hasMore={rateContent.length < 10}
                                        loader={amountRate < 0 &&
                                        <Skeleton
                                            avatar
                                            paragraph={{
                                            rows: 1,
                                            }}
                                            active
                                        />
                                        }
                                        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                                        scrollableTarget="scrollableDiv"
                                    >
                                        <List
                                        dataSource={rateContent}
                                        renderItem={(item, index) => (
                                            <List.Item key={item._id}>
                                                <List.Item.Meta
                                                    avatar={<Avatar src={userAvatar[index]} />}
                                                    title={item.user_id.email}
                                                    description={item.content}
                                                />
                                                <Rate disabled defaultValue={item.rating} />
                                                {/* content rate */}
                                            </List.Item>
                                        )}
                                        />
                                    </InfiniteScroll>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>

                        <div class="price-line">
                            {(percentSale * 100)>0?
                            <div><p><span class="strikethrough grey">đ {formatNumberWithDots(props.price)}</span><span class="marginl4px sell-price">đ {formatNumberWithDots((1-percentSale).toFixed(2)*props.price)}</span></p></div>
                            :<span class="sell-price " >đ {formatNumberWithDots(props.price)}</span>}
                            <div class="percentSale marginl4px">{(percentSale*100).toFixed(0)}% Off</div>
                        </div>
                        <div class="brand-line">
                            <div className="sub-line">
                                <span>Brand:</span>
                                <span className="brand-text">&nbsp; {props.brand}</span>
                            </div>
                            <LinkOutlined onClick={copyUrlPage}/>
                        </div>
                        <p class="grey discription">{description}</p>
                    </div>
                    <div class="info-2">
                        <hr/>
                        <div className="container-atc">
                            <div className="container-qty">
                                <Button onClick={decreaseQty} type="primary" className="qty-btn" shape="circle">-</Button>
                                <p className="qty-display">{currentQty}</p>
                                <Button onClick={increaseQty} type="primary" className="qty-btn" shape="circle">+</Button>
                            </div>
                            <Button type="primary" className="add-to-cart-btn"
                                onClick={handleAddToCart}><b>Add to Cart</b></Button>
                        </div>
                        <hr/>
                        <p class="cate"><b>Category: </b>{category}</p>
                    </div>
                </div>
            </div>
        </Modal>
      </Card>
    )
}
export default Product