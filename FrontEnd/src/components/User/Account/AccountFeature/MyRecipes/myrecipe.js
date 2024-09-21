import React, { useEffect, useState } from "react";

import { ConfigProvider } from "antd";
import { Pagination } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import "./myrecipe.css";
import SaveItem from "./SaveItem/SaveItem";
import DisplayItem from "../../../Recipe/display_item/displayItem";
const MyRecipe = () => {
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
      <div className="ccontainer">
        <p className="txtnacc txtna2">Saved Recipess</p>
        <div className="linee"> </div>
        <div>
          <div className="srecipe_container">
            <SaveItem
              imagelink={
                "https://elmich.vn/wp-content/uploads/2024/01/sinh-to-xoai-chuoi-2.jpg"
              }
              issave={true}
              istrue={true}
              name={"Xoài chuối kiwwi táo ổi cóc xoài"}
              id={"1234"}
            />
            <SaveItem
              imagelink={
                "https://elmich.vn/wp-content/uploads/2024/01/sinh-to-xoai-chuoi-2.jpg"
              }
              issave={true}
              istrue={true}
              name={"Xoài chuối kiwwi táo ổi cóc xoài"}
              id={"1234"}
            />
            <SaveItem
              imagelink={
                "https://elmich.vn/wp-content/uploads/2024/01/sinh-to-xoai-chuoi-2.jpg"
              }
              issave={true}
              istrue={true}
              name={"Xoài chuối kiwwi táo ổi cóc xoài"}
              id={"1234"}
            />
          </div>
          <Pagination align="center" defaultCurrent={1} total={50} />
          <br />
        </div>
      </div>
      <div className="ccontainer">
        <div className="flex cao1ti">
          {" "}
          <p className="txtnacc txtna2">My Recipes</p>
          <div className=" tinhchinh">Upload</div>
        </div>

        <div className="linee"> </div>
        <div>
          <div className="srecipe_container">
            <SaveItem
              imagelink={
                "https://elmich.vn/wp-content/uploads/2024/01/sinh-to-xoai-chuoi-2.jpg"
              }
              issave={false}
              istrue={true}
              name={"Xoài chuối kiwwi táo ổi cóc xoài"}
            />
            <SaveItem
              imagelink={
                "https://elmich.vn/wp-content/uploads/2024/01/sinh-to-xoai-chuoi-2.jpg"
              }
              issave={false}
              istrue={true}
              name={"Xoài chuối kiwwi táo ổi cóc xoài"}
            />
            <SaveItem
              imagelink={
                "https://elmich.vn/wp-content/uploads/2024/01/sinh-to-xoai-chuoi-2.jpg"
              }
              issave={false}
              istrue={true}
              name={"Xoài chuối kiwwi táo ổi cóc xoài"}
            />
          </div>
          <Pagination align="center" defaultCurrent={1} total={50} />
          <br />
        </div>
      </div>
      <br />

      <br />
      <br />
      <br />
    </ConfigProvider>
  );
};

export default MyRecipe;
