import React from "react";
import { Rate ,Card, Button } from 'antd';
import { useState, useEffect } from "react";
import './productsale.css'

function ProductSale({id, url_img, price, name, percentSale}){
    const [star, setStar] = useState(1);
    const [hovered, setHovered] = useState(false); 
    const [hoveredButton, setHoveredButton]=useState(false);
    return (
        <Card
            hoverable
            style={{ width: 320 }}
            className="card-product-sale"
            cover={null}  
            onMouseEnter={() => setHovered(true)}   
            onMouseLeave={() => setHovered(false)}
        >
            <div className="card-content">
                <img alt="product_image" src={url_img} className="product_image_sale" />
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
        </Card>

    )
}
export default ProductSale;