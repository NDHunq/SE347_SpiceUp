import { Outlet } from "react-router";
import "./AppAdmin.scss";
import Header from "./components/Admin/Header/Header";
import Footer from "./components/User/Footer/footer";

function AppAdmin() {
  return (
    <div className="app-admin-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <Outlet />
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default AppAdmin;
