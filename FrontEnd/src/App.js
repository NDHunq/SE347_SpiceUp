import { Outlet } from "react-router";
import "./App.css";
import Header1 from "./components/User/Header/Header1";
import Footer from "./components/User/Footer/footer";
function App() {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header1 />
      </div>
      <div className="main-container">
        <Outlet />
      </div>
      <div className="footer-container">
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
