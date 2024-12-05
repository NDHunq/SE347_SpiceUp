import React, { useEffect } from "react";

import { ConfigProvider } from "antd";
import { Pagination } from "antd";

import "./myrecipe.css";
import SaveItem from "./SaveItem/SaveItem";

import { Link } from "react-router-dom";
import {
  getReicpeByUser,
  getSavedRecipe,
  getImage,
} from "../../../../../services/userServices";
const MyRecipe = () => {
  const [saveItems, setSaveitems] = React.useState([]);
  const [myItems, setMyitems] = React.useState([]);
  const userId = "66f6cd4a06a448abe23763e0";
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getReicpeByUser(userId);

        const myItems = [];
        for (const saveitem of response.data) {
          const url = await getImage(saveitem.coverImageId);
          const item = {
            id: saveitem._id,
            name: saveitem.recipeName,
            image: url,
          };
          myItems.push(item);
        }
        setMyitems(myItems);
        const response2 = await getSavedRecipe(userId);

        const saveItems = [];
        for (const saveitem of response2.data) {
          const url = await getImage(saveitem.coverImageId);
          const item = {
            id: saveitem._id,
            name: saveitem.recipeName,
            image: url,
          };
          saveItems.push(item);
        }
        setSaveitems(saveItems);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            activeBorderColor: "#00B207",
            hoverBorderColor: "#00B207",
            paddingBlock: 9,
          },
        },
        token: {
          colorPrimary: "#00B207",
        },
      }}
    >
      <div className="ccontainer">
        <p className="txtnacc txtna2">Saved Recipes</p>
        <div className="linee"> </div>
        <div>
          <div className="srecipe_container">
            {saveItems.length === 0 && <p>No Recipe</p>}
            {saveItems.map((item) => (
              <SaveItem
                key={item.id}
                imagelink={item.image}
                issave={true}
                istrue={true}
                name={item.name}
                id={item.id}
              />
            ))}
          </div>
          <Pagination
            align="center"
            defaultCurrent={1}
            total={saveItems.length * 10}
          />
          <br />
        </div>
      </div>
      <div className="ccontainer">
        <div className="flex cao1ti">
          {" "}
          <p className="txtnacc txtna2">My Recipes</p>
          <Link to="/newrecipe">
            {" "}
            <div className=" tinhchinh">Upload</div>
          </Link>
        </div>

        <div className="linee"> </div>
        <div>
          <div className="srecipe_container">
            {myItems.length === 0 && <p>No Recipe</p>}
            {myItems.map((item) => (
              <SaveItem
                key={item.id}
                imagelink={item.image}
                issave={false}
                istrue={true}
                name={item.name}
                id={item.id}
              />
            ))}
          </div>
          <Pagination
            align="center"
            defaultCurrent={1}
            total={myItems.length * 10}
          />
          <br />
        </div>
      </div>
      <br />

      <br />
      <br />
      <br />
    </ConfigProvider>
  );
};

export default MyRecipe;
