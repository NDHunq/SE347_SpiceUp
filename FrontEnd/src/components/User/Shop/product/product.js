import React from "react";
import { Rate ,Card, Button, Modal, Carousel,Avatar, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from "react";
import {
    LinkOutlined
  } from '@ant-design/icons';
import './product.css'

function Product({id, urls_img, price, name}){
    const [star, setStar] = useState(1);
    const [percentSale, setPercentSale] = useState(10);
    const [soldCount, setSoldCount] = useState(0);
    const [qty, setQty]=useState(1);
    const [hovered, setHovered] = useState(false); 
    const [hoveredButton, setHoveredButton]=useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // for modal
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentImage, setCurrentImage] = useState(urls_img[0]);
    const [currentQty, setCurrentQty] = useState(1); 
    const [category, setCategory]=useState("Vegetable");
    const [url_brand, setUrlBrand]=useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYjsaa3QzrzHD0hKprv48RIOsfluOX-Sc7lQ&s");
    const [amountRate,setAmountRate]=useState(8);
    const [openRate, setOpenRate]=useState(true);
    const [loading, setLoading] = useState(false);
    const [rateContent, setRateContent] = useState([]);
    const [discription, setDiscripstion]= useState("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
    const copyUrlPage=()=>{

    }
    const loadMoreRateContent = () => {
      if (loading) {
        return;
      }
      setLoading(true);
      fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
        .then((res) => res.json())
        .then((body) => {
          setRateContent([...rateContent, ...body.results]);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    };
    useEffect(() => {
      loadMoreRateContent();
    }, []);

    const handleBeforeChange = (from, to) => {
        setCurrentSlide(to);
        setCurrentImage(urls_img[to]);

    };
    const increaseQty = () => {
        setCurrentQty(prevQty => prevQty + 1);
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
    return (
        <Card
        hoverable
        style={{ width: 320 }}
        className="card-product"
        cover={null}
        onMouseEnter={() => setHovered(true)}   
        onMouseLeave={() => setHovered(false)}  
      >
        <div onClick={showModal}>
            <img alt="product_image" src={urls_img[0]} class="product_image"/>

            <div class="container-product" >
                <div class="container-info">
                    {hovered?<p class="primary-color margin0">{name}</p>:<p class="margin0">{name}</p>}
                    {percentSale>0?
                        <div><p><b>${(1-percentSale/100)*price}</b> <span class="strikethrough grey">${price}</span></p></div>
                        :<b >${price}</b>}
                    <Rate class="rate" disabled defaultValue={star} fontSize   />
                </div>
                <div class="container-right">
                    <Button        
                    onMouseEnter={() => setHoveredButton(true)}   
                    onMouseLeave={() => setHoveredButton(false)}  >
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
                    {urls_img.map((_, index) => (
                        <div key={index} className="carousel-item">
                        <img
                            src={urls_img[index]}
                            className={index === currentSlide ? 'active-slide' : ''}
                            alt={`Slide ${index + 1}`}
                            onClick={
                                ()=>{
                                    setCurrentSlide(index)
                                    setCurrentImage(urls_img[index]);
                                }
                            }
                        />
                        </div>
                    ))}
                    </Carousel>
                    </div>
                    <div class="img-product">
                        <img class="current-img"src={currentImage}/>
                    </div>
                </div>
                <div className="info-area">
                    <div class="info-1">
                        <div class="product-info">
                            <h2 class="product-name">{name}</h2>
                            {qty>0?<div class="status in-stock">In Stock</div>:<div class="status out-stock">Out of Stock</div>}
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                                <button class="accordion-button" 
                                type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseRate" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne"
                                onClick={()=>{setOpenRate(!openRate)}}
                               >
                                    <div class="container-review">
                                        <Rate disabled defaultValue={star} class="rv-rate" /> 
                                        <p class="marginl8px">{amountRate} Review</p>
                                        <span class="marginl8px">
                              {openRate ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/>
                              </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                </svg>
                              )}
                              </span>
                                    </div>
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseRate" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                <div class="accordion-body">
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
                                                loader={
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
                                                    renderItem={(item) => (
                                                        <List.Item key={item.email}>
                                                        <List.Item.Meta
                                                            avatar={<Avatar src={item.picture.large} />}
                                                            title={<a href="https://ant.design">{item.name.last}</a>}
                                                            description={"content review"}
                                                        />
                                                            <Rate disabled defaultValue={3}  /> 
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
                            {percentSale>0?
                            <div><p><span class="strikethrough grey">${price}</span><span class="marginl4px sell-price">${(1-percentSale/100)*price}</span></p></div>
                            :<span class="sell-price " >${price}</span>}
                            <div class="percentSale marginl4px">{percentSale}% Off</div>
                        </div>
                        <div class="brand-line">
                            <div class="sub-line">
                                <span>Brand: </span> <img class="marginl4px"src={url_brand} width={40} height={40}/>
                            </div>
                            <LinkOutlined onClick={copyUrlPage}/>
                        </div>
                        <p class="grey discription">{discription}</p>
                    </div>
                    <div class="info-2">
                        <hr/>
                        <div className="container-atc">
                            <div className="container-qty">
                                <Button onClick={decreaseQty} type="primary" className="qty-btn" shape="circle">-</Button>
                                <p className="qty-display">{currentQty}</p>
                                <Button onClick={increaseQty} type="primary" className="qty-btn" shape="circle">+</Button>
                            </div>
                            <Button type="primary" className="add-to-cart-btn"><b>Add to Cart</b></Button>
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