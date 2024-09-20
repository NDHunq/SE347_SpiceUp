import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import Header from "../widget/top";
import NewStep from "./newStep/newStep";
import "./newRecipe.css";
import { Dropdown, Button, Space, message, ConfigProvider, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import NewIngredient from "./newIgredient/newIgredient";

const { TextArea } = Input;

const handleMenuClick = (e, setSelectedType) => {
  message.info(`Clicked on menu item: ${e.key}`);
  setSelectedType(e.item.props.children);
  console.log("click", e);
};

const menuProps = (setSelectedType) => ({
  items: [
    {
      label: "Vietnamese Food",
      key: "1",
    },
    {
      label: "Option 2",
      key: "2",
    },
    {
      label: "Option 3",
      key: "3",
    },
  ],
  onClick: (e) => handleMenuClick(e, setSelectedType),
});

function SingleRecipe() {
  const [ingredients, setIngredients] = useState([]);

  const handleDeleteIngredient = (id) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id !== id)
    );
  };
  const [steps, setSteps] = useState([]);
  const [value, setValue] = useState("");
  const [selectedType, setSelectedType] = useState("Type");

  const addNewStep = () => {
    setSteps([
      ...steps,
      {
        id: steps.length,
        component: (
          <NewStep
            txt={""}
            key={steps.length}
            id={steps.length}
            onDelete={deleteStep}
          />
        ),
      },
    ]);
  };

  const deleteStep = (id) => {
    setSteps((prevSteps) => {
      const newSteps = prevSteps.slice();
      newSteps.splice(id, 1);
      return newSteps.map((step, index) => ({
        ...step,
        id: index,
        component: (
          <NewStep
            text={step.txt}
            key={index}
            id={index}
            onDelete={deleteStep}
          />
        ),
      }));
    });
    message.success("Step deleted successfully");
  };

  const navItems = [
    { link: "/recipes", text: "Recipes" },
    { link: "/newrecipe", text: "New Recipe" },
  ];
  const [nameigre, setName] = useState("");
  const [quantityigre, setQuantity] = useState("");
  const [linkin, setLinkin] = useState("");
  const handlenewigredient = () => {
    setIngredients([
      ...ingredients,
      {
        id: ingredients.length,
        name: nameigre,
        quantity: quantityigre,
        tlinh: linkin,
      },
    ]);
  };
  const [coverImage, setCoverImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            hoverBorderColor: "#00B207",
            activeBorderColor: "#00B207",
            hoverBorderColor: "#00B207",
          },
        },
        token: {
          primaryColor: "#00B207",
          colorPrimaryActive: "#00B207",
          colorPrimaryHover: "#00B207",
        },
      }}
    >
      <div className="recipes">
        <Header navItems={navItems} />
        <main className="content">
          <div className="container">
            <div className="row">
              <div className="col-8 ">
                <p className="t_newrecipe">New Recipe</p>
                <p className="newtxt">Cover image</p>
                <div
                  className="coverImage"
                  onClick={triggerFileInput}
                  style={{ backgroundImage: `url(${coverImage})` }}
                >
                  {coverImage ? "" : "Click to add cover image"}
                </div>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                  accept="image/*"
                />
                <div className="flex3 ">
                  <div className="div11">
                    <p className="newtxt"> Name</p>
                    <Input placeholder="Name" />
                  </div>
                  <div className="flex4">
                    <div className="div13">
                      <p className="newtxt">Cooking time (min)</p>
                      <Input placeholder="Cooking time" />
                    </div>
                    <div className="div12">
                      <p className="newtxt">Type</p>
                      <Dropdown menu={menuProps(setSelectedType)}>
                        <Button>
                          <Space>
                            {selectedType}
                            <DownOutlined />
                          </Space>
                        </Button>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="newtxt">Description</div>
                <TextArea
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Describe your recipe"
                  autoSize={{
                    minRows: 3,
                    maxRows: 5,
                  }}
                />

                <div className="line topbotm"></div>
                <p className="t_newrecipe">Step</p>

                <div className="nstep-con">
                  {" "}
                  {steps.map((step) => step.component)}
                </div>
                <div className="addStep" onClick={addNewStep}>
                  <IoIosAdd className="add3"></IoIosAdd>
                </div>
                <br />
              </div>
              <div className="col  ">
                <div className="ccontainer margini">
                  <p className="t_newrecipe">Ingredients</p>
                  {ingredients.map((ingredient) => (
                    <NewIngredient
                      key={ingredient.id}
                      id={ingredient.id}
                      name={ingredient.name}
                      quantity={ingredient.quantity}
                      tlinh={ingredient.tlinh}
                      onDelete={handleDeleteIngredient}
                    />
                  ))}
                  <div className="line topbotm2"></div>
                  <div className="flex can">
                    {" "}
                    <p className="t_newrecipe">New Ingredient</p>
                    <div className="addd" onClick={handlenewigredient}>
                      <IoIosAdd className="add5"></IoIosAdd>
                    </div>
                  </div>

                  <div className=" gapp">
                    <Input
                      placeholder="Name"
                      value={nameigre}
                      onChange={(e) => setName(e.target.value)}
                    ></Input>
                    <Input
                      placeholder="Quantity"
                      value={quantityigre}
                      onChange={(e) => setQuantity(e.target.value)}
                    ></Input>
                  </div>

                  <Input
                    placeholder="Link (optional)"
                    className="gap"
                    value={linkin}
                    onChange={(e) => setLinkin(e.target.value)}
                  ></Input>
                </div>
                <div className="upload_btn width100">Upload</div>
                <br />
                <br />
              </div>
            </div>
          </div>
        </main>
      </div>
    </ConfigProvider>
  );
}

export default SingleRecipe;
