import React, { useEffect, useState } from "react";
//import { useLocation } from "react-router-dom";
import "../../Recipe/filter_drop_category/filter_category.css";
import { Radio } from "antd";
import { RiArrowDropDownLine } from "react-icons/ri";

function FilterCategoryShop(props) {
    // const location = useLocation();
    // useEffect(() => {
    //     debugger;
    //     if (location.state?.selectedCategory) {
    //         setSelectedCategory(location.state.selectedCategory);
    //         props.onCategoryChange(location.state.selectedCategory);
    //       }
    // }, [location.state]);
    const [isOpen, setIsOpen] = useState(true);
    const [isRotated, setIsRotated] = useState(true);
    const Name = props.listname;
    const [selectedCategory, setSelectedCategory] = useState("all");
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setIsRotated(!isRotated);
    };
    const onChange = (e) => {
        debugger;
        setSelectedCategory(e.target.value);
        props.onCategoryChange(e.target.value);
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
                    <Radio.Group
                        value={selectedCategory}
                        onChange={onChange}
                        className="selectedCategory"
                    >
                        {props.listCategory.map((category) => (
                            <div key={category.name} className="category">
                                <Radio
                                    key={category.name}
                                    value={category.id}
                                    className="category_radi"
                                >
                                    <div htmlFor={category.name} className="category_labe">
                                        <p className="category_name">{category.name}</p>
                                        <p className="category_number">
                                            &nbsp;
                                            {"   (" + category.number + ") "}
                                        </p>
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

export default FilterCategoryShop;
