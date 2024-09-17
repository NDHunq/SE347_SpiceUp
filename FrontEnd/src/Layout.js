import { Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./components/User/Home/Home";
import About from "./components/User/About/About";
import SignIn from "./components/Auth/signIn";
import SignUp from "./components/Auth/signUp";
import Shop from "./components/User/Shop/shop";
import Recipe from "./components/User/Recipe/recipe";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />

          <Route path="/recipes" element={<Recipe />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
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
