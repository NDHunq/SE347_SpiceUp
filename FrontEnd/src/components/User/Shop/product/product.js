import React from "react";
import { Rate ,Card, Button,Modal } from 'antd';
import { useState, useEffect} from "react";
import './product.css'

function Product({id, url_img, price, name}){
    const [star, setStar] = useState(1);
    const [percentSale, setPercentSale] = useState(0);
    const [soldCount, setSoldCount] = useState(0);
    const [soldOut, setSoldOut]=useState(false);
    const [hovered, setHovered] = useState(false); 
    const [hoveredButton, setHoveredButton]=useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
            <img alt="product_image" src={url_img} class="product_image"/>

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

                    </div>
                    <div class="img-product">

                    </div>
                </div>
                <div className="info-area">
                    <div class="info-1">

                    </div>
                    <div class="info-2">

                    </div>
                </div>
            </div>
        </Modal>
      </Card>
    )
}
export default Product