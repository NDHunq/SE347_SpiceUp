import { toast } from "react-toastify";
import Header from "../widget/top";
import { Link } from "react-router-dom";
import "./error.scss";

function error() {
  return (
    <>
      <div className="ERR-container">
        <div className="err"></div>
        <Link to="/home">
          <div className="home">Back to Home</div>
        </Link>
      </div>
    </>
  );
}

export default error;
