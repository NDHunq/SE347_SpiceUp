// Header.js
import React from "react";
import "./recipe.css";
import Header from "../widget/top";

function Recipes() {
  const navItems = [{ link: "/recipes", text: "Recipes" }];
  return (
    <div className="recipes">
      <Header navItems={navItems} />

      <main className="content">
        <div className="container">
          <div className="row ">
            <div className="col-3">
              <div className="col">
                <div className="div1"></div>
                <div className="div2"></div>
              </div>
            </div>
            <div className="col">
              <div className="div1">
                <div className="search">
                  <input
                    type="text"
                    className="txt_search"
                    placeholder="Search"
                  ></input>

                  <div className="search_i2">
                    <p className="txt_search2">Search</p>
                  </div>
                </div>
                <div className="upload_btn">Upload Recipe</div>
              </div>
              <div className="div2">
                <p className="txt">Sort by:</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Recipes;
