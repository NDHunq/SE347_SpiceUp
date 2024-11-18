import React from "react";
import Header from "../widget/top";
import { useState } from "react";
import { LiaFilterSolid } from "react-icons/lia";
import "./shop.css"
import FilterCategory from "../Recipe/filter_drop_category/filter_category";
import '../Recipe/filter_drop_category/filter_category.css'
import { Slider , Dropdown, Menu ,Radio, Button,Pagination} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
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

  const handleMenuClick = (e) => {
    setSort(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Lastest">
        Lastest
      </Menu.Item>
      <Menu.Item key="Oldest">
        Oldest
      </Menu.Item>
    </Menu>
  );
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
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingPrice">
                      <button
                        className="accordion-button"
                        onClick={() => setOpenPrice(!openPrice)}
                        type="button"
                        aria-expanded={openPrice}
                        aria-controls="panelsStayOpen-collapsePrice"
                      >
                        <div className="container-button">
                          <b>Price</b>
                          <span className="expand">
                            {openPrice ?  <UpOutlined /> : <DownOutlined />}
                          </span>
                        </div>
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapsePrice"
                      className={`accordion-collapse collapse ${openPrice ? "show" : ""}`}
                      aria-labelledby="panelsStayOpen-headingPrice"
                    >
                      <div className="accordion-body">
                        <Slider
                          range={{
                            draggableTrack: true,
                          }}
                          className="custom-slider"
                          min={0}
                          max={250}
                          defaultValue={range}
                          onChange={onChangeRangePrice}
                        />
                        <p>Price: {range[0]} - {range[1]}</p>
                      </div>
                    </div>
                  </div>
                    <hr/>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                        <button
                          className="accordion-button"
                          onClick={() => setOpenRate(!openRate)}
                          type="button"
                          aria-expanded={openRate}
                          aria-controls="panelsStayOpen-collapseTwo"
                        >
                          <div className="container-button">
                            <b>Rating</b>
                            <span className="expand">
                            {openRate ?  <UpOutlined /> : <DownOutlined />}
                            </span>
                          </div>
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseTwo"
                        className={`accordion-collapse collapse ${openRate ? "show" : ""}`}
                        aria-labelledby="panelsStayOpen-headingOne"
                      >
                        <div className="accordion-body">
                          <div className="rate-container">
                            <Radio.Group onChange={handleRadioChange} value={selectedRating}>
                              {ratings.map((star) => (
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
                <Dropdown overlay={menu} className="marginL8px">
                  <Button>
                    {sort} <span className="anticon anticon-down" /><DownOutlined />
                  </Button>
                </Dropdown>
              </div>
                <div className="numberFound ">
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
