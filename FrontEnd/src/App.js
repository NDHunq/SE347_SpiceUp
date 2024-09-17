import { Outlet } from "react-router";
import "./App.css";
import Header from "./components/User/Header/Header";
function App() {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
