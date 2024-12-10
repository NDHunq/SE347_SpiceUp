import React, { useState } from "react";

import { FaClock, FaTag, FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { SlTag } from "react-icons/sl";
import { LiaUser, LiaCommentAltSolid } from "react-icons/lia";
import { IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { saveReicpe } from "../../../../../../services/userServices";
import "./SaveItem.css";
const SaveItem = ({ imagelink, name, istrue, issave, id, status }) => {
  const [isBookmarked, setIsBookmarked] = useState(istrue);
  const navigate = useNavigate();

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleItemClick = () => {
    navigate(`/singlerecipe?id=${id}`);
  };
  const userId = "66f6cd4a06a448abe23763e0";
  const handleSave = async () => {
    await saveReicpe(id, {
      user_id: userId,
    });
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
        <p className="txtbot " data-tooltip="Your tooltip text here">
          {name}
        </p>
        {istrue && status === "RS1" && (
          <p
            className="txtbot bold"
            data-tooltip="Your tooltip text here"
            style={{ color: "red" }}
          >
            Pending
          </p>
        )}
        {istrue && status === "RS2" && (
          <p
            className="txtbot bold"
            data-tooltip="Your tooltip text here"
            style={{ color: "green" }}
          >
            Approved
          </p>
        )}

        {issave && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark();
            }}
            className="bookmark"
          >
            {isBookmarked ? (
              <FaBookmark
                className="bookmark-icon active"
                onClick={handleSave}
              />
            ) : (
              <FaRegBookmark className="bookmark-icon" onClick={handleSave} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SaveItem;
