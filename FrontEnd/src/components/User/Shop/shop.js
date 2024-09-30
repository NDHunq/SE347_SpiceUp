import React from "react";
import Header from "../widget/top";
import { useState } from "react";
import { LiaFilterSolid } from "react-icons/lia";
import "./shop.css"
import FilterCategory from "../Recipe/filter_drop_category/filter_category";
import '../Recipe/filter_drop_category/filter_category.css'
import { Slider , RadioGroup,Radio, Rate,Pagination} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterRate from "./filter_rate/filter_rate";
import Product from "./product/product";
import HorizontalProduct from "./product/HorizontalProduct";

function Shop() {
  const navItems=[{link:"/shop",text:"Shop"}];
  const [numFound, setNumFound]=useState(0);
  const [sort, setSort]=useState("Lastest");
  const [range, setRange] = useState([20, 50]); 
  const [openPrice, setOpenPrice] = useState(true);
  const [openRate, setOpenRate] = useState(true);
  const [selectedRating, setSelectedRating] = useState(null);
  const [current, setCurrent] = useState(1);

  const ratings = [1, 2, 3, 4, 5];
  const onChangePage = (page) => {
    console.log(page);
    setCurrent(page);
  };

  const handleRadioChange = (e) => {
    setSelectedRating(e.target.value);
  }; 
  const onChangeRangePrice = (newRange) => {
    setRange(newRange);
  };

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
  const listCategory = [
    { name: "All", number: 30 },
    { name: "Vegetable", number: 20 },
    { name: "Meat", number: 10 },
  ];

  const listProduct=[
    { 
      id:"1234567890",
      url_img:['https://img.icons8.com/ios-filled/50/bag-front-view.png','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg'],
      name:'Cabage',
      price:100
    },
    { 
      id:"1234567890",
      url_img:['https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg'],
      name:'Cabage',
      price:100
    },
    { 
      id:"1234567890",
      url_img:['https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg'],
      name:'Cabage',
      price:100
    },
    { 
      id:"1234567890",
      url_img:['https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg'],
      name:'Cabage',
      price:100
    },
    { 
      id:"1234567890",
      url_img:['https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg'],
      name:'Cabage',
      price:100
    },
    {
      id:"1234567890",
      url_img:['https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg'],
      name:'Cabage',
      price:100
    },
    {
      id:"1234567890",
      url_img:['https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg'],
      name:'Cabage',
      price:100}
  ]

  const listProductSale=[
    { 
      id:"1234567890",
      urls_img:['https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg'],
      name:'Cabage',
      price:100
    },
    {
      id:"1234567890",
      urls_img:['https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg'],
      name:'Cabage',
      price:100
    },
    {
      id:"1234567890",
      urls_img:['https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg','https://i.pinimg.com/236x/26/85/39/268539e5792053cf0d707ffdaef14081.jpg'],
      name:'Cabage',
      price:100
    }
  ]
  return (
    <div className="shop">
      <Header navItems={navItems}/>
      <main className="content">
        <div className="container">
          <div className="row ">
            <div className="col-3">
              <div className="col">
                  <div className="filter">
                    <b>Filter</b>
                    <LiaFilterSolid className="img"></LiaFilterSolid>
                  </div>
                  <FilterCategory
                    listname={"All Categories"}
                    listCategory={listCategory}
                  ></FilterCategory>
                   <hr/> 
                  <div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                        <button class="accordion-button" 
                          onClick={()=>{setOpenPrice(!openPrice)}}
                          type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne"
                          >
                            <div class="container-button">
                              <b >Price</b>
                              <span class="expand">
                              {openPrice ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/>
                              </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                </svg>
                              )}
                              </span>
                            </div>
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div class="accordion-body">
                          <Slider
                            range={{
                              draggableTrack:true,
                            }}
                            class="custome0slider"
                            min={0}
                            max={250}
                            defaultValue={range}
                            onChange={onChangeRangePrice}
                            />  
                            <p>Price: {range[0]}-{range[1]}</p>
                        </div>
                      </div>
                    </div>
                    <hr/>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                        <button class="accordion-button" 
                          onClick={()=>{setOpenRate(!openRate)}}
                          type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne"
                          >
                            <div class="container-button">
                              <b >Rating</b>
                              <span class="expand">
                              {openRate ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/>
                              </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                </svg>
                              )}
                              </span>
                            </div>

                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div class="accordion-body">
                          <div className="rate-container">
                              <Radio.Group onChange={handleRadioChange} value={selectedRating}>
                                  {ratings.map(star => (
                                    <div key={star} className="rate-radio-item">
                                      <Radio value={star}>
                                        <FilterRate star={star} />
                                      </Radio>
                                    </div>
                                  ))}
                              </Radio.Group>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <img class="sale-pic"src="https://img.freepik.com/free-vector/flat-design-food-sale-banner_23-2149138014.jpg"/>
                  <div>
                    <b >Sales Products</b>
                    {listProductSale.map(product => (
                      <div className="product-sale-container" key={product.id}>
                        <HorizontalProduct
                          id={product.id}
                          urls_img={product.urls_img}
                          price={product.price}
                          name={product.name}
                        />
                      </div>
                    ))}
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
              </div>
              <div className="search-bar d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center"> 
                  <p className="textSort">Sort by:</p>
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
                  <b>{numFound}</b> <span>Result Found</span>
                </div>
              </div>
              <div className="row product-area">
              {listProduct.map(product => (
                <div className="col-md-4 mb-4" key={product.id}>
                  <Product
                    id={product.id}
                    urls_img={product.url_img}
                    price={product.price}
                    name={product.name}
                  />
                </div>
              ))}
            </div >
            <div className="pagination-container">
              <Pagination onChange={onChangePage} total={50} />
            </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Shop;
