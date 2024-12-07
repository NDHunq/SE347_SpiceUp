import React, { useState } from "react";
import { Rate, Card, Modal } from "antd";
import ModalModify from "../Modal/ModalModify";

function Product({ id, urls_img, price, name }) {
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
            <img
              alt="product_image"
              src={urls_img[0]}
              className="product_image"
            />
            {soldOut ? (
              <div className="sold-out-label">Sold Out</div>
            ) : (
              percentSale > 0 && (
                <div className="sale-label">Sale {percentSale}%</div>
              )
            )}
          </div>
          <div className="container-product">
            <div className="container-info">
              {hovered ? (
                <p className="primary-color margin0">{name}</p>
              ) : (
                <p className="margin0">{name}</p>
              )}
              {percentSale > 0 ? (
                <div>
                  <p>
                    <b>${(1 - percentSale / 100) * price}</b>{" "}
                    <span className="strikethrough grey">${price}</span>
                  </p>
                </div>
              ) : (
                <b>${price}</b>
              )}
              <Rate className="rate" disabled defaultValue={star} />
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
        <ModalModify productId={id} />
    </Modal>
    </>
  );
}

export default Product;
