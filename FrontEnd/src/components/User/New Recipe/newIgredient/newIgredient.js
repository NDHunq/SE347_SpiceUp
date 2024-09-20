import React, { useState, useRef } from "react";
import "./newIgredient.css";
import { FaLink } from "react-icons/fa";
import { useEffect } from "react";
import { Input } from "antd";
const NewIngredient = ({ id, name, quantity, tlinh, colink, onDelete }) => {
  const [ccolink, setColink] = useState(true);
  const [link, setLink] = useState(tlinh);

  const handleaddlink = () => {
    setColink(!ccolink);
    setLink("");
  };
  const handlelink = () => {
    setColink(!ccolink);
    setLink("");
  };

  const handleDelete = () => {
    onDelete(id);
  };
  useEffect(() => {
    if (tlinh === "") {
      setColink(false);
    } else {
      setColink(true);
    }
  }, [tlinh]);
  return (
    <div className=" padding10">
      <div className="flex alcen ">
        <p className="igre_name">{name}</p>
        <div className="flex">
          <p className="igre_name">{quantity}</p>
          <div className="tru_con" onClick={handleDelete}>
            {" "}
            <div className="tru"></div>
          </div>
        </div>
      </div>
      {ccolink ? (
        <div className="link">
          <FaLink className="linkicon"></FaLink>
          <input
            className="inputlink"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          ></input>
          <div className="cancell" onClick={handleaddlink}>
            X
          </div>
        </div>
      ) : (
        <div className="addlink" onClick={handlelink}>
          +Add link
        </div>
      )}
    </div>
  );
};

export default NewIngredient;
