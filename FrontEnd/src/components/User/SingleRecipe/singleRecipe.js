import React, { useState, useEffect } from "react";
import { Input, ConfigProvider, Space } from "antd"; // Import Input and ConfigProvider from antd
import { AudioOutlined } from "@ant-design/icons"; // Import AudioOutlined from antd icons
import Header from "../widget/top";
import { FaClock, FaTag, FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { SlTag } from "react-icons/sl";
import { FaRegClock } from "react-icons/fa6";
import { IoLinkOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { LiaUser, LiaCommentAltSolid } from "react-icons/lia";
import "./singleRecipe.css";
import DisplayItem from "../Recipe/display_item/displayItem";
import { MdOpenInNew } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import {
  Link,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

const { TextArea, Search } = Input; // Destructure TextArea and Search from Input

const onSearch = (value, _e, info) => console.log(info?.source, value);

function SingleRecipe() {
  const [value, setValue] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const [navItems, setNavItems] = useState([
    { link: "/recipes", text: "Recipes" },
    { link: `/singlerecipe?id=${id}`, text: "Single Recipe" },
  ]);
  const [isBookmarked, setIsBookmarked] = useState(true);
  const [tags, setTags] = useState("Vietnamese Food");
  const [by, setBy] = useState("Admin");
  const [cmt, setcmt] = useState(65);
  const [views, setViews] = useState(100);
  const [mins, setMins] = useState(140);
  const [userName, setUserName] = useState("Chuyên gia ẩm thực");
  const [date, setDate] = useState("Apr 25, 2024");
  const [userAvatar, setUserAvatar] = useState(
    "https://staticg.sportskeeda.com/editor/2024/09/57ffe-17256814729148-1920.jpg"
  );

  const navigate = useNavigate();

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const coverImage =
    "https://cdn.tgdd.vn/Files/2021/07/31/1372124/smoothie-la-gi-cong-thuc-che-bien-smoothie-trai-cay-thom-ngon-ngot-mat-202112301817432823.jpg";
  const [steps, setSteps] = useState([
    {
      content:
        "Loại bỏ vỏ chuối, vỏ kiwi, vỏ xoài chín. Sau đó, cắt trái cây thành từng khoanh mỏng. Cho vào ngăn đá tủ lạnh ít nhất 2 tiếng.",
      image1:
        "https://elmich.vn/wp-content/uploads/2024/01/sinh-to-xoai-chuoi-2.jpg",
      image2:
        "https://elmich.vn/wp-content/uploads/2024/01/sinh-to-xoai-chuoi-2.jpg",
      image3:
        "https://elmich.vn/wp-content/uploads/2024/01/sinh-to-xoai-chuoi-2.jpg",
      image4:
        "https://elmich.vn/wp-content/uploads/2024/01/sinh-to-xoai-chuoi-2.jpg",
      image5:
        "https://elmich.vn/wp-content/uploads/2024/01/sinh-to-xoai-chuoi-2.jpg",
    },
    {
      content:
        "Củ dền gọt bỏ vỏ, cắt khối vuông. Yến mạch bạn có thể sử dụng loại nguyên chất hoặc rang đường nâu đều được.",
      image1:
        "https://elmich.vn/wp-content/uploads/2024/01/sinh-to-xoai-chuoi-2.jpg",
      image2:
        "https://elmich.vn/wp-content/uploads/2024/01/sinh-to-xoai-chuoi-2.jpg",
      image3:
        "https://elmich.vn/wp-content/uploads/2024/01/sinh-to-xoai-chuoi-2.jpg",
      image4:
        "https://elmich.vn/wp-content/uploads/2024/01/sinh-to-xoai-chuoi-2.jpg",
      image5:
        "https://elmich.vn/wp-content/uploads/2024/01/sinh-to-xoai-chuoi-2.jpg",
    },
    {
      content:
        "Hãy bảo quản món ăn này trong ngăn đông để chúng tươi lâu hơn nhé. Bây giờ thưởng thức thôi. Trái cây chua ngọt đậm đà tự nhiên không cần đường, hòa cùng trái cây tươi mát lạnh, thêm ít yến mạch và hạt chia bổ dưỡng mát lạnh. Hãy sáng tạo và duy trì thói quen ăn món smoothie này để có một vóc dáng đẹp và một sức khỏe tốt nhé! Chúc các bạn thành công!",
      image1:
        "https://elmich.vn/wp-content/uploads/2024/01/sinh-to-xoai-chuoi-2.jpg",
      image2:
        "https://elmich.vn/wp-content/uploads/2024/01/sinh-to-xoai-chuoi-2.jpg",
      image3:
        "https://elmich.vn/wp-content/uploads/2024/01/sinh-to-xoai-chuoi-2.jpg",
      image4:
        "https://elmich.vn/wp-content/uploads/2024/01/sinh-to-xoai-chuoi-2.jpg",
      image5:
        "https://elmich.vn/wp-content/uploads/2024/01/sinh-to-xoai-chuoi-2.jpg",
    },
  ]);
  const [comments, setComments] = useState([
    {
      name: "User 1",
      content: "Comment 1",
      date: "2024-04-25",
      linkavatar:
        "https://elmich.vn/wp-content/uploads/2024/01/sinh-to-xoai-chuoi-2.jpg",
    },
    {
      name: "User 2",
      content: "Comment 2",
      date: "2024-04-25",
      linkavatar:
        "https://elmich.vn/wp-content/uploads/2024/01/sinh-to-xoai-chuoi-2.jpg",
    },
    {
      name: "User 3",
      content: "Comment 3",
      date: "2024-04-25",
      linkavatar:
        "https://elmich.vn/wp-content/uploads/2024/01/sinh-to-xoai-chuoi-2.jpg",
    },
  ]);
  const [igredients, setIgredients] = useState([
    {
      igredient: "Chuối",
      quantity: "1 trái",
      link: "https://www.youtube.com/watch?v=OrDB4jpA1g8&pp=ygUOdGhpw6puIGzDvSDGoWk%3D",
    },
    { igredient: "Chuối", quantity: "1 trái", link: "" },
    { igredient: "Chuối", quantity: "1 trái", link: "" },
    { igredient: "Chuối", quantity: "1 trái", link: "" },
    { igredient: "Chuối", quantity: "1 trái", link: "" },
    { igredient: "Chuối", quantity: "1 trái", link: "" },
  ]);

  const openLink = (link, ingredient) => {
    if (link === "") {
      navigate(`/shop?search=${ingredient}`);
    } else {
      window.open(link, "_blank");
    }
  };
  {
    return (
      <ConfigProvider
        theme={{
          components: {
            Input: {
              hoverBorderColor: "#00B207",
              activeBorderColor: "#00B207",
              hoverBorderColor: "#00B207",
            },
          },
          token: {
            primaryColor: "#00B207",
            colorPrimaryActive: "#00B207",
            colorPrimaryHover: "#00B207",
          },
        }}>
        <div className="recipes">
          <Header navItems={navItems} />

          <main className="content">
            <div className="container">
              <div className="row">
                <div className="col-8 ">
                  <div className="flexible">
                    <div className="col">
                      <div
                        className="cover_image"
                        style={{
                          backgroundImage: `url(${coverImage})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}></div>
                      <div className="tag_chain">
                        <SlTag className="icon_chain"></SlTag>
                        <div className="txt_chain">{tags}</div>
                        <LiaUser className="icon_chain"></LiaUser>
                        <div className="txt_chain">{by}</div>
                        <LiaCommentAltSolid className="icon_chain"></LiaCommentAltSolid>
                        <div className="txt_chain"> {cmt} comments</div>
                        <LuEye className="icon_chain"></LuEye>
                        <div className="txt_chain">{views} views</div>
                        <FaRegClock className="icon_chain"></FaRegClock>
                        <div className="txt_chain">{mins} mins</div>
                      </div>
                      <div className="title_single">
                        Smothiee xoài chuối trộn bún đậu mắm tôm chan sữa ông
                        thọ
                      </div>
                      <div className="space_between topbot20px">
                        <div className="tag_chain">
                          <div
                            className="avatar_single"
                            style={{
                              backgroundImage: `url(${coverImage})`,
                            }}></div>
                          <div>
                            {" "}
                            <div className="name_single">{userName}</div>
                            <div className="tag_chain date_single left10px">
                              {" "}
                              <div>{date}</div>
                            </div>
                          </div>
                        </div>
                        <div className="tag_chain2">
                          <IoLinkOutline className="link_icon" />
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark();
                            }}
                            className="bookmarksingle">
                            {isBookmarked ? (
                              <FaBookmark className="bookmark-icon-single active" />
                            ) : (
                              <FaRegBookmark className="bookmark-icon-single" />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="description">
                        Smoothie Healthy Bowl là một món ăn sáng hỗ trợ giảm
                        cân, chăm sóc sức đẹp phổ biến ở các nước Châu Âu và dần
                        đang được ưa chuộng tại Việt Nam. Đây mà món ăn có thể
                        giúp bạn thỏa sức sáng tạo với nhiều loại trái cây, các
                        loại hạt khác nhau. Với vẻ ngoài vô cùng đẹp mắt và
                        hương vị tươi mát, cách làm đơn giản, combo Smoothie
                        Xoài Chuối Kiwi sẽ làm bạn thích thú.
                      </div>
                      <div className="hd ">Hướng dẫn</div>
                      <div className="steps">
                        {steps.map((step, index) => (
                          <div className="step_container">
                            <div className="step_icon">{index + 1}</div>
                            <div className="step" key={index}>
                              <div className="content">{step.content}</div>
                              <div className="images">
                                <div
                                  className="image"
                                  style={{
                                    backgroundImage: `url(${step.image1})`,
                                  }}></div>
                                <div
                                  className="image"
                                  style={{
                                    backgroundImage: `url(${step.image2})`,
                                  }}></div>
                                <div
                                  className="image"
                                  style={{
                                    backgroundImage: `url(${step.image3})`,
                                  }}></div>
                                <div
                                  className="image"
                                  style={{
                                    backgroundImage: `url(${step.image4})`,
                                  }}></div>
                                <div
                                  className="image"
                                  style={{
                                    backgroundImage: `url(${step.image5})`,
                                  }}></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="leaveacomment">Leave a comment</div>
                      <div className="message">Message</div>
                      <TextArea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Write your comment here..."
                        autoSize={{
                          minRows: 3,
                          maxRows: 5,
                        }}
                      />
                      <div className="button margin0">
                        <p className="save post">Post Comments</p>
                      </div>
                      <div className="cmt">Comments</div>
                      <div className="comments">
                        {comments.map((comment, index) => (
                          <div>
                            <div className="cmt_container" key={index}>
                              <div
                                className="cmt_icon"
                                style={{
                                  backgroundImage: `url(${comment.linkavatar})`,
                                }}></div>
                              <div>
                                <div className="flex">
                                  {" "}
                                  <p className="cmt_name">{comment.name} - </p>
                                  <p className="cmt_date"> {comment.date}</p>
                                </div>

                                <p className="cmt_content">{comment.content}</p>
                              </div>
                            </div>
                            <div className="line topbot"></div>
                          </div>
                        ))}
                      </div>
                      <div className="button_sv margin0 width0">
                        <p className="save post">Load more</p>
                      </div>
                      <br />
                      <br />
                      <br />
                      <br />
                    </div>
                    <div className="flexible2"></div>
                  </div>
                </div>

                <div className="col scot2 ">
                  <Search
                    placeholder="Find more recipes..."
                    onSearch={onSearch}
                    style={{
                      width: "100%",
                      height: "30px",
                    }}
                  />

                  <div className="igre">Ingredients:</div>
                  <div className="ingredients-list">
                    {igredients.map((ingredient, index) => (
                      <div className="ingredient-item" key={index}>
                        <div
                          className="flex clickable"
                          onClick={() =>
                            openLink(ingredient.link, ingredient.igredient)
                          }>
                          <div className="ingredient-name">
                            {ingredient.igredient}
                          </div>
                          {ingredient.link === "" ? (
                            <IoMdSearch className="ingredient-icon" />
                          ) : (
                            <MdOpenInNew className="ingredient-icon" />
                          )}
                        </div>

                        <div className="ingredient-quantity">
                          {ingredient.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="line topbotl"></div>
                  <div className="igre">Discover Others</div>

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
                    }></DisplayItem>
                  <br />
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
                    }></DisplayItem>
                </div>
              </div>
            </div>
          </main>
        </div>
      </ConfigProvider>
    );
  }
}
export default SingleRecipe;
