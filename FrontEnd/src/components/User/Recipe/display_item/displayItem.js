import React, { useState } from "react";
import "./displayItem.css";
import { FaClock, FaTag, FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { SlTag } from "react-icons/sl";
import { LiaUser, LiaCommentAltSolid, LiaEye } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const DisplayItem = ({
  istrue,
  isbook = true,
  ttime,
  ttag,
  tby,
  tcomments,
  tname,
  tlink,
  id,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(istrue);
  const navigate = useNavigate();

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleItemClick = () => {
    navigate(`/singlerecipe?id=${id}`);
    window.location.reload();
  };

  // Đảm bảo tby là chuỗi (nếu là đối tượng, lấy giá trị cần hiển thị)
  const displayBy =
    typeof tby === "object" && tby?.firstname
      ? `${tby.firstname} ${tby.lastname || ""}`
      : tby || "Unknown";

  return (
    <div className="display_item" onClick={handleItemClick}>
      {/* Hình ảnh và thời gian */}
      <div
        className="top_dis"
        style={{
          backgroundImage: `url(${tlink || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="time">
          <FaClock className="clock" />
          <div className="timetxt">{ttime ? `${ttime} min` : "N/A"}</div>
        </div>
      </div>

      {/* Nội dung phía dưới */}
      <div className="bot">
        <div className="bot_row1">
          {/* Thẻ loại món ăn */}
          <SlTag className="tagicon1" />
          <div className="tagtxt1">{ttag || "Uncategorized"}</div>

          {/* Người tạo */}
          <LiaUser className="tagicon2" />
          <div className="tagtxt">
            <span style={{ color: "#B3B3B3" }}>By</span> {displayBy}
          </div>

          {/* Lượt xem */}
          <LiaEye className="tagicon3" />
          <div className="tagtxt">{tcomments || 0} Views</div>
        </div>

        <div className="height"></div>

        {/* Tên món ăn và bookmark */}
        <div className="bot_row3">
          <div className="bot_row txt_name">{tname || "Unnamed Recipe"}</div>

          {isbook && (
            <div
              onClick={(e) => {
                e.stopPropagation(); // Ngăn chặn sự kiện click lan lên cha
                toggleBookmark();
              }}
              className="bookmark"
            >
              {isBookmarked ? (
                <FaBookmark className="bookmark-icon active" />
              ) : (
                <FaRegBookmark className="bookmark-icon" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayItem;
