import React, { useState } from "react";

import { FaClock, FaTag, FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { SlTag } from "react-icons/sl";
import { LiaUser, LiaCommentAltSolid } from "react-icons/lia";
import { IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./SaveItem.css";
const SaveItem = ({ imagelink, name, istrue, issave, id }) => {
  const [isBookmarked, setIsBookmarked] = useState(istrue);
  const navigate = useNavigate();

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleItemClick = () => {
    navigate(`/singlerecipe?id=${id}`);
  };

  return (
    <div className="srecipe" onClick={handleItemClick}>
      <div
        className="stop"
        style={{
          backgroundImage: `url(${imagelink})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="sbot sbot2">
        <p className="txtbot" data-tooltip="Your tooltip text here">
          {name}
        </p>
        {issave && (
          <div
            onClick={(e) => {
              e.stopPropagation();
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
  );
};

export default SaveItem;
