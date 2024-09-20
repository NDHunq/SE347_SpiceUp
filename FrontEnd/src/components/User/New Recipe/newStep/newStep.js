import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import "./newStep.css";
import { Input } from "antd";

const { TextArea } = Input;

const NewStep = ({ id, onDelete, txt }) => {
  let image = 0;
  const [value, setValue] = useState(txt || "");
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    if (images.length < 5) {
      const files = Array.from(event.target.files);
      const imageUrls = files.map((file) => URL.createObjectURL(file));
      setImages((prevImages) => [...prevImages, ...imageUrls]);
    } else {
      alert("You can only upload up to 5 images.");
    }
  };

  const triggerFileInput = () => {
    document.getElementById(`fileInput-${id}`).click();
  };
  const handleImageDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="step_containerr">
      <div className="new_stepp">
        <div>
          <div className="step_icon">{id + 1}</div>
          <div className="xoa" onClick={() => onDelete(id)}>
            <MdDelete />
          </div>
        </div>
        <div className="step_input">
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Content"
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
          />
          <div className="step_img">
            <div className="fleximg">
              {images.map((image, index) => (
                <div
                  key={index}
                  style={{ backgroundImage: `url(${image})` }}
                  alt={`Selected ${index}`}
                  className="selectedImage"
                >
                  <div
                    className="deleteIcon"
                    onClick={() => handleImageDelete(index)}
                  >
                    <p className="x">X</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="new_image" onClick={triggerFileInput}>
              <FaCamera className="camerapicture2" />
              <IoIosAdd className="add2" />
            </div>
            <input
              type="file"
              id={`fileInput-${id}`}
              style={{ display: "none" }}
              onChange={handleImageChange}
              accept="image/*"
              multiple
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewStep;
