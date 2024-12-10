import React, { useState, useEffect } from "react";
import { Input, ConfigProvider, Space, message } from "antd"; // Import Input and ConfigProvider from antd
import Header from "../widget/top";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { SlTag } from "react-icons/sl";
import { FaRegClock } from "react-icons/fa6";
import { IoLinkOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { LiaUser, LiaCommentAltSolid } from "react-icons/lia";
import "./singleRecipe.css";
import DisplayItem from "../Recipe/display_item/displayItem";
import { MdOpenInNew } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";

import {
  getARecipe,
  increaseView,
  getComment,
  getUserInfo,
  postComment,
  saveReicpe,
  getAllRecipe,
  getImage,
} from "../../../services/userServices";

const { TextArea, Search } = Input; // Destructure TextArea and Search from Input

function SingleRecipe() {
  const navigate = useNavigate(); // Sử dụng hook useNavigate để điều hướng

  const onSearch = (value) => {
    navigate("/recipes?search=" + value); // Điều hướng đến trang kết quả tìm kiếm với query parameter
  };

  const [value, setValue] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const [navItems, setNavItems] = useState([
    { link: "/recipes", text: "Recipes" },
    { link: `/singlerecipe?id=${id}`, text: "Single Recipe" },
  ]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [tags, setTags] = useState("");
  const [by, setBy] = useState("");
  const [cmt, setcmt] = useState();
  const [views, setViews] = useState(0);
  const [mins, setMins] = useState(0);
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [steps, setSteps] = useState([]);
  const [igredients, setIgredients] = useState([]);
  const [discovers, setDiscovers] = useState([]);
  const [status, setStatus] = useState("RS2");
  const [authorrole, setAuthorrole] = useState("");
  const handlePost = async () => {
    const comment = {
      recipeId: id, // Replace with a valid recipe ID from your database
      email: "example@gmail.com",
      content: value, // Comment content
      image: "675058267c54afebec3c5c00",
      date: new Date().toLocaleDateString(), // Current date
    };

    try {
      // Assuming you have a function to post the comment
      await postComment(comment);
      comment.image = await getImage(comment.image);
      setComments([...comments, comment]);
      setcmt(cmt + 1);

      setValue(""); // Clear the text area after posting the comment
      // Display a success toast message
    } catch (error) {
      console.error("Error posting the comment:", error);
    }
  };
  const userId = "66f6cd4a06a448abe23763e0";
  const handelSave = async () => {
    await saveReicpe(id, {
      user_id: userId,
    });
  };
  const handleCopyLink = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link).then(
      () => {
        message.info("Link copied to clipboard!");
      },
      (err) => {
        message.error("Failed to copy the link: ", err);
      }
    );
  };
  useEffect(() => {
    const getRecipe = async () => {
      try {
        const idd = queryParams.get("id");
        await increaseView(idd);

        const response = await getARecipe(idd);

        const recipe = response.data;
        const url = await getImage(recipe.coverImageId);
        setCoverImage(url);

        setTags(recipe.type);

        setViews(recipe.views);
        setStatus(recipe.status);

        setRecipeName(recipe.recipeName);
        setDate(recipe.createdAt);
        setMins(Math.floor(recipe.cookingTimeInSecond / 60));
        setDescription(recipe.description);

        const steps = [];
        for (const step of recipe.step) {
          const url = [];
          for (const img of step.image) {
            const urlImg = await getImage(img);
            url.push(urlImg);
          }
          steps.push({
            description: step.description,
            image: url,
            stepNumber: step.stepNumber,
          });
        }
        setSteps(steps);
        setIgredients(recipe.ingredients);

        if (recipe.savedUserId.includes(userId)) {
          setIsBookmarked(true);
        } else {
          setIsBookmarked(false);
        }
        const rawuser = await getUserInfo(recipe.userId);
        const user = rawuser.data.userInfo;

        setUserName(user.firstname + " " + user.lastname);
        if (user.role === "R1") {
          setAuthorrole("Admin");
        } else {
          setAuthorrole("User");
        }

        const rawcomments = await getComment(id);
        const comments = [];
        for (const comment of rawcomments.data.comments) {
          const url = await getImage(comment.image);

          comments.push({
            recipeId: comment.recipeId,
            email: comment.email,
            content: comment.content,
            date: new Date(comment.createdAt).toLocaleDateString(),
            image: url,
          });
        }
        // setcmt(comments);
        setcmt(rawcomments.data.comments.length);
        setComments(comments);

        const urlAvatar = await getImage(user.avatar);

        setUserAvatar(urlAvatar);

        const rawallRecipe = await getAllRecipe();
        const allReciperes = [];
        const flag = 0;
        for (const recipee of rawallRecipe.data) {
          if (allReciperes.length === 2) {
            break;
          }
          const rawuserr = await getUserInfo(recipee.userId);
          const userr = rawuserr.data.userInfo;
          const url = await getImage(recipee.coverImageId);
          if (recipee._id !== idd && recipee.status === "RS2") {
            allReciperes.push({
              id: recipee._id,
              name: recipee.recipeName,
              image: url,
              views: recipee.views,
              userName: userr.firstname + " " + userr.lastname,

              cookingTime: Math.floor(recipee.cookingTimeInSecond / 60),
              type: recipee.type,
            });
          }
        }

        // for (const recipee of rawallRecipe) {

        //   flag++;
        //   // }
        // }

        setDiscovers(allReciperes);
      } catch (error) {
        console.error("Error fetching the recipe:", error);
      }
    };
    getRecipe();
  }, []);
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const [comments, setComments] = useState([]);

  const openLink = (link, ingredient) => {
    if (link === "" || link === undefined) {
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
        }}
      >
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
                        }}
                      ></div>
                      <div className="tag_chain">
                        <SlTag className="icon_chain"></SlTag>
                        <div className="txt_chain">{tags}</div>
                        <LiaUser className="icon_chain"></LiaUser>
                        <div className="txt_chain">{authorrole}</div>
                        <LiaCommentAltSolid className="icon_chain"></LiaCommentAltSolid>
                        <div className="txt_chain"> {cmt} comments</div>
                        <LuEye className="icon_chain"></LuEye>
                        <div className="txt_chain">{views} views</div>
                        <FaRegClock className="icon_chain"></FaRegClock>
                        <div className="txt_chain">{mins} mins</div>
                      </div>
                      <div className="title_single">{recipeName}</div>
                      <div className="space_between topbot20px">
                        <div className="tag_chain">
                          <div
                            className="avatar_single"
                            style={{
                              backgroundImage: `url(${userAvatar})`,
                            }}
                          ></div>
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
                          <IoLinkOutline
                            className="link_icon"
                            onClick={handleCopyLink}
                          />

                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark();
                            }}
                            className="bookmarksingle"
                          >
                            {isBookmarked ? (
                              <FaBookmark
                                onClick={handelSave}
                                className="bookmark-icon-single active"
                              />
                            ) : (
                              <FaRegBookmark
                                onClick={handelSave}
                                className="bookmark-icon-single"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="description">{description}</div>
                      <div className="hd ">Cooking instructions</div>
                      <div className="steps">
                        {steps.map((step, index) => (
                          <div className="step_container">
                            <div className="step_icon">{index + 1}</div>
                            <div className="step" key={index}>
                              <div className="content">{step.description}</div>
                              <div className="images">
                                {step.image.map((img, imgIndex) => (
                                  <img
                                    key={imgIndex}
                                    src={img}
                                    className="image"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {status === "RS2" ? (
                        <div>
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
                          <div className="button margin0" onClick={handlePost}>
                            <p className="save post">Post Comments</p>
                          </div>
                        </div>
                      ) : null}

                      <div className="cmt">Comments</div>
                      <div className="comments">
                        {comments.map((comment, index) => (
                          <div>
                            <div className="cmt_container" key={index}>
                              <div
                                className="cmt_icon"
                                style={{
                                  backgroundImage: `url(${comment.image})`,
                                }}
                              ></div>
                              <div>
                                <div className="flex">
                                  {" "}
                                  <p className="cmt_name">{comment.email} - </p>
                                  <p className="cmt_date"> {comment.date}</p>
                                </div>

                                <p className="cmt_content">{comment.content}</p>
                              </div>
                            </div>
                            <div className="line topbot"></div>
                          </div>
                        ))}
                      </div>
                      {/* <div className="button_sv margin0 width0">
                        <p className="save post">Load more</p>
                      </div> */}
                      <br />
                      <br />
                      <br />
                      <br />
                    </div>
                    <div className="flexible2"></div>
                  </div>
                </div>

                <div className="col scot2 ">
                  {status === "RS1" ? (
                    <div className="ccontainer newcon">
                      <div className="rcapp textclred">
                        Recipe is not currently public.
                      </div>
                    </div>
                  ) : null}
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
                          }
                        >
                          <div className="ingredient-name">
                            {ingredient.name}
                          </div>
                          {ingredient.link === "" ||
                          ingredient.link === undefined ? (
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

                  {discovers.map((discover, index) => (
                    <div>
                      <DisplayItem
                        key={index}
                        id={discover.id}
                        istrue={true}
                        isbook={false}
                        ttime={discover.cookingTime}
                        ttag={discover.type}
                        tby={discover.userName}
                        tcomments={discover.views} // Assuming comments count is not available
                        tname={discover.name}
                        tlink={discover.image}
                      />
                      <br></br>
                    </div>
                  ))}
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
