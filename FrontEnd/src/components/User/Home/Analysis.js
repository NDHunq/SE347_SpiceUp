import "./Analysis.scss";
import React from "react";
import { Link } from "react-router-dom";

const Analysis = (props) => {
  return (
    <div className="A-container">
      <main className="main">
        <div className="container">
          <div className="row">
            <div className="col ">
              <div className="product">
                {" "}
                <div className="num">3+</div>
                <div className="tex">Years of Hard Work</div>
              </div>
            </div>{" "}
            <div className="col ">
              <div className="product">
                {" "}
                <div className="num">50k+</div>
                <div className="tex">Happy Customer</div>
              </div>
            </div>{" "}
            <div className="col ">
              <div className="product">
                <div className="num">27</div>
                <div className="tex">Qualified Team Member</div>
              </div>
            </div>
            <div className="col ">
              <div className="product">
                {" "}
                <div className="num">7k+</div>
                <div className="tex">Monthly Orders</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Analysis;
