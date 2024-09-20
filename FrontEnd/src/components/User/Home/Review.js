import "./Review.scss";
import React from "react";
import { Link } from "react-router-dom";
import { FaQuoteRight } from "react-icons/fa6";
import { Rate } from "antd";

const Review = (props) => {
  const listReviews = [
    {
      content:
        "Trang web này thật sự là thiên đường cho những ai đam mê nấu nướng! Mình đã thử nhiều công thức và món nào cũng ngon hết sảy. Cảm ơn đội ngũ đã chia sẻ những công thức tuyệt vời và dễ làm đến vậy! ",
      avatar:
        "https://i.pinimg.com/736x/a3/ba/3d/a3ba3dd598336f6262f793493173c153.jpg",
      name: "Chây 97",
      role: "Customer",
      rate: 4,
    },
    {
      content:
        "Mình đã mua nguyên liệu từ đây và rất hài lòng với chất lượng cũng như dịch vụ giao hàng nhanh chóng. Cộng thêm phần công thức chi tiết giúp mình nấu ăn ngon hơn nhiều! Trang web thực sự rất hữu ích.",
      avatar:
        "https://cdn.tuoitre.vn/zoom/700_700/471584752817336320/2024/5/8/datg-37fix-1715125509697637110838-134-0-1181-2000-crop-17151258802831147956621.jpeg",
      name: "Đạt võ sư",
      role: "Customer",
      rate: 5,
    },
    {
      content:
        "Mình cực kỳ thích phần bình luận và chia sẻ kinh nghiệm nấu ăn của các thành viên trên website. Cảm giác như mình không chỉ học được cách nấu ăn mà còn được tham gia một cộng đồng yêu nấu nướng. ",
      avatar:
        "https://afamilycdn.com/150157425591193600/2020/7/10/b10-1594138692643454555380-15943961939011866028405.jpg",
      name: "Decao",
      role: "Customer",
      rate: 3,
    },
  ];
  return (
    <div className="RV-container">
      <main className="main">
        <div className="container">
          <div className="subtitle">TESTIMONIAL</div>
          <div className="title">What Our Customer Says</div>
          <div className="row">
            {listReviews.map((item, index) => (
              <div key={index} className="col">
                <div className="product">
                  <FaQuoteRight className="icon" />
                  <p className="content">{item.content}</p>
                  <div className="user">
                    <img className="avatar" src={item.avatar} alt="" />
                    <span>
                      <div className="name">{item.name}</div>
                      <div className="role">{item.role}</div>
                    </span>
                    <Rate className="rate" disabled defaultValue={item.rate} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
export default Review;
