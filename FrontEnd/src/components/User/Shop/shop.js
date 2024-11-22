import React, {useEffect} from "react";
import Header from "../widget/top";
import { useState } from "react";
import { LiaFilterSolid } from "react-icons/lia";
import "./shop.css"
import FilterCategoryShop from "./filter_category_shop/filter_category_shop";
import '../Recipe/filter_drop_category/filter_category.css'
import { Slider , Dropdown, Menu ,Radio, Button, Pagination } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterRate from "./filter_rate/filter_rate";
import Product from "./product/product";
import HorizontalProduct from "./product/HorizontalProduct";
import instance from "../../../utils/axiosCustomize";

function Shop() {
  const [applyButtonColor, setApplyButtonColor] = useState("#00b207");
  const navItems=[{link:"/shop",text:"Shop"}];
  const [numFound, setNumFound]=useState(0);
  const [sort, setSort]=useState("Latest");
  const [range, setRange] = useState([0, 1000000]);
  const [openPrice, setOpenPrice] = useState(true);
  const [openRate, setOpenRate] = useState(true);
  const [selectedRating, setSelectedRating] = useState(0);
  const [productsFilter, setProductsFilter] = useState({
    sort: {
        field: "created_at",
        order: "desc"
    },
    category: null,
    price: null,
    average_ratings: null,
    product_name: null
  });
  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setProductsFilter(prev => ({...prev, product_name: search}));
    }
  }
  const handleSearch = (e) => {
    setProductsFilter(prev => ({...prev, product_name: search}));
  }

  // State for sale products
  const [saleProducts, setSaleProducts] = useState([]);

  // State for products
  const [products, setProducts] = useState([]);

  // State for pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [totalPages, setTotalPages] = useState(0);
  const onChangePage = (page) => {
    setPage(page);

    const fetchData = async () => {
      try {
        const response = await instance.post(`api/v1/product/filter?page=${page}&limit=${limit}`);
        setProducts(response.data.data.products);
      }
      catch (error){
        console.log(error);
      }
    }

    fetchData();
  };


  const ratings = [0, 1, 2, 3, 4, 5];

  const handleMenuClick = (e) => {
    setSort(e.key);
    if (e.key === "Latest") {
      setProductsFilter(prev => ({...prev, sort: {field: "created_at", order: "desc"}}));
    }
    else {
      setProductsFilter(prev => ({...prev, sort: {field: "created_at", order: "asc"}}));
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Latest">
        Latest
      </Menu.Item>
      <Menu.Item key="Oldest">
        Oldest
      </Menu.Item>
    </Menu>
  );
  const handleRadioChange = (e) => {
    setSelectedRating(e.target.value);
    setProductsFilter(prev => ({...prev, average_ratings: e.target.value}));
  };
  const onChangeRangePrice = (newRange) => {
    setRange(newRange);
  };

  useEffect(() => {
    console.log(productsFilter);
    const fetchData = async () => {
      try {
        setPage(1);
        setLimit(9);
        const response = await instance.post(`api/v1/product/filter?page=${page}&limit=${limit}`, productsFilter);
        setProducts(response.data.data.products);
        setTotalPages(response.data.data.total);
        setNumFound(response.data.data.total);
      }
      catch (error){
        console.log(error);
      }
    }

    fetchData();
  }, [productsFilter]);

  const onClickSort = (condition) =>{
    if(condition===sort)
      return;
    // call api
    switch(condition){
      case "Latest":
        break;
      case "Oldest":
        break;  
    };
    setSort(condition);
  }
  const [listCategory, setListCategory] = useState([{
    name: "All",
    id: "all",
    number: 0
  }]);

  useEffect(() => {
    // Call API to get products and sale products
    const fetchData = async () => {
      try {
        setPage(1);
        setLimit(9);
        let filter = {
          sort: {
            field: "discount",
            order: "desc"
          }
        };
        const saleResponse = await instance.post(`api/v1/product/filter?page=1&limit=3`, filter);
        setSaleProducts(saleResponse.data.data.products);

        const response = await instance.post(`api/v1/product/filter?page=${page}&limit=${limit}`);
        setProducts(response.data.data.products);
        setTotalPages(response.data.data.total);
        setNumFound(response.data.data.total);

        const categoryResponse = await instance.get(`api/v1/category`);
        setListCategory([{
            name: "All",
            id: "all",
            number: `${categoryResponse.data.data.reduce((acc, category) => acc + category.product_count, 0)}`
        }])
        setListCategory(prevState => [
          ...prevState,
          ...categoryResponse.data.data.map(category => ({
            name: category.category_name,
            id: category._id,
            number: category.product_count
          }))
        ]);
      }
      catch (error){
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const handleCategoryChange = (category_id) => {
    setProductsFilter(prev => ({...prev, category: category_id}));
  }

  const handlePriceClick = () => {
    setProductsFilter(prev => ({...prev, price: range}));
  }

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
                  <FilterCategoryShop
                    listname={"All Categories"}
                    listCategory={listCategory}
                    onCategoryChange={handleCategoryChange}
                  ></FilterCategoryShop>
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
                          max={1000000}
                          step={1000}
                          defaultValue={range}
                          onChange={onChangeRangePrice}
                        />
                        <p>Price: đ {range[0]} - đ {range[1]}</p>
                        <Button type="primary"
                                style={{backgroundColor: `${applyButtonColor}`, width: 100}}
                                onMouseOver={() => setApplyButtonColor("#33c934")}
                                onMouseLeave={() => setApplyButtonColor("#00b207")}
                                onClick={handlePriceClick}>
                          Apply
                        </Button>
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
                    {saleProducts.map(product => (
                      <div className="product-sale-container" key={product._id}>
                        <HorizontalProduct
                          id={product._id}
                          urls_img={product.product_images}
                          price={product.price}
                          name={product.product_name}
                          discount={product.discount}
                          average_rating={product.average_ratings}
                          review_count={product.review_count}
                          product_status={product.product_status}
                          description={product.description}
                          value={product.value}
                          category={product.category}
                          stock={product.stock}
                          brand={product.brand}
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
                    value={search}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                  ></input>

                  <div className="search_i2" onClick={handleSearch}>
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

              { products.map(product => (
                <div className="col-md-4 mb-4" key={product._id}>
                  <Product
                      id={product._id}
                      urls_img={product.product_images}
                      price={product.price}
                      name={product.product_name}
                      discount={product.discount}
                      average_rating={product.average_ratings}
                      review_count={product.review_count}
                      product_status={product.product_status}
                      description={product.description}
                      value={product.value}
                      category={product.category}
                      stock={product.stock}
                      sold={product.sold}
                      brand={product.brand}
                  />
                </div>
              ))}
            </div >
            <div className="pagination-container">
              <Pagination current={page} pageSize={limit} onChange={onChangePage} total={totalPages} />
            </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Shop;
