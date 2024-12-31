import React, { useState, useEffect } from "react";
import "./account.css";
import Header from "../widget/top";
import { MdDashboard } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { MdHistory } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";

import {
  Link,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Settings from "./AccountFeature/Setting/setting";
import MyRecipe from "./AccountFeature/MyRecipes/myrecipe";
import OrderHistory from "./AccountFeature/OderHistory/order";
import DetailOrder from "./AccountFeature/OderHistory/DetailOrder/DetailOrder";
function Account() {
  const location = useLocation();
  const navigate = useNavigate();

  const [navItems, setNavItems] = useState([
    { link: "/account/settings", text: "Account" },
    { link: "/account/settings", text: "Settings" },
  ]);

  useEffect(() => {
    const currentPath = location.pathname;
    let currentText = "Settings";

    if (currentPath.includes("myrecipes")) {
      currentText = "My Recipes";
    } else if (currentPath.includes("order")) {
      currentText = "Order History";
    }

    const isDetailOrder = /\/account\/order\/\d+/.test(currentPath);
    console.log(navItems);

    if (isDetailOrder) {
      setNavItems((prevItems) => {
        const updatedItems = prevItems.filter(
          (item) => !item.link.includes("/account/order/")
        );
        return [...updatedItems, { link: currentPath, text: "Detail Order" }];
      });
    } else
      setNavItems((prevItems) => {
        return [prevItems[0], { link: currentPath, text: currentText }];
      });
  }, [location.pathname]);

  const handleNavItemClick = (text, path) => {
    setNavItems((prevItems) => [
      ...prevItems.slice(0, -1),
      { link: path, text: text },
    ]);
    navigate(path);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <div className="recipes">
      <Header navItems={navItems} />

      <main className="content">
        <div className="container">
          <div className="row">
            <div className="col-3 cot1a">
              <p className="txtnaavi">Navigation</p>
              <Link
                className={`Navi ${
                  location.pathname === "/account/settings" ? "active" : ""
                }`}
                to="settings"
                onClick={() =>
                  handleNavItemClick("Settings", "/account/settings")
                }>
                <IoMdSettings className="imgacc" />
                <p className="txtnaa">Setting</p>
              </Link>
              <Link
                className={`Navi ${
                  location.pathname === "/account/myrecipes" ? "active" : ""
                }`}
                to="myrecipes"
                onClick={() =>
                  handleNavItemClick("My Recipes", "/account/myrecipes")
                }>
                <MdDashboard className="imgacc" />
                <p className="txtnaa">My Recipes</p>
              </Link>
              <Link
                className={`Navi ${
                  location.pathname.includes("/account/order") ? "active" : ""
                }`}
                to="order"
                onClick={() =>
                  handleNavItemClick("Order History", "/account/order")
                }>
                <MdHistory className="imgacc" />
                <p className="txtnaa">Order History</p>
              </Link>
              <div className="Navi bot10px" onClick={handleLogout}>
                <LuLogOut className="imgacc" />
                <p className="txtnaa">Log-out</p>
              </div>
            </div>

            <div className="col cot2 cot22">
              <Routes>
                <Route path="settings" element={<Settings />} />
                <Route path="myrecipes" element={<MyRecipe />} />
                <Route path="order" element={<OrderHistory />} />
                <Route path="order/:id" element={<DetailOrder />} />
              </Routes>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Account;
