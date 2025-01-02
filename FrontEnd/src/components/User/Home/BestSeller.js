import "./BestSeller.scss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopProducts } from "../../../services/userServices";
import Product from "../Shop/product/product";
import instance from "../../../utils/axiosCustomize";
import HorizontalProduct from "../Shop/product/HorizontalProduct";

const BestSeller = (props) => {
  const [imageList, setImageList] = useState([])
  const [bestSellerProducts, setBestSellerProducts] = useState([])
  const [hotDeals, setHotDeals] = useState([])
  const [topRated, setTopRated] = useState([])
  //et bestSellerProducts=[]

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

    const getDataArray = async () => {
      debugger;
      const response = await getTopProducts(3, "sold", "desc")
      setBestSellerProducts(response.data.data.products)
      console.log(response.data.data.products)

      let imageArray = []
      for (let i = 0; i < response.data.data.products.length; i++) {
        imageArray.push(await getImage(response.data.data.products[i].product_images[0]))
      }

      setImageList(imageArray)
    }


    getDataArray()
  }, [])

  useEffect(() => {

    const getDataArray = async () => {
      debugger;
      const response = await getTopProducts(3, "price", "asc")
      setHotDeals(response.data.data.products)
      console.log(response.data.data.products)

    }


    getDataArray()
  }, [])

  useEffect(() => {

    const getDataArray = async () => {
      debugger;
      const response = await getTopProducts(3, "average_ratings", "desc")
      setTopRated(response.data.data.products)
      console.log(response.data.data.products)

    }


    getDataArray()
  }, [])



  return (
    <div className="B-container">
      <main className="main">
        <div className="container ad-container">
          <div className="row">
            <div className="col ">
              <div className=" product1">
                <div className="sub-title">100% Organic</div>
                <div className="title">Fruit & Vegetable</div>
                <div className="price">
                  Starting at: <span className="pricee">$5.99</span>
                </div>
                <Link to="/shop">
                  {" "}
                  <div className="shop-now">Shop now</div>
                </Link>
              </div>
            </div>
            <div className="col ">
              {" "}
              <div className=" product2">
                {" "}
                <div className="sub-title">SALE OF THE WEEK</div>
                <div className="title">Sales of the Year</div>
                <div className="day">19/09/2024 - 26/09/2024</div>
                <Link to="/shop">
                  {" "}
                  <div className="shop-now">Shop now</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container product-container">
          <div className="title"> Best Seller Products</div>
          <div className="row list-pro">
            {
              bestSellerProducts.length === 0 ?
                <>
                  <div className="col product2">2222222222</div>
                  <div className="col product2">2222222222</div>
                  <div className="col product3">333333333333</div>
                  <div className="col product4">4444444444</div>
                  <div className="col product5">4444444444</div>
                </>

                :
                bestSellerProducts.map((product, index) => (
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
                ))

            }


          </div>
        </div>
        <div className="container detail-container">
          <div className="row">
            <div className="col product">
              <div className="title">Hot Deals</div>
              <div className="list-pro">
                {hotDeals.length === 0
                  ?
                  <>

                    <div className="col product2">2222222222</div>
                    <div className="col product2">2222222222</div>
                    <div className="col product3">333333333333</div>
                  </>
                  :

                  hotDeals.map((product, index) => (
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
                      sold={product.sold}
                      brand={product.brand}
                    />
                  ))



                }
              </div>
            </div>
            <div className="col product">
              <div className="title">Best Seller</div>
              <div className="list-pro">
              {bestSellerProducts.length === 0
                  ?
                  <>

                    <div className="col product2">2222222222</div>
                    <div className="col product2">2222222222</div>
                    <div className="col product3">333333333333</div>
                  </>
                  :

                  bestSellerProducts.map((product, index) => (
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
                      sold={product.sold}
                      brand={product.brand}
                    />
                  ))



                }
              </div>
            </div>
            <div className="col product">
              <div className="title">Top Rated</div>
              <div className="list-pro">
              {topRated.length === 0
                  ?
                  <>

                    <div className="col product2">2222222222</div>
                    <div className="col product2">2222222222</div>
                    <div className="col product3">333333333333</div>
                  </>
                  :

                  topRated.map((product, index) => (
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
                      sold={product.sold}
                      brand={product.brand}
                    />
                  ))



                }
              </div>
            </div>
            <div className="col product4">
              <div className="text-1">HOT SALE</div>
              <div className="text-2">
                <strong>Save 27%</strong> on
              </div>
              <div className="text-2 text-2-1">Every Order</div>
              <Link to="/shop">
                {" "}
                <div className="shop-now">Shop now</div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default BestSeller;
