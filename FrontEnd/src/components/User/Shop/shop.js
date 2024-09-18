import React from "react";
import { Dropdown } from "bootstrap";
import Header from "../widget/top";
import { useState } from "react";
import "./shop.css"

function Shop() {
  const navItems=[{link:"/shop",text:"Shop"}];
  const [numFound, setNumFound]=useState(0);
  const [sort, setSort]=useState("Lastest");

  const onClickSort = (condition) =>{
    if(condition===sort)
      return;
    // call api
    switch(condition){
      case "Lastest":
        break;
      case "Oldest":
        break;  
    };
    setSort(condition);
  }
  return (
    <div className="shop">
      <Header navItems={navItems}/>
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
              </div>
              <div className="search-bar d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center"> 
                  <p className="txt textSort">Sort by:</p>
                  <div class="btn-group">
                    <button type="button" class="sort btn btn-outline-secondary-sm dropdown-toggle" id="ddbSort" data-bs-toggle="dropdown" aria-expanded="false">
                      {sort}
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#" onClick={()=>onClickSort("Lastest")} >Lastest</a></li>
                      <li><a class="dropdown-item" href="#" onClick={()=>onClickSort("Oldest")} >Oldest</a></li>
                    </ul>
                  </div>
                </div>
                <div class="numberFound ">
                  <b>{numFound}</b> <span className="txt">Result Found</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Shop;
