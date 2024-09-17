// Header.js
import React from "react";
import "./recipe.css";
import Header from "../widget/top";
import { LiaFilterSolid } from "react-icons/lia";

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
                <div className="div2">
                  <div className="filter_btn flex">
                    <p>Filter</p>
                    <LiaFilterSolid className="img"></LiaFilterSolid>
                  </div>
                </div>
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
                <div className="flex">
                  <p className="txt">Sort by:</p>
                  <select className="sort-by">
                    <option value="latest"> Latest </option>
                    <option value="best-seller"> Best Seller </option>
                    <option value="best-discount"> Hot Deal </option>
                    <option value="best-discount"> Rate </option>
                  </select>
                </div>
                <p className="txt2">
                  <span className="txt-bold txt2">52</span> Results Found
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Recipes;
