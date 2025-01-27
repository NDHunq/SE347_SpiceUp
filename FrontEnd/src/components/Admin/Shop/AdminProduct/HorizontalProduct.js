import React from "react";
import { Rate ,Card, Button, Modal, Carousel,Avatar, Divider, List, Skeleton } from 'antd';
import { useState, useEffect } from "react";
import ModalModify from "../Modal/ModalModify";
import instance from "../../../../utils/axiosCustomize";


function HorizontalProduct(props){
    const [percentSale, serPercentSale]=useState(props.discount);
  const [star, setStar] = useState(props.average_rating);
  const [soldCount, setSoldCount] = useState(props.sold);
  const [soldOut, setSoldOut] = useState(props.stock === 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hovered,setHovered]=useState(false);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(images[0]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const promises = props.urls_img.map((image) =>
                    instance.get(`api/v1/image/${image}`, { responseType: 'arraybuffer' })
                );
                const responses = await Promise.all(promises); 
                const tempImages = responses.map((response) => {
                    const blob = new Blob([response.data], { type: `${response.headers["content-type"]}` });
                    return URL.createObjectURL(blob);
                });
                setImages(tempImages); 
            } catch (error) {
                console.log(error);
            }
        };

        fetchImage();

        return () => {
            images.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [props.urls_img]);
  
    useEffect(() => {
      setCurrentImage(images[0]);
  }, [images]);
  const formatNumberWithDots = (number) => {
    let numberStr = number?.toString();

    let formattedStr = numberStr?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return formattedStr;
}
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
            {images[0]
                    ?
                    <img alt="product_image" src={images[0]} className="product_image_sale"/>
                    :
                    <Skeleton.Image active={true} style={{ width: 80, height: 80, marginRight: 20}}/>}
                <div className="container-sale-product">
                {hovered ? (
                <p className="primary-color margin0">{props.name}</p>
              ) : (
                <p className="margin0">{props.name}</p>
              )}
                <div>
                    {(percentSale * 100)>0?
                            <div><p><b>đ {formatNumberWithDots((1 - percentSale).toFixed(2) * props.price)}</b> <span class="strikethrough grey">đ {formatNumberWithDots(props.price)}</span></p></div>
                            :<b >đ {formatNumberWithDots(props.price)}</b>}
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
                <ModalModify {...props} onClose={handleCloseModal} />
            </Modal>
        </Card>

    )
}
export default HorizontalProduct;