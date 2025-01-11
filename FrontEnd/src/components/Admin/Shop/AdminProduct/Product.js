import React, { useState } from "react";
import { Rate, Card, Modal ,Skeleton} from "antd";
import ModalModify from "../Modal/ModalModify";
import instance from "../../../../utils/axiosCustomize";
import { useEffect } from "react";
import { Color } from "antd/es/color-picker";
function Product(props) {
  const [percentSale, serPercentSale]=useState(props.discount);
  const [star, setStar] = useState(props.average_rating);
  const [soldCount, setSoldCount] = useState(props.sold);
  const [soldOut, setSoldOut] = useState(props.stock === 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hovered,setHovered]=useState(false);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(images[0]);
  useEffect(() => {
    serPercentSale(props.discount);
}, [props.discount]);
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
    // Convert the number to a string
    let numberStr = number?.toString();

    // Use a regular expression to add dots every three digits from the end
    let formattedStr = numberStr?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return formattedStr;
}
  return (
    <>
      <Card
        hoverable
        style={{ width: 320 }}
        className="card-product"
        cover={null}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div onClick={showModal}>
          <div style={{ position: "relative" }}>
          { images[0]
                    ?
                    <img alt="product_image" src={images[0]} className="product_image"/>
                    :
                    <Skeleton.Image active={true} style={{ width: 270, height: 270}}/>}
            {soldOut ? (
              <div className="sold-out-label">Sold Out</div>
            ) : (
              (percentSale * 100) > 0 && (
                <div className="sale-label">
                    Sale {(percentSale*100).toFixed(0)}%
                </div>
            )
            )}
          </div>
          <div className="container-product">
            <div className="container-info">
              {hovered ? (
                <p className="primary-color margin0">{props.name}</p>
              ) : (
                <p className="margin0">{props.name}</p>
              )}
                {(percentSale * 100)>0?
                        <div><p><b>đ {formatNumberWithDots((1 - percentSale).toFixed(2) * props.price)}</b> <span class="strikethrough grey">đ {formatNumberWithDots(props.price)}</span></p></div>
                        :<b >đ {formatNumberWithDots(props.price)}</b>}
              <Rate className="rate" disabled defaultValue={star} />
            </div>
            <div class="container-right">
                    <p style={{color:"#00b207"}}>{soldCount} sold{soldCount>1?"s":""}</p>
                </div>
          </div>
        </div>
      </Card>

    <Modal
        open={isModalOpen}
        width={1200}
         height={500}
        onCancel={handleCloseModal}
        footer={null}
    >
        <ModalModify {...props} onClose={handleCloseModal}   />
    </Modal>
    </>
  );
}

export default Product;
