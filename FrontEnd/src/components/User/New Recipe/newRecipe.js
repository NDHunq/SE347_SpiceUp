import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import Header from "../widget/top";
import NewStep from "./newStep/newStep";
import "./newRecipe.css";
import { Dropdown, Button, Space, message, ConfigProvider, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import NewIngredient from "./newIgredient/newIgredient";
import {
  createStep,
  uploadImage,
  createRecipe,
  upload1Image,
} from "../../../services/userServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const handleMenuClick = (e, setSelectedType) => {
  //message.info(`Clicked on menu item: ${e.key}`);
  setSelectedType(e.item.props.children[0][1].props.children);
  //console.log("click", e.item.props.children[0][1].props.children);
};

const menuProps = (setSelectedType) => ({
  items: [
    {
      label: "Sauce",
      key: "1",
    },
    {
      label: "Dessert",
      key: "2",
    },
    {
      label: "Beverages",
      key: "3",
    },
    {
      label: "Snack",
      key: "4",
    },
    {
      label: "Soup",
      key: "5",
    },
    {
      label: "Baking",
      key: "6",
    },
    {
      label: "Breakfast",
      key: "7",
    },
    {
      label: "Lunch",
      key: "8",
    },
    {
      label: "Dinner",
      key: "9",
    },
    {
      label: "Salad",
      key: "10",
    },
    {
      label: "Vietnamese Food",
      key: "11",
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
  const [selectedType, setSelectedType] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const handleStepChange = (id, newValue) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === id ? { ...step, content: newValue } : step
      )
    );
  };
  const handleStepImageChange = (id, newValue) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === id ? { ...step, images: newValue } : step
      )
    );
  };
  const addNewStep = () => {
    setSteps([
      ...steps,
      {
        id: steps.length,
        content: "",
        images: [],
        component: (
          <NewStep
            txt={""}
            key={steps.length}
            id={steps.length}
            onDelete={deleteStep}
            onChange={handleStepChange}
            onImageChange={handleStepImageChange}
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
            onChange={handleStepChange}
            onImageChange={handleStepImageChange}
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
  const nav = useNavigate();

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
    setName("");
    setQuantity("");
    setLinkin("");
  };
  const [coverImage, setCoverImage] = useState(null);
  const [fileCoverImage, setFileCoverImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
      setFileCoverImage(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };
  const handleSubmit = async () => {
    if (
      !recipeName ||
      !cookingTime ||
      !selectedType ||
      !value ||
      !fileCoverImage ||
      steps.length === 0 ||
      ingredients.length === 0
    ) {
      toast.error("Please fill all fields");
      return;
    }
    //API upload cover image
    let coverImageId = await upload1Image(fileCoverImage);
    //API create step
    const stepsArr = await Promise.all(
      steps.map(async (step) => {
        const uploadedImages = await uploadImage(step.images);
        return {
          stepNumber: step.id + 1,
          description: step.content,
          image: uploadedImages,
        };
      })
    );
    console.log("stepsArr", stepsArr);
    let recipeIds = await createStep(stepsArr);
    const ingredientsArr = ingredients.map(({ name, quantity }) => ({
      name,
      quantity,
    }));
    const userId = localStorage.getItem("user_id");

    //API create recipe
    const data = {
      recipeName: recipeName,
      description: value,
      cookingTimeInSecond: cookingTime * 60,
      userId: userId,
      coverImageId: coverImageId,
      recipeIds: recipeIds,
      type: selectedType,
      ingredients: ingredientsArr,
    };
    console.log("data", data);

    let recipeId = await createRecipe(data);
    console.log("recipeId", recipeId);
    toast.success("Recipe created successfully");
    const url = `/singlerecipe?id=${recipeId}`;
    nav(url);
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
      }}>
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
                  style={{ backgroundImage: `url(${coverImage})` }}>
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
                    <Input
                      placeholder="Name"
                      value={recipeName}
                      onChange={(e) => setRecipeName(e.target.value)}
                    />
                  </div>
                  <div className="flex4">
                    <div className="div13">
                      <p className="newtxt">Cooking time (min)</p>
                      <Input
                        placeholder="Cooking time"
                        value={cookingTime}
                        onChange={(e) => setCookingTime(e.target.value)}
                      />
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
                      onChange={(e) => setName(e.target.value)}></Input>
                    <Input
                      placeholder="Quantity"
                      value={quantityigre}
                      onChange={(e) => setQuantity(e.target.value)}></Input>
                  </div>

                  <Input
                    placeholder="Link (optional)"
                    className="gap"
                    value={linkin}
                    onChange={(e) => setLinkin(e.target.value)}></Input>
                </div>
                <div className="upload_btn width100" onClick={handleSubmit}>
                  Upload
                </div>
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
