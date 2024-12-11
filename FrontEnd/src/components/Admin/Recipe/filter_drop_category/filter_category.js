import React, { useState } from "react";
import "./filter_category.css";
import { Radio } from "antd";
import { RiArrowDropDownLine } from "react-icons/ri";
function FilterCategory({ listname, listCategory }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isRotated, setIsRotated] = useState(true);
  const Name = listname;
  const [selectedCategory, setSelectedCategory] = useState(1);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsRotated(!isRotated);
  };
  const onChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <div className="flex">
        <p className="txt">{Name}</p>
        <div
          onClick={toggleDropdown}
          className={`img_frame ${isRotated ? "rotated" : ""}`}>
          <RiArrowDropDownLine className="img"></RiArrowDropDownLine>
        </div>
      </div>

      <div className={`dropdown-list ${isOpen ? "open" : ""}`}>
        <ul className="ul">
          <Radio.Group
            value={selectedCategory}
            onChange={onChange}
            className="selectedCategory">
            {listCategory.map((category) => (
              <div key={category.name} className="category">
                <Radio
                  key={category.name}
                  value={category.id}
                  className="category_radi">
                  <div htmlFor={category.name} className="category_labe">
                    <p className="category_name">{category.name}</p>
                    <p className="category_number">&nbsp;</p>
                  </div>
                </Radio>
              </div>
            ))}
          </Radio.Group>
        </ul>
      </div>
    </div>
  );
}

export default FilterCategory;
