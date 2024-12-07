import React from "react";
import { Rate ,Card, Button, Modal, Carousel,Avatar, Divider, List, Skeleton } from 'antd';
import { useState, useEffect } from "react";
import ModalModify from "../Modal/ModalModify";



function HorizontalProduct({id, urls_img, price, name}){
    const [percentSale, setPercentSale] = useState(10);
    const [star, setStar] = useState(1);
    const [soldOut, setSoldOut] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hovered,setHovered]=useState(false);
  
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
    return (
        <Card
            hoverable
            style={{ width: 320 }}
            className="card-product-sale"
            cover={null}  
            onMouseEnter={() => setHovered(true)}   
            onMouseLeave={() => setHovered(false)}
        >
            <div className="card-content" onClick={showModal}>
                <img alt="product_image" src={urls_img[0]} className="product_image_sale" />
                <div className="container-sale-product">
                {hovered ? <p className="primary-color margin0">{name}</p> : <p className="margin0">{name}</p>}
                <div>
                    <p>
                    <b>${(1 - percentSale / 100) * price} </b>
                    <span className="strikethrough grey">${price}</span>
                    </p>
                </div>    
                <Rate className="rate" disabled defaultValue={star} />
                </div>
            </div>
            <Modal
                open={isModalOpen}
                width={1200}
                height={500}
                onCancel={handleCloseModal}
                footer={null}
            >
                <ModalModify productId={id} />
            </Modal>
        </Card>

    )
}
export default HorizontalProduct;