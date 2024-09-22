// Header.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./recipe.css";
import Header from "../widget/top";
import { ConfigProvider } from "antd";
import { LiaFilterSolid } from "react-icons/lia";
import FilterCategory from "./filter_drop_category/filter_category";
import { Pagination } from "antd";
import DisplayItem from "./display_item/displayItem";
import RecentItem from "./recent_Item/recent_item";
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
      handleSearch(searchQuery);
    }
  }, []);
  const handleSearch = (searchQuery) => {};

  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate("/newrecipe");
  };

  const navItems = [{ link: "/recipes", text: "Recipes" }];
  const listCategory = [
    { name: "Cate1", number: 10 },
    { name: "Cate2", number: 20 },
    { name: "Cate3", number: 30 },
    { name: "Cate4", number: 40 },
    { name: "Cate5", number: 50 },
    { name: "Cate5", number: 50 },
    { name: "Cate5", number: 50 },
    { name: "Cate5", number: 50 },
    { name: "Cate5", number: 50 },
    { name: "Cate5", number: 50 },
    { name: "Cate5", number: 50 },
  ];

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
      }}
    >
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
                      listCategory={listCategory}
                    ></FilterCategory>
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
                      onChange={(e) => setSearchInput(e.target.value)}
                    ></input>

                    <div className="search_i2">
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
                    <span className="txt-bold txt2">52</span> Results Found
                  </p>
                </div>
                <div className="display_row">
                  <div className="display_item1">
                    <DisplayItem
                      id={"1234"}
                      istrue={true}
                      ttime={140}
                      ttag={"Vietnamese Food"}
                      tby={"Admin"}
                      tcomments={65}
                      tname={"Trứng cuộn Hàn Quốc"}
                      tlink={
                        "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png"
                      }
                    ></DisplayItem>
                  </div>
                  <div className="display_item2 ">
                    <DisplayItem
                      id={"1234"}
                      istrue={true}
                      ttime={140}
                      ttag={"Vietnamese Food"}
                      tby={"Admin"}
                      tcomments={65}
                      tname={"Trứng cuộn Hàn Quốc"}
                      tlink={
                        "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png"
                      }
                    ></DisplayItem>
                  </div>
                </div>
                <div className="display_row">
                  <div className="display_item1">
                    <DisplayItem
                      id={"1234"}
                      istrue={true}
                      ttime={140}
                      ttag={"Vietnamese Food"}
                      tby={"Admin"}
                      tcomments={65}
                      tname={"Trứng cuộn Hàn Quốc"}
                      tlink={
                        "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png"
                      }
                    ></DisplayItem>
                  </div>
                  <div className="display_item2 ">
                    <DisplayItem
                      id={"1234"}
                      istrue={true}
                      ttime={140}
                      ttag={"Vietnamese Food"}
                      tby={"Admin"}
                      tcomments={65}
                      tname={"Trứng cuộn Hàn Quốc"}
                      tlink={
                        "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png"
                      }
                    ></DisplayItem>
                  </div>
                </div>
                <div className="display_row">
                  <div className="display_item1">
                    <DisplayItem
                      id={"1234"}
                      istrue={true}
                      ttime={140}
                      ttag={"Vietnamese Food"}
                      tby={"Admin"}
                      tcomments={65}
                      tname={"Trứng cuộn Hàn Quốc"}
                      tlink={
                        "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png"
                      }
                    ></DisplayItem>
                  </div>
                  <div className="display_item2 ">
                    <DisplayItem
                      id={"1234"}
                      istrue={true}
                      ttime={140}
                      ttag={"Vietnamese Food"}
                      tby={"Admin"}
                      tcomments={65}
                      tname={"Trứng cuộn Hàn Quốc"}
                      tlink={
                        "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png"
                      }
                    ></DisplayItem>
                  </div>
                </div>
                <div className="display_row">
                  <div className="display_item1">
                    <DisplayItem
                      id={"1234"}
                      istrue={true}
                      ttime={140}
                      ttag={"Vietnamese Food"}
                      tby={"Admin"}
                      tcomments={65}
                      tname={"Trứng cuộn Hàn Quốc"}
                      tlink={
                        "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png"
                      }
                    ></DisplayItem>
                  </div>
                  <div className="display_item2 ">
                    <DisplayItem
                      id={"1234"}
                      istrue={true}
                      ttime={140}
                      ttag={"Vietnamese Food"}
                      tby={"Admin"}
                      tcomments={65}
                      tname={"Trứng cuộn Hàn Quốc"}
                      tlink={
                        "https://img.tastykitchen.vn/resize/764x-/2022/04/15/cach-lam-trung-cuon-han-quoc-01-62e3.png"
                      }
                    ></DisplayItem>
                  </div>
                </div>
                <br />
                <Pagination
                  align="center"
                  defaultCurrent={1}
                  total={600}
                  className="pagination"
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
