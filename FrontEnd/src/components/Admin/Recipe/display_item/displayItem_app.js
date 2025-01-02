import React, { useState } from "react";
import "./displayItem.css";
import { FaClock, FaTag, FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { SlTag } from "react-icons/sl";
import { LiaUser, LiaCommentAltSolid } from "react-icons/lia";
import { IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DisplayItem = ({
  istrue,
  ttime,
  ttag,
  tby,
  tcomments,
  tname,
  tlink,
  id,
  handleDelete,
  currentValue,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(istrue);
  const navigate = useNavigate();

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleItemClick = () => {
    navigate(`/admin/singlerecipe?id=${id}`);
  };
  const handleRefuse = () => {
    handleDelete(id);
    toast.success("Recipe refused");
  };
  const handleAccept = () => {
    handleDelete(id);
    toast.success("Recipe accepted");
  };

  return (
    <div className="display_item">
      <div
        onClick={handleItemClick}
        className="top_dis"
        style={{
          backgroundImage: `url(${tlink})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="time" onClick={handleItemClick}>
          <FaClock className="clock" />
          <div className="timetxt">{ttime} min</div>
        </div>
      </div>
      <div className="bot">
        <div className="bot_row1" onClick={handleItemClick}>
          <SlTag className="tagicon1" />
          <div className="tagtxt1">{ttag}</div>
          <LiaUser className="tagicon2" />
          <div className="tagtxt">
            <span style={{ color: "#B3B3B3" }}>By</span> {tby}
          </div>
          <LiaCommentAltSolid className="tagicon3" />
          <div className="tagtxt">{tcomments} Views</div>
        </div>
        <div className="height" onClick={handleItemClick}></div>
        <div className="bot_row3">
          <div className="bot_row txt_name" onClick={handleItemClick}>
            {tname}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayItem;
