import "./LatestRecipe.scss";
import React from "react";
import { Link } from "react-router-dom";

const LatestRecipe = (props) => {
  return (
    <div className="LR-container">
      <main className="main">
        <div className="container">
          <div>RECIPE</div>
          <div className="title">Latest Recipe</div>
          <div className="row">
            <div className="col product1">111111111</div>
            <div className="col product2">2222222222</div>
            <div className="col product3">333333333333</div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default LatestRecipe;
