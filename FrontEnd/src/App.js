import { Outlet } from "react-router";
import "./App.css";
import Header1 from "./components/User/Header/Header1";
import Footer from "./components/User/Footer/footer";
import { ConfigProvider } from "antd";
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b207",
        },
      }}>
      <div className="app-container">
        <div className="header-container">
          <Header1 />
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
