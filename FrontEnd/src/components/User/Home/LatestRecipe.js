import "./LatestRecipe.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DisplayItem from "../Recipe/display_item/displayItem";
import { getLastestRecipe } from "../../../services/userServices";
import instance from "../../../utils/axiosCustomize";
const LatestRecipe = (props) => {

  const [lastestRecipes, setLastestRecipes] = useState([])
  const [imageList, setImageList] = useState([])

  const getImage = async (id) => {
    const apiEndPoint = `http://localhost:5000/api/v1/image/${id}`

    const res = await instance.get(apiEndPoint, {
      responseType: 'arraybuffer'
    })

    const blob = new Blob([res.data], { type: `${res.headers["content-type"]}` });
    const url = URL.createObjectURL(blob);
    return url
  }
  useEffect(() => {

    
    const getArrayData = async () => {

      const response = await getLastestRecipe(1, 3)
      setLastestRecipes(response.data.recipes)

      //console.log(response.data.recipes);

      let imageArray = []
      for (let i = 0; i < response.data.recipes.length; i++) {
        imageArray.push(await getImage(response.data.recipes[i].coverImageId))
      }

      setImageList(imageArray)
    }

    getArrayData()

  }, [])
  const listRecipe = [{ info: "bla bla" }, { info: "bla bla" }, {}];
  return (
    <div className="LR-container">
      <main className="main">
        <div className="container">
          <div className="sub-title">RECIPE</div>
          <div className="title">Latest Recipe</div>
          <div className="row">
            {lastestRecipes.map((item, index) => (
              <div key={index} className="col product">
                <DisplayItem
                  istrue={true}
                  ttime={`${item.cookingTimeInSecond / 60}`}
                  ttag={item.type}
                  tby={`${item.userId.firstname} ${item.userId.lastname}`}
                  tcomments={item.views}
                  tname={item.recipeName}
                  tlink={
                    imageList[index]
                  }
                  id={item._id}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
export default LatestRecipe;
