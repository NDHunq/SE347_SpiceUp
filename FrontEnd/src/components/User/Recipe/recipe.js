// Header.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./recipe.css";
import Header from "../widget/top";
import { ConfigProvider } from "antd";
import { LiaFilterSolid } from "react-icons/lia";
import FilterCategory from "./filter_drop_category/filter_category";
import { Pagination } from "antd";
import DisplayItem from "./display_item/displayItem";
import RecentItem from "./recent_Item/recent_item";
import { getAllRecipes } from "../../../services/userServices";
const onChange = (pageNumber) => {
  console.log("Page: ", pageNumber);
};
function Recipes({ search }) {
  const [searchInput, setSearchInput] = React.useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get("search");
    if (searchQuery) {
      setSearchInput(searchQuery);
      handleSearch();
    }
  }, []);
  const handleSearch = () => {};

  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate("/newrecipe");
  };

  const navItems = [{ link: "/recipes", text: "Recipes" }];
  const listCategory = [
    { name: "Cate1", number: 10, id: 1 },
    { name: "Cate2", number: 20, id: 2 },
    { name: "Cate3", number: 30, id: 3 },
    { name: "Cate4", number: 40, id: 4 },
    { name: "Cate5", number: 50, id: 5 },
    { name: "Cate6", number: 60, id: 6 },
    { name: "Cate7", number: 70, id: 7 },
    { name: "Cate8", number: 80, id: 8 },
    { name: "Cate9", number: 90, id: 9 },
    { name: "Cate10", number: 100, id: 10 },
  ];
  const listDisplay_pendingg = [
    // {
    //   id: "1234",
    //   istrue: true,
    //   ttime: 140,
    //   ttag: "Vietnamese Food",
    //   tby: "Admin",
    //   tcomments: 65,
    //   tname: "Trứng cuộn hàn quốc1",
    //   tlink:
    //     "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png",
    // },
    // {
    //   id: "1234",
    //   istrue: true,
    //   ttime: 140,
    //   ttag: "Vietnamese Food",
    //   tby: "Admin",
    //   tcomments: 65,
    //   tname: "Trứng cuộn Hàn Quốc2",
    //   tlink:
    //     "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png",
    // },
    // {
    //   id: "1234",
    //   istrue: true,
    //   ttime: 140,
    //   ttag: "Vietnamese Food",
    //   tby: "Admin",
    //   tcomments: 65,
    //   tname: "Trứng cuộn Hàn Quốc3",
    //   tlink:
    //     "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png",
    // },
    // {
    //   id: "1234",
    //   istrue: true,
    //   ttime: 140,
    //   ttag: "Vietnamese Food",
    //   tby: "Admin",
    //   tcomments: 65,
    //   tname: "Trứng cuộn Hàn Quốc4",
    //   tlink:
    //     "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png",
    // },
    // {
    //   id: "1234",
    //   istrue: true,
    //   ttime: 140,
    //   ttag: "Vietnamese Food",
    //   tby: "Admin",
    //   tcomments: 65,
    //   tname: "Trứng cuộn Hàn Quốc5",
    //   tlink:
    //     "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png",
    // },
    // {
    //   id: "1234",
    //   istrue: true,
    //   ttime: 140,
    //   ttag: "Vietnamese Food",
    //   tby: "Admin",
    //   tcomments: 65,
    //   tname: "Trứng cuộn Hàn Quốc6",
    //   tlink:
    //     "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png",
    // },
    // {
    //   id: "1234",
    //   istrue: true,
    //   ttime: 140,
    //   ttag: "Vietnamese Food",
    //   tby: "Admin",
    //   tcomments: 65,
    //   tname: "Trứng cuộn Hàn Quốc7",
    //   tlink:
    //     "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png",
    // },
    // {
    //   id: "1234",
    //   istrue: true,
    //   ttime: 140,
    //   ttag: "Vietnamese Food",
    //   tby: "Admin",
    //   tcomments: 65,
    //   tname: "Trứng cuộn Hàn Quốc8",
    //   tlink:
    //     "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png",
    // },
    // {
    //   id: "1234",
    //   istrue: true,
    //   ttime: 140,
    //   ttag: "Vietnamese Food",
    //   tby: "Admin",
    //   tcomments: 65,
    //   tname: "Trứng cuộn Hàn Quốc9",
    //   tlink:
    //     "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png",
    // },
    // {
    //   id: "1234",
    //   istrue: true,
    //   ttime: 140,
    //   ttag: "Vietnamese Food",
    //   tby: "Admin",
    //   tcomments: 65,
    //   tname: "Trứng cuộn Hàn Quốc10",
    //   tlink:
    //     "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png",
    // },
    // {
    //   id: "1234",
    //   istrue: true,
    //   ttime: 140,
    //   ttag: "Vietnamese Food",
    //   tby: "Admin",
    //   tcomments: 65,
    //   tname: "Trứng cuộn Hàn Quốc11",
    //   tlink:
    //     "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png",
    // },
    // {
    //   id: "1234",
    //   istrue: true,
    //   ttime: 140,
    //   ttag: "Vietnamese Food",
    //   tby: "Admin",
    //   tcomments: 65,
    //   tname: "Trứng cuộn Hàn Quốc12",
    //   tlink:
    //     "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png",
    // },
    // {
    //   id: "1234",
    //   istrue: true,
    //   ttime: 140,
    //   ttag: "Vietnamese Food",
    //   tby: "Admin",
    //   tcomments: 65,
    //   tname: "Trứng cuộn Hàn Quốc13",
    //   tlink:
    //     "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png",
    // },
    // {
    //   id: "1234",
    //   istrue: true,
    //   ttime: 140,
    //   ttag: "Vietnamese Food",
    //   tby: "Admin",
    //   tcomments: 65,
    //   tname: "Trứng cuộn Hàn Quốc14",
    //   tlink:
    //     "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png",
    // },
    // {
    //   id: "1234",
    //   istrue: true,
    //   ttime: 140,
    //   ttag: "Vietnamese Food",
    //   tby: "Admin",
    //   tcomments: 65,
    //   tname: "Trứng cuộn Hàn Quốc15",
    //   tlink:
    //     "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png",
    // },
    // {
    //   id: "1234",
    //   istrue: true,
    //   ttime: 140,
    //   ttag: "Vietnamese Food",
    //   tby: "Admin",
    //   tcomments: 65,
    //   tname: "Trứng cuộn Hàn Quốc16",
    //   tlink:
    //     "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png",
    // },
    // {
    //   id: "1234",
    //   istrue: true,
    //   ttime: 140,
    //   ttag: "Vietnamese Food",
    //   tby: "Admin",
    //   tcomments: 65,
    //   tname: "Trứng cuộn Hàn Quốc17",
    //   tlink:
    //     "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png",
    // },
    // {
    //   id: "1234",
    //   istrue: true,
    //   ttime: 140,
    //   ttag: "Vietnamese Food",
    //   tby: "Admin",
    //   tcomments: 65,
    //   tname: "Trứng cuộn Hàn Quốc18",
    //   tlink:
    //     "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png",
    // },
    // {
    //   id: "1234",
    //   istrue: true,
    //   ttime: 140,
    //   ttag: "Vietnamese Food",
    //   tby: "Admin",
    //   tcomments: 65,
    //   tname: "Trứng cuộn Hàn Quốc19",
    //   tlink:
    //     "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png",
    // },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [total_pages, setTotalPages] = useState(1);
  const [result, setResult] = useState(0);
  const [listDisplay_pending, setListDisplay_pending] = useState([]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    renderDisplayItems(page, 1);
  };
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipes = await getAllRecipes();
        //console.log("recipes", recipes);
        if (Array.isArray(recipes)) {
          setResult(recipes.length);
          setListDisplay_pending(recipes);
        } else {
          setListDisplay_pending([]);
          console.error("getAllRecipes() did not return an array");
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(listDisplay_pending.length / 8) * 10);
  }, [listDisplay_pending]);
  const renderDisplayItems = (page, row) => {
    const startIndex = (page - 1) * 8 + (row - 1) * 2;
    let itemsToRender = listDisplay_pending.slice(startIndex, startIndex + 2);
    return (
      <div style={{ display: "flex", gap: "20px" }}>
        {itemsToRender.map((item, index) => {
          let time = item.cookingTimeInSecond / 60;

          console.log("item", item);
          return (
            <DisplayItem
              key={index}
              id={item._id}
              istrue={item.istrue}
              ttime={time}
              ttag={item.type}
              tby={item.userId}
              tcomments={item.views}
              tname={item.recipeName}
              tlink={item.tlink}
            />
          );
        })}
      </div>
    );
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            activeBorderColor: "#00B207",
            hoverBorderColor: "#00B207",
            paddingBlock: 9,
          },
        },
        token: {
          colorPrimary: "#00B207",
        },
      }}>
      <div className="recipes">
        <Header navItems={navItems} />

        <main className="content">
          <div className="container">
            <div className="row ">
              <div className="col-4 cot1">
                <div className="col">
                  <div className="div1"></div>
                  <div className="div2">
                    <div className="filter_btn flex">
                      <p>Filter</p>
                      <LiaFilterSolid className="img"></LiaFilterSolid>
                    </div>
                  </div>
                  <hr className="line"></hr>
                  <div className="filter_content">
                    <FilterCategory
                      listname={"Recipe Types"}
                      listCategory={listCategory}></FilterCategory>
                    <hr className="line"></hr>
                    <p className="recenttxt">Recenty Saved</p>

                    <RecentItem
                      tname={"Smoothie xoài chuối kiwi"}
                      ttime={"Apr 25, 2024"}
                      tlink={
                        "https://file.hstatic.net/1000361915/article/sinh-to-chuoi-xoai-giam-can_9ad409cb707d438689515eeb643275ea.jpg"
                      }
                      id={"1234"}
                    />
                    <br />
                    <RecentItem
                      tlink={
                        "https://file.hstatic.net/1000361915/article/sinh-to-chuoi-xoai-giam-can_9ad409cb707d438689515eeb643275ea.jpg"
                      }
                      tname={"Smoothie xoài chuối kiwi trộn dâu tây Đà Lạt"}
                      ttime={"Apr 25, 2024"}
                      id={"1234"}
                    />
                    <br />
                    <RecentItem
                      tlink={
                        "https://file.hstatic.net/1000361915/article/sinh-to-chuoi-xoai-giam-can_9ad409cb707d438689515eeb643275ea.jpg"
                      }
                      tname={"Smoothie xoài chuối kiwi"}
                      ttime={"Apr 25, 2024"}
                      id={"1234"}
                    />
                  </div>
                </div>
              </div>
              <div className="space"></div>

              <div className="col cot2">
                <div className="div1">
                  <div className="search">
                    <input
                      type="text"
                      className="txt_search"
                      placeholder="Search"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}></input>

                    <div className="search_i2" onClick={handleSearch}>
                      <p className="txt_search2">Search</p>
                    </div>
                  </div>
                  <div className="upload_btn" onClick={handleUploadClick}>
                    Upload Recipe
                  </div>
                </div>
                <div className="div2">
                  <div className="flex">
                    <p className="txt_Sortby"> Sort by:</p>
                    <select className="sort-by">
                      <option value="latest"> Latest </option>
                      <option value="best-seller"> View </option>
                    </select>
                  </div>
                  <p className="txt2">
                    <span className="txt-bold txt2">{result}</span> Results
                    Found
                  </p>
                </div>
                <div className="display_row">
                  {renderDisplayItems(currentPage, 1)}
                </div>
                <div className="display_row">
                  {renderDisplayItems(currentPage, 2)}
                </div>
                <div className="display_row">
                  {renderDisplayItems(currentPage, 3)}
                </div>
                <div className="display_row">
                  {renderDisplayItems(currentPage, 4)}
                </div>

                <br />
                <Pagination
                  align="center"
                  defaultCurrent={1}
                  total={total_pages}
                  className="pagination"
                  onChange={handlePageChange}
                />
                <br />
                <br />
              </div>
            </div>
          </div>
        </main>
      </div>
    </ConfigProvider>
  );
}

export default Recipes;
