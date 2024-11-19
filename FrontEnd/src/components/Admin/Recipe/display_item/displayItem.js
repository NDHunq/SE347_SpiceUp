import React, { useState } from "react";
import "./displayItem.css";
import { FaClock, FaTag, FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { SlTag } from "react-icons/sl";
import { LiaUser, LiaCommentAltSolid } from "react-icons/lia";
import { IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const DisplayItem = ({
  istrue,
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

  const handleItemClick = () => {
    navigate(`/admin/singlerecipe?id=${id}`);
  };

  return (
    <div className="display_item" onClick={handleItemClick}>
      <div
        className="top_dis"
        style={{
          backgroundImage: `url(${tlink})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="time">
          <FaClock className="clock" />
          <div className="timetxt">{ttime} min</div>
        </div>
      </div>
      <div className="bot">
        <div className="bot_row1">
          <SlTag className="tagicon1" />
          <div className="tagtxt1">{ttag}</div>
          <LiaUser className="tagicon2" />
          <div className="tagtxt">
            <span style={{ color: "#B3B3B3" }}>By</span> {tby}
          </div>
          <LiaCommentAltSolid className="tagicon3" />
          <div className="tagtxt">{tcomments} Comments</div>
        </div>
        <div className="height"></div>
        <div className="bot_row3">
          <div className="bot_row txt_name">{tname}</div>
        </div>
      </div>
    </div>
  );
};

export default DisplayItem;
