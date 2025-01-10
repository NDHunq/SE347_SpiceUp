import React, { useState } from "react";
import "./signIn.scss";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Header1 from "../User/Header/Header1";
import Footer from "../User/Footer/footer";
import { signIn } from "../../services/authServices";
import instance from "../../utils/axiosCustomize";
import { useDispatch } from 'react-redux';
import {setTotalCartItem} from "../../redux/reducer/qtyInCart"
function SignIn() {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {

    const response = await signIn({
      email: userName,
      password: password,
    });

    if (response.status !== 200) {
      toast.error("Wrong email or password");
      return;
    }
    console.log(response.data)
    localStorage.setItem("jwt", response.data.data.jwt);
    localStorage.setItem("user_id", response.data.data.user_id);
    localStorage.setItem("email", response.data.data.email);
    localStorage.setItem("avatar", response.data.data.avatar);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", response.data.data.role);

    toast.success("Sign in successfully");

    if (response.data.data.role === "RS2") {
      navigate("/admin/home");
    } else {
      const fetchCart = async () => {
        try {
          const cartResponse = await instance.get(`api/v1/cartItem/user/${response.data.data.user_id}`);
          console.log(cartResponse.data.data.data);
          const cartItems=cartResponse.data.data.cartItems;
          let total = 0;
          cartItems.map(item => {
            total += item.quantities;
          });
          console.log(total);
          dispatch(setTotalCartItem(total));
  
          // Dispatch to Redux or handle cart data as required
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      };
  
      await fetchCart();
      navigate("/home");
    }
  };
  return (
    <>
      <Header1 />
      <div className="center-si">
        <div className="container">
          <h1 className="title">
            <b>Sign In</b>
          </h1>
          <div>
            <input
              className="email"
              type="email"
              name="Username"
              placeholder="Email"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>
          <div>
            <input
              className="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="show-password">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(event) => setShowPassword(event.target.checked)}
            />
            Show Password
          </div>
          <div>
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              <span className="checkmark"></span>
              Remember Me
            </label>
            <Link to="/forget-password" className="forget-pass">
              Forget password
            </Link>
          </div>

          <button className="submit" onClick={handleSubmit}>
            Sign In
          </button>
          {/* <div className="group-icon">
            <Link to="/signin/google">
              <div className="gg"></div>
            </Link>
            <Link to="/signin/facebook">
              <div className="fb"></div>
            </Link>
          </div> */}
          <div className="sign-upp">
            Do you have any account?{" "}
            <Link className="linkk" to="/signup">
              {" "}
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignIn;
