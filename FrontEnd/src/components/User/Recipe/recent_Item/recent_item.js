import React from "react";
import "./recent_item.css";
import { CiCalendar } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const RecentItem = ({ tname, ttime, tlink, id }) => {
  const RecentName = tname;
  const RecentTime = ttime;
  const RecentLink = tlink;
  const navigate = useNavigate();
  const handleItemClick = () => {
    navigate(`/singlerecipe?id=${id}`);
  };
  return (
    <div className="recent" onClick={handleItemClick}>
      <div
        className="recent_img"
        style={{
          backgroundImage: `url(${tlink})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="recent_txt_div">
        <p className="p1">{RecentName}</p>
        <div className="div-ngang">
          <CiCalendar className="calendar" />
          <p className="p2">{RecentTime}</p>
        </div>
      </div>
    </div>
  );
};

export default RecentItem;
