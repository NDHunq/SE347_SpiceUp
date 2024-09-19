import { Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./components/User/Home/Home";
import About from "./components/User/About/About";
import SignIn from "./components/Auth/signIn";
import SignUp from "./components/Auth/signUp";
import ForgetPassword from "./components/Auth/forgetPass";
import NewPassword from "./components/Auth/newPass";
import Shop from "./components/User/Shop/shop";
import Recipe from "./components/User/Recipe/recipe";
import Account from "./components/User/Account/account";
import Setting from "./components/User/Account/AccountFeature/Setting/setting";
import MyRecipe from "./components/User/Account/AccountFeature/MyRecipes/myrecipe";
import OrderHistory from "./components/User/Account/AccountFeature/OderHistory/order";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleRecipe from "./components/User/SingleRecipe/singleRecipe";

const Layout = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/singlerecipe" element={<SingleRecipe />} />

          <Route path="/recipes" element={<Recipe />}></Route>
          <Route path="/account" element={<Account />}>
            <Route path="/account/settings" element={<Setting />} />
            <Route path="/account/myrecipes" element={<MyRecipe />} />
            <Route path="/account/order" element={<OrderHistory />} />
          </Route>
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
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
