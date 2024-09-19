import "./LatestRecipe.scss";
import React from "react";
import { Link } from "react-router-dom";
import DisplayItem from "../Recipe/display_item/displayItem";

const LatestRecipe = (props) => {
  const listRecipe = [{ info: "bla bla" }, { info: "bla bla" }, {}];
  return (
    <div className="LR-container">
      <main className="main">
        <div className="container">
          <div className="sub-title">RECIPE</div>
          <div className="title">Latest Recipe</div>
          <div className="row">
            {listRecipe.map((item, index) => (
              <div key={index} className="col product">
                <DisplayItem
                  istrue={true}
                  ttime={140}
                  ttag={"Beverage"}
                  tby={"Admin"}
                  tcomments={65}
                  tname={"Smoothie xoài chuối kiwi"}
                  tlink={
                    "https://image.cooky.vn/recipe/g6/50880/s/cooky-recipe-637102372207865706.png"
                  }
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
