import { Outlet } from "react-router";
import "./App.css";
import Header2 from "./components/User/Header/Header2";
import Header1 from "./components/User/Header/Header1";
import Header from "../src/components/Admin/Header/Header";
import Footer from "./components/User/Footer/footer";
import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [role, setRole] = useState("");
  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b207",
        },
      }}
    >
      <div className="app-container">
        <div className="header-container">
          {isLoggedIn ? role === "RS2" ? <Header /> : <Header2 /> : <Header1 />}
        </div>
        <div className="main-container">
          <Outlet />
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
