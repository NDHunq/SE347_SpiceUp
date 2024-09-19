import React from "react";
import { Rate ,Card, Button } from 'antd';
import { useState, useEffect } from "react";
import './product.css'

function Product({id, url_img, price, name}){
    const [star, setStar] = useState(1);
    const [percentSale, setPercentSale] = useState(0);
    const [soldCount, setSoldCount] = useState(0);
    const [soldOut, setSoldOut]=useState(false);
    const [hovered, setHovered] = useState(false); 
    return (
        <Card
        hoverable
        style={{ width: 320 }}
        className="card-product"
        cover={
            <div style={{ position: 'relative' }}>
                <img alt="product_image" src={url_img} class="product_image"/>
                {soldOut ? (
                    <div className="sold-out-label">
                        Sold Out
                    </div>
                ) : (
                    percentSale>0 && (
                        <div className="sale-label">
                            Sale {percentSale}%
                        </div>
                    )
                )}
            </div>
        }
        onMouseEnter={() => setHovered(true)}   
        onMouseLeave={() => setHovered(false)}  
      >
        <div class="container-product">
            <div class="container-info">
                {hovered?<p class="primary-color">{name}</p>:<p>{name}</p>}
                {percentSale>0?
                    <div><p><b>${(1-percentSale/100)*price}</b> <span class="strikethrough grey">${price}</span></p></div>
                    :<b >${price}</b>}
                <Rate class="rate" disabled defaultValue={star} fontSize   />
            </div>
            <div class="container-right">
                <Button>
                    <img width="24" height="24" src={hovered?"https://img.icons8.com/?size=100&id=21821&format=png&color=00b207":"https://img.icons8.com/ios/50/bag-front-view.png"} alt="bag-front-view"/>
                </Button>
                <p>{soldCount} sold</p>
            </div>
        </div>
      </Card>
    )
}
export default Product