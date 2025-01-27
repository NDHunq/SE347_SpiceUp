import { Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Home from "./components/User/Home/Home";
import About from "./components/User/About/About";
import SignIn from "./components/Auth/signIn";
import SignUp from "./components/Auth/signUp";
import ForgetPassword from "./components/Auth/forgetPass";
import NewPassword from "./components/Auth/newPass";
import Shop from "./components/User/Shop/shop";
import Recipe from "./components/User/Recipe/recipe";

import Contact from "./components/User/Contact/contact";
import Error from "./components/User/Error/error";
import Account from "./components/User/Account/account";
import Setting from "./components/User/Account/AccountFeature/Setting/setting";
import MyRecipe from "./components/User/Account/AccountFeature/MyRecipes/myrecipe";
import OrderHistory from "./components/User/Account/AccountFeature/OderHistory/order";
import DetailOrder from "./components/User/Account/AccountFeature/OderHistory/DetailOrder/DetailOrder";
import Cart from "./components/User/Cart/Cart";
import Checkout from "./components/User/Cart/Checkout/Checkout";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import SingleRecipe from "./components/User/SingleRecipe/singleRecipe";

import NewRecipe from "./components/User/New Recipe/newRecipe";
import AppAdmin from "./AppAdmin";
import HomeAdmin from "./components/Admin/Home/Home";
import RecipeAdmin from "./components/Admin/Recipe/recipe";
import SingleRecipeAdmin from "./components/Admin/SingleRecipe/singleRecipe";
import ShopAdmin from "./components/Admin/Shop/Shop";
import NewRecipeAdmin from "./components/Admin/New Recipe/newRecipe";
import NotFound from "./components/User/Error/error"; // New 404 page component

const AdminRoute = ({ children }) => {
  const userRole = localStorage.getItem("role"); // Or sessionStorage if preferred
  return userRole === "RS2" ? children : <Navigate to="/404" replace />;
};

const Layout = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="home" element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="recipes" element={<Recipe />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Error />} />
          <Route path="singlerecipe" element={<SingleRecipe />} />
          <Route path="newrecipe" element={<NewRecipe />} />
          <Route path="account" element={<Account />}>
            <Route path="settings" element={<Setting />} />
            <Route path="myrecipes" element={<MyRecipe />} />
            <Route path="order" element={<OrderHistory />} />
            <Route path="order/:id" element={<DetailOrder />} />
          </Route>
          <Route path="shopping-cart" element={<Cart />} />
          <Route path="shopping-cart/checkout" element={<Checkout />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AppAdmin />
            </AdminRoute>
          }
        >
          <Route path="home" element={<HomeAdmin />} />
          <Route path="shop" element={<ShopAdmin />} />
          <Route path="recipes" element={<RecipeAdmin />} />
          <Route path="singlerecipe" element={<SingleRecipeAdmin />} />
          <Route path="newrecipe" element={<NewRecipeAdmin />} />
        </Route>

        {/* Authentication Routes */}
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forget-password" element={<ForgetPassword />} />
        <Route path="new-password" element={<NewPassword />} />

        {/* 404 Page */}
        <Route path="/404" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Layout;
