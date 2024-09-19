import React, { useState } from "react";
import "./filter_category.css";
import { RiArrowDropDownLine } from "react-icons/ri";
function FilterCategory({ listname, listCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const Name = listname;
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsRotated(!isRotated);
  };

  return (
    <div>
      <div className="flex">
        <p className="txt">{Name}</p>
        <div
          onClick={toggleDropdown}
          className={`img_frame ${isRotated ? "rotated" : ""}`}
        >
          <RiArrowDropDownLine className="img"></RiArrowDropDownLine>
        </div>
      </div>

      <div className={`dropdown-list ${isOpen ? "open" : ""}`}>
        <ul className="ul">
          {listCategory.map((category) => (
            <div key={category.name} className="category">
              <input
                type="radio"
                id={category.name}
                name="category"
                value={category.name}
                className="category_radio"
              />
              <label htmlFor={category.name} className="category_label">
                <p className="category_name">{category.name}</p>
                <p className="category_number">{"(" + category.number + ")"}</p>
              </label>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FilterCategory;
