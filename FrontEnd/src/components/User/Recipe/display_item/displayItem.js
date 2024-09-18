import React, { useState } from "react";
import "./displayItem.css";
import { FaClock, FaTag, FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { SlTag } from "react-icons/sl";
import { LiaUser, LiaCommentAltSolid } from "react-icons/lia";
import { IoArrowForward } from "react-icons/io5";

const DisplayItem = ({ istrue, ttime, ttag, tby, tcomments, tname, tlink }) => {
  const [isBookmarked, setIsBookmarked] = useState(istrue);
  const time = ttime;
  const tag = ttag;
  const by = tby;
  const comments = tcomments;
  const name = tname;
  const link_img = tlink;
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="display_item">
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
          <div className="timetxt">{time} min</div>
        </div>
      </div>
      <div className="bot">
        <div className="bot_row1">
          <SlTag className="tagicon1" />
          <div className="tagtxt1">{tag}</div>
          <LiaUser className="tagicon2" />
          <div className="tagtxt">
            <span style={{ color: "#B3B3B3" }}>By</span> {by}
          </div>
          <LiaCommentAltSolid className="tagicon3" />
          <div className="tagtxt">{comments} Comments</div>
        </div>
        <div className="height"></div>
        <div className="bot_row3">
          <div className="bot_row txt_name">{name}</div>
          <div onClick={toggleBookmark} className="bookmark">
            {isBookmarked ? (
              <FaBookmark className="bookmark-icon active" />
            ) : (
              <FaRegBookmark className="bookmark-icon" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayItem;
