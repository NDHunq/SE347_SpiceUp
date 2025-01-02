import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./recipe.css";
import Header from "../../User/widget/top";
import { ConfigProvider } from "antd";
import { LiaFilterSolid } from "react-icons/lia";
import FilterCategory from "./filter_drop_category/filter_category";
import { Pagination } from "antd";
import DisplayItem from "./display_item/displayItem";
import DisplayItemApp from "./display_item/displayItem_app";
import RecentItem from "./recent_Item/recent_item";
import { Radio } from "antd";
import { getAllRecipes, getImage } from "../../../services/userServices";

function Recipes({ search }) {
  //radio
  const [value, setValue] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [listDisplay_app, setlistapp] = useState([]);
  const [listDisplay_pending, setListDisplay_pending] = useState([]);
  const [total_pages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    if (value === 1) {
      setTotalPages(Math.ceil(listDisplay_app.length / 8) * 10);
    } else {
      setTotalPages(Math.ceil(listDisplay_pending.length / 8) * 10);
    }
  }, [value, listDisplay_app, listDisplay_pending]);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    const newValue = e.target.value;
    setValue(newValue);

    if (newValue === 1) {
      setTotalPages(listDisplay_app.length * 10);
      setResult(listDisplay_app.length);
    } else {
      setTotalPages(listDisplay_pending.length * 10);
      setResult(listDisplay_pending.length);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    setlistapp(listDisplay_app.filter((item) => item.id !== id));
  };

  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate("/admin/newrecipe");
  };

  const navItems = [{ link: "/admin/recipes", text: "Recipes" }];
  const listCategory = [
    { name: "All", number: 10, id: 1 },
    { name: "Sauce", number: 20, id: 2 },
    { name: "Dessert", number: 30, id: 3 },
    { name: "Beverages", number: 40, id: 4 },
    { name: "Snack", number: 50, id: 5 },
    { name: "Soup", number: 60, id: 6 },
    { name: "Baking", number: 70, id: 7 },
    { name: "Breakfast", number: 80, id: 8 },
    { name: "Lunch", number: 90, id: 9 },
    { name: "Dinner", number: 100, id: 10 },
    { name: "Salad", number: 10, id: 11 },
    { name: "Vietnamese Food", number: 90, id: 12 },
  ];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get("search");
    if (searchQuery) {
      setSearchInput(searchQuery);
      handleSearch(searchQuery);
    }
    const fetchRecipes = async () => {
      try {
        const recipes = await getAllRecipes();
        if (Array.isArray(recipes)) {
          const recipesWithImages = await Promise.all(
            recipes.map(async (item) => {
              const url = await getImage(item.coverImageId);
              return { ...item, coverImageUrl: url };
            })
          );
          console.log("recipesWithImages", recipesWithImages);
          const approved = recipesWithImages.filter(
            (item) => item.status === "RS1"
          );
          const pending = recipesWithImages.filter(
            (item) => item.status === "RS2"
          );
          setResult(pending.length);
          const NewApproved = approved.map((item) => {
            let isTrue = false;
            if (item.savedUserId.includes("userId")) {
              isTrue = true;
            }
            let time = item.cookingTimeInSecond / 60;

            return {
              id: item._id,
              istrue: isTrue,
              ttime: time,
              ttag: item.type,
              tby: item.userId.firstname, // Ensure to access the firstname property
              tcomments: item.views,
              tname: item.recipeName,
              tlink: item.coverImageUrl,
              date: item.createdAt,
            };
          });
          const NewPending = pending.map((item) => {
            let isTrue = false;
            if (item.savedUserId.includes("userId")) {
              isTrue = true;
            }
            let time = item.cookingTimeInSecond / 60;

            return {
              id: item._id,
              istrue: isTrue,
              ttime: time,
              ttag: item.type,
              tby: item.userId.firstname, // Ensure to access the firstname property
              tcomments: item.views,
              tname: item.recipeName,
              tlink: item.coverImageUrl,
            };
          });

          setlistapp(NewApproved);
          setListDisplay_pending(NewPending);
          localStorage.setItem("approved", JSON.stringify(NewApproved));
          localStorage.setItem("pending", JSON.stringify(NewPending));
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
  const handleSearch = () => {
    if (value !== 1) {
      const allRecipes = JSON.parse(localStorage.getItem("pending") || "[]");
      console.log("allRecipes", allRecipes);
      const filtered = allRecipes.filter(
        (item) =>
          item.tname &&
          item.tname.toLowerCase().includes(searchInput.toLowerCase())
      );
      setListDisplay_pending(filtered);
    } else {
      const allRecipes = JSON.parse(localStorage.getItem("approved") || "[]");
      const filtered = allRecipes.filter(
        (item) =>
          item.tname &&
          item.tname.toLowerCase().includes(searchInput.toLowerCase())
      );
      setlistapp(filtered);
    }
  };
  const handleTypeSelect = (typeName) => {
    if (value != 1) {
      const allRecipes = JSON.parse(localStorage.getItem("pending") || "[]");
      if (typeName === "All") {
        setListDisplay_pending(allRecipes);
      } else {
        const filtered = allRecipes.filter((item) => item.ttag === typeName);
        setListDisplay_pending(filtered);
      }
    } else {
      const allRecipes = JSON.parse(localStorage.getItem("approved") || "[]");
      if (typeName === "All") {
        setlistapp(allRecipes);
      } else {
        const filtered = allRecipes.filter((item) => item.ttag === typeName);
        setlistapp(filtered);
      }
    }
  };
  const onSelectChange = (e) => {
    const valuee = e.target.value;

    let sorted = [];
    if (value != 1) {
      console.log("listDisplay_pending", listDisplay_pending);
      if (valuee === "latest") {
        sorted = [...listDisplay_pending].sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
      } else if (valuee === "best-seller") {
        sorted = [...listDisplay_pending].sort((a, b) => {
          return b.tcomments - a.tcomments;
        });
      }
      console.log("sorted", sorted);
      setListDisplay_pending(sorted);
    } else {
      if (valuee === "latest") {
        sorted = [...listDisplay_app].sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
      } else if (valuee === "best-seller") {
        sorted = [...listDisplay_app].sort((a, b) => {
          return b.tcomments - a.tcomments;
        });
      }
      setlistapp(sorted);
    }
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
      }}
    >
      <div className="recipes">
        <Header navItems={navItems} />

        <main className="content">
          <div className="container">
            <div className="row ">
              <div className="col-4 cot1">
                <div className="col">
                  <div className="div1 "></div>
                  <div className="div2">
                    <div className="filter_btn flex flexgap">
                      <p>Filter</p>
                    </div>
                  </div>
                  <hr className="line"></hr>
                  <p className="recenttxt botko">Status</p>
                  <div className="div1 tex ">
                    <Radio.Group
                      onChange={onChange}
                      value={value}
                      className="radio_div"
                    >
                      <Radio className={"pentxt"} value={1}>
                        Pending
                      </Radio>
                      <Radio className={"pentxt"} value={2}>
                        Approved
                      </Radio>
                    </Radio.Group>
                  </div>
                  <hr className="line"></hr>
                  <div className="filter_content">
                    <FilterCategory
                      listname={"Recipe Types"}
                      listCategory={listCategory}
                      onTypeSelect={handleTypeSelect}
                    ></FilterCategory>
                    <hr className="line"></hr>
                    <p className="recenttxt bot5px">Recenty Saved</p>

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

                    <div className="search_i2" onClick={handleSearch}>
                      <p className="txt_search2">Search</p>
                    </div>
                  </div>
                  <div className="upload_btn" onClick={handleUploadClick}>
                    Upload Recipe
                  </div>
                </div>
                <div className="div2">
                  <div className="flex flexgap">
                    <p className="txt_Sortby"> Sort by:</p>
                    <select
                      className="sort-by"
                      onChange={(e) => {
                        onSelectChange(e);
                      }}
                    >
                      <option value="latest"> Latest </option>
                      <option value="best-seller"> View </option>
                    </select>
                  </div>
                  <p className="txt2">
                    <span className="txt-bold txt2">{result}</span> Results
                    Found
                  </p>
                </div>
                {value === 1 ? (
                  <div>
                    <div className="flex flexgap">
                      {" "}
                      {listDisplay_app[(currentPage - 1) * 8] ? (
                        <DisplayItemApp
                          id={listDisplay_app[(currentPage - 1) * 8].id}
                          istrue={listDisplay_app[(currentPage - 1) * 8].istrue}
                          ttime={listDisplay_app[(currentPage - 1) * 8].ttime}
                          ttag={listDisplay_app[(currentPage - 1) * 8].ttag}
                          tby={listDisplay_app[(currentPage - 1) * 8].tby}
                          tcomments={
                            listDisplay_app[(currentPage - 1) * 8].tcomments
                          }
                          tname={listDisplay_app[(currentPage - 1) * 8].tname}
                          tlink={listDisplay_app[(currentPage - 1) * 8].tlink}
                          handleDelete={handleDelete}
                        ></DisplayItemApp>
                      ) : null}
                      {listDisplay_app[(currentPage - 1) * 8 + 1] ? (
                        <DisplayItemApp
                          id={listDisplay_app[(currentPage - 1) * 8 + 1].id}
                          istrue={
                            listDisplay_app[(currentPage - 1) * 8 + 1].istrue
                          }
                          ttime={
                            listDisplay_app[(currentPage - 1) * 8 + 1].ttime
                          }
                          ttag={listDisplay_app[(currentPage - 1) * 8 + 1].ttag}
                          tby={listDisplay_app[(currentPage - 1) * 8 + 1].tby}
                          tcomments={
                            listDisplay_app[(currentPage - 1) * 8 + 1].tcomments
                          }
                          tname={
                            listDisplay_app[(currentPage - 1) * 8 + 1].tname
                          }
                          tlink={
                            listDisplay_app[(currentPage - 1) * 8 + 1].tlink
                          }
                          handleDelete={handleDelete}
                        />
                      ) : null}
                    </div>
                    <div className="flex flexgap">
                      {" "}
                      {listDisplay_app[(currentPage - 1) * 8 + 2] ? (
                        <DisplayItemApp
                          id={listDisplay_app[(currentPage - 1) * 8 + 2].id}
                          istrue={
                            listDisplay_app[(currentPage - 1) * 8 + 2].istrue
                          }
                          ttime={
                            listDisplay_app[(currentPage - 1) * 8 + 2].ttime
                          }
                          ttag={listDisplay_app[(currentPage - 1) * 8 + 2].ttag}
                          tby={listDisplay_app[(currentPage - 1) * 8 + 2].tby}
                          tcomments={
                            listDisplay_app[(currentPage - 1) * 8 + 2].tcomments
                          }
                          tname={
                            listDisplay_app[(currentPage - 1) * 8 + 2].tname
                          }
                          tlink={
                            listDisplay_app[(currentPage - 1) * 8 + 2].tlink
                          }
                          handleDelete={handleDelete}
                        ></DisplayItemApp>
                      ) : null}
                      {listDisplay_app[(currentPage - 1) * 8 + 3] ? (
                        <DisplayItemApp
                          id={listDisplay_app[(currentPage - 1) * 8 + 3].id}
                          istrue={
                            listDisplay_app[(currentPage - 1) * 8 + 3].istrue
                          }
                          ttime={
                            listDisplay_app[(currentPage - 1) * 8 + 3].ttime
                          }
                          ttag={listDisplay_app[(currentPage - 1) * 8 + 3].ttag}
                          tby={listDisplay_app[(currentPage - 1) * 8 + 3].tby}
                          tcomments={
                            listDisplay_app[(currentPage - 1) * 8 + 3].tcomments
                          }
                          tname={
                            listDisplay_app[(currentPage - 1) * 8 + 3].tname
                          }
                          tlink={
                            listDisplay_app[(currentPage - 1) * 8 + 3].tlink
                          }
                          handleDelete={handleDelete}
                        />
                      ) : null}
                    </div>
                    <div className="flex flexgap">
                      {" "}
                      {listDisplay_app[(currentPage - 1) * 8 + 4] ? (
                        <DisplayItemApp
                          id={listDisplay_app[(currentPage - 1) * 8 + 4].id}
                          istrue={
                            listDisplay_app[(currentPage - 1) * 8 + 4].istrue
                          }
                          ttime={
                            listDisplay_app[(currentPage - 1) * 8 + 4].ttime
                          }
                          ttag={listDisplay_app[(currentPage - 1) * 8 + 4].ttag}
                          tby={listDisplay_app[(currentPage - 1) * 8 + 4].tby}
                          tcomments={
                            listDisplay_app[(currentPage - 1) * 8 + 4].tcomments
                          }
                          tname={
                            listDisplay_app[(currentPage - 1) * 8 + 4].tname
                          }
                          tlink={
                            listDisplay_app[(currentPage - 1) * 8 + 4].tlink
                          }
                          handleDelete={handleDelete}
                        ></DisplayItemApp>
                      ) : null}
                      {listDisplay_app[(currentPage - 1) * 8 + 5] ? (
                        <DisplayItemApp
                          id={listDisplay_app[(currentPage - 1) * 8 + 5].id}
                          istrue={
                            listDisplay_app[(currentPage - 1) * 8 + 5].istrue
                          }
                          ttime={
                            listDisplay_app[(currentPage - 1) * 8 + 5].ttime
                          }
                          ttag={listDisplay_app[(currentPage - 1) * 8 + 5].ttag}
                          tby={listDisplay_app[(currentPage - 1) * 8 + 5].tby}
                          tcomments={
                            listDisplay_app[(currentPage - 1) * 8 + 5].tcomments
                          }
                          tname={
                            listDisplay_app[(currentPage - 1) * 8 + 5].tname
                          }
                          tlink={
                            listDisplay_app[(currentPage - 1) * 8 + 5].tlink
                          }
                          handleDelete={handleDelete}
                        />
                      ) : null}
                    </div>

                    <div className="flex flexgap">
                      {" "}
                      {listDisplay_app[(currentPage - 1) * 8 + 6] ? (
                        <DisplayItemApp
                          id={listDisplay_app[(currentPage - 1) * 8 + 6].id}
                          istrue={
                            listDisplay_app[(currentPage - 1) * 8 + 6].istrue
                          }
                          ttime={
                            listDisplay_app[(currentPage - 1) * 8 + 6].ttime
                          }
                          ttag={listDisplay_app[(currentPage - 1) * 8 + 6].ttag}
                          tby={listDisplay_app[(currentPage - 1) * 8 + 6].tby}
                          tcomments={
                            listDisplay_app[(currentPage - 1) * 8 + 6].tcomments
                          }
                          tname={
                            listDisplay_app[(currentPage - 1) * 8 + 6].tname
                          }
                          tlink={
                            listDisplay_app[(currentPage - 1) * 8 + 6].tlink
                          }
                          handleDelete={handleDelete}
                        ></DisplayItemApp>
                      ) : null}
                      {listDisplay_app[(currentPage - 1) * 8 + 7] ? (
                        <DisplayItemApp
                          id={listDisplay_app[(currentPage - 1) * 8 + 7].id}
                          istrue={
                            listDisplay_app[(currentPage - 1) * 8 + 7].istrue
                          }
                          ttime={
                            listDisplay_app[(currentPage - 1) * 8 + 7].ttime
                          }
                          ttag={listDisplay_app[(currentPage - 1) * 8 + 7].ttag}
                          tby={listDisplay_app[(currentPage - 1) * 8 + 7].tby}
                          tcomments={
                            listDisplay_app[(currentPage - 1) * 8 + 7].tcomments
                          }
                          tname={
                            listDisplay_app[(currentPage - 1) * 8 + 7].tname
                          }
                          tlink={
                            listDisplay_app[(currentPage - 1) * 8 + 7].tlink
                          }
                          handleDelete={handleDelete}
                        />
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex flexgap ">
                      {" "}
                      {listDisplay_pending[(currentPage - 1) * 8] ? (
                        <DisplayItem
                          id={listDisplay_pending[(currentPage - 1) * 8].id}
                          istrue={
                            listDisplay_pending[(currentPage - 1) * 8].istrue
                          }
                          ttime={
                            listDisplay_pending[(currentPage - 1) * 8].ttime
                          }
                          ttag={listDisplay_pending[(currentPage - 1) * 8].ttag}
                          tby={listDisplay_pending[(currentPage - 1) * 8].tby}
                          tcomments={
                            listDisplay_pending[(currentPage - 1) * 8].tcomments
                          }
                          tname={
                            listDisplay_pending[(currentPage - 1) * 8].tname
                          }
                          tlink={
                            listDisplay_pending[(currentPage - 1) * 8].tlink
                          }
                          handleDelete={handleDelete}
                        ></DisplayItem>
                      ) : null}
                      {listDisplay_pending[(currentPage - 1) * 8 + 1] ? (
                        <DisplayItem
                          id={listDisplay_pending[(currentPage - 1) * 8 + 1].id}
                          istrue={
                            listDisplay_pending[(currentPage - 1) * 8 + 1]
                              .istrue
                          }
                          ttime={
                            listDisplay_pending[(currentPage - 1) * 8 + 1].ttime
                          }
                          ttag={
                            listDisplay_pending[(currentPage - 1) * 8 + 1].ttag
                          }
                          tby={
                            listDisplay_pending[(currentPage - 1) * 8 + 1].tby
                          }
                          tcomments={
                            listDisplay_pending[(currentPage - 1) * 8 + 1]
                              .tcomments
                          }
                          tname={
                            listDisplay_pending[(currentPage - 1) * 8 + 1].tname
                          }
                          tlink={
                            listDisplay_pending[(currentPage - 1) * 8 + 1].tlink
                          }
                          handleDelete={handleDelete}
                        />
                      ) : null}
                    </div>
                    <div className="flex flexgap">
                      {" "}
                      {listDisplay_pending[(currentPage - 1) * 8 + 2] ? (
                        <DisplayItem
                          id={listDisplay_pending[(currentPage - 1) * 8 + 2].id}
                          istrue={
                            listDisplay_pending[(currentPage - 1) * 8 + 2]
                              .istrue
                          }
                          ttime={
                            listDisplay_pending[(currentPage - 1) * 8 + 2].ttime
                          }
                          ttag={
                            listDisplay_pending[(currentPage - 1) * 8 + 2].ttag
                          }
                          tby={
                            listDisplay_pending[(currentPage - 1) * 8 + 2].tby
                          }
                          tcomments={
                            listDisplay_pending[(currentPage - 1) * 8 + 2]
                              .tcomments
                          }
                          tname={
                            listDisplay_pending[(currentPage - 1) * 8 + 2].tname
                          }
                          tlink={
                            listDisplay_pending[(currentPage - 1) * 8 + 2].tlink
                          }
                          handleDelete={handleDelete}
                        ></DisplayItem>
                      ) : null}
                      {listDisplay_pending[(currentPage - 1) * 8 + 3] ? (
                        <DisplayItem
                          id={listDisplay_pending[(currentPage - 1) * 8 + 3].id}
                          istrue={
                            listDisplay_pending[(currentPage - 1) * 8 + 3]
                              .istrue
                          }
                          ttime={
                            listDisplay_pending[(currentPage - 1) * 8 + 3].ttime
                          }
                          ttag={
                            listDisplay_pending[(currentPage - 1) * 8 + 3].ttag
                          }
                          tby={
                            listDisplay_pending[(currentPage - 1) * 8 + 3].tby
                          }
                          tcomments={
                            listDisplay_pending[(currentPage - 1) * 8 + 3]
                              .tcomments
                          }
                          tname={
                            listDisplay_pending[(currentPage - 1) * 8 + 3].tname
                          }
                          tlink={
                            listDisplay_pending[(currentPage - 1) * 8 + 3].tlink
                          }
                          handleDelete={handleDelete}
                        />
                      ) : null}
                    </div>
                    <div className="flex flexgap">
                      {" "}
                      {listDisplay_pending[(currentPage - 1) * 8 + 4] ? (
                        <DisplayItem
                          id={listDisplay_pending[(currentPage - 1) * 8 + 4].id}
                          istrue={
                            listDisplay_pending[(currentPage - 1) * 8 + 4]
                              .istrue
                          }
                          ttime={
                            listDisplay_pending[(currentPage - 1) * 8 + 4].ttime
                          }
                          ttag={
                            listDisplay_pending[(currentPage - 1) * 8 + 4].ttag
                          }
                          tby={
                            listDisplay_pending[(currentPage - 1) * 8 + 4].tby
                          }
                          tcomments={
                            listDisplay_pending[(currentPage - 1) * 8 + 4]
                              .tcomments
                          }
                          tname={
                            listDisplay_pending[(currentPage - 1) * 8 + 4].tname
                          }
                          tlink={
                            listDisplay_pending[(currentPage - 1) * 8 + 4].tlink
                          }
                          handleDelete={handleDelete}
                        ></DisplayItem>
                      ) : null}
                      {listDisplay_pending[(currentPage - 1) * 8 + 5] ? (
                        <DisplayItem
                          id={listDisplay_pending[(currentPage - 1) * 8 + 5].id}
                          istrue={
                            listDisplay_pending[(currentPage - 1) * 8 + 5]
                              .istrue
                          }
                          ttime={
                            listDisplay_pending[(currentPage - 1) * 8 + 5].ttime
                          }
                          ttag={
                            listDisplay_pending[(currentPage - 1) * 8 + 5].ttag
                          }
                          tby={
                            listDisplay_pending[(currentPage - 1) * 8 + 5].tby
                          }
                          tcomments={
                            listDisplay_pending[(currentPage - 1) * 8 + 5]
                              .tcomments
                          }
                          tname={
                            listDisplay_pending[(currentPage - 1) * 8 + 5].tname
                          }
                          tlink={
                            listDisplay_pending[(currentPage - 1) * 8 + 5].tlink
                          }
                          handleDelete={handleDelete}
                        />
                      ) : null}
                    </div>
                    <div className="flex flexgap">
                      {" "}
                      {listDisplay_pending[(currentPage - 1) * 8 + 4] ? (
                        <DisplayItem
                          id={listDisplay_pending[(currentPage - 1) * 8 + 4].id}
                          istrue={
                            listDisplay_pending[(currentPage - 1) * 8 + 4]
                              .istrue
                          }
                          ttime={
                            listDisplay_pending[(currentPage - 1) * 8 + 4].ttime
                          }
                          ttag={
                            listDisplay_pending[(currentPage - 1) * 8 + 4].ttag
                          }
                          tby={
                            listDisplay_pending[(currentPage - 1) * 8 + 4].tby
                          }
                          tcomments={
                            listDisplay_pending[(currentPage - 1) * 8 + 4]
                              .tcomments
                          }
                          tname={
                            listDisplay_pending[(currentPage - 1) * 8 + 4].tname
                          }
                          tlink={
                            listDisplay_pending[(currentPage - 1) * 8 + 4].tlink
                          }
                          handleDelete={handleDelete}
                        ></DisplayItem>
                      ) : null}
                      {listDisplay_pending[(currentPage - 1) * 8 + 5] ? (
                        <DisplayItem
                          id={listDisplay_pending[(currentPage - 1) * 8 + 5].id}
                          istrue={
                            listDisplay_pending[(currentPage - 1) * 8 + 5]
                              .istrue
                          }
                          ttime={
                            listDisplay_pending[(currentPage - 1) * 8 + 5].ttime
                          }
                          ttag={
                            listDisplay_pending[(currentPage - 1) * 8 + 5].ttag
                          }
                          tby={
                            listDisplay_pending[(currentPage - 1) * 8 + 5].tby
                          }
                          tcomments={
                            listDisplay_pending[(currentPage - 1) * 8 + 5]
                              .tcomments
                          }
                          tname={
                            listDisplay_pending[(currentPage - 1) * 8 + 5].tname
                          }
                          tlink={
                            listDisplay_pending[(currentPage - 1) * 8 + 5].tlink
                          }
                          handleDelete={handleDelete}
                        />
                      ) : null}
                    </div>
                    <div className="flex flexgap">
                      {" "}
                      {listDisplay_pending[(currentPage - 1) * 8 + 6] ? (
                        <DisplayItem
                          id={listDisplay_pending[(currentPage - 1) * 8 + 6].id}
                          istrue={
                            listDisplay_pending[(currentPage - 1) * 8 + 6]
                              .istrue
                          }
                          ttime={
                            listDisplay_pending[(currentPage - 1) * 8 + 6].ttime
                          }
                          ttag={
                            listDisplay_pending[(currentPage - 1) * 8 + 6].ttag
                          }
                          tby={
                            listDisplay_pending[(currentPage - 1) * 8 + 6].tby
                          }
                          tcomments={
                            listDisplay_pending[(currentPage - 1) * 8 + 6]
                              .tcomments
                          }
                          tname={
                            listDisplay_pending[(currentPage - 1) * 8 + 6].tname
                          }
                          tlink={
                            listDisplay_pending[(currentPage - 1) * 8 + 6].tlink
                          }
                          handleDelete={handleDelete}
                        ></DisplayItem>
                      ) : null}
                      {listDisplay_pending[(currentPage - 1) * 8 + 7] ? (
                        <DisplayItem
                          id={listDisplay_pending[(currentPage - 1) * 8 + 7].id}
                          istrue={
                            listDisplay_pending[(currentPage - 1) * 8 + 7]
                              .istrue
                          }
                          ttime={
                            listDisplay_pending[(currentPage - 1) * 8 + 7].ttime
                          }
                          ttag={
                            listDisplay_pending[(currentPage - 1) * 8 + 7].ttag
                          }
                          tby={
                            listDisplay_pending[(currentPage - 1) * 8 + 7].tby
                          }
                          tcomments={
                            listDisplay_pending[(currentPage - 1) * 8 + 7]
                              .tcomments
                          }
                          tname={
                            listDisplay_pending[(currentPage - 1) * 8 + 7].tname
                          }
                          tlink={
                            listDisplay_pending[(currentPage - 1) * 8 + 7].tlink
                          }
                          handleDelete={handleDelete}
                        />
                      ) : null}
                    </div>
                  </div>
                )}

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
