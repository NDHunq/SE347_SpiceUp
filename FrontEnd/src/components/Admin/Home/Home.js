import "./Home.scss";
import React from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');
dayjs.extend(customParseFormat);

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const dateFormat = "DD-MM-YYYY";
const { RangePicker } = DatePicker;

const Home = (props) => {
  const currentDate = dayjs();

  // Lấy ngày cuối cùng của tháng trước
  const lastDayOfPreviousMonth = currentDate
    .subtract(1, "month")
    .endOf("month");
  const dateFormat = "DD-MM-YYYY";
  const monthFormat = "MM-YYYY";

  // Định dạng ngày theo định dạng "DD-MM-YYYY"
  const formattedDate = lastDayOfPreviousMonth.format(dateFormat);
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light1", // "light1", "dark1", "dark2"
    title: {
      text: "Bounce Rate by Week of Year",
    },
    axisY: {
      title: "Bounce Rate",
      suffix: "%",
    },
    axisX: {
      title: "Month",
      prefix: "T",
      interval: 2,
    },
    data: [
      {
        type: "line",
        toolTipContent: "Week {x}: {y}%",
        dataPoints: [
          { x: 1, y: 64 },
          { x: 2, y: 61 },
          { x: 3, y: 64 },
          { x: 4, y: 62 },
          { x: 5, y: 64 },
          { x: 6, y: 60 },
          { x: 7, y: 58 },
          { x: 8, y: 59 },
          { x: 9, y: 53 },
          { x: 10, y: 54 },
          { x: 11, y: 61 },
          { x: 12, y: 60 },
          { x: 13, y: 55 },
          { x: 14, y: 60 },
          { x: 15, y: 56 },
          { x: 16, y: 60 },
          { x: 17, y: 59.5 },
          { x: 18, y: 63 },
          { x: 19, y: 58 },
          { x: 20, y: 54 },
          { x: 21, y: 59 },
          { x: 22, y: 64 },
          { x: 23, y: 59 },
        ],
      },
    ],
  };
  const newRecipes = [{}, {}, {}, {}];
  return (
    <div className="home-admin-container">
      <main className="content">
        <div className="container">
          <div className="title">
            <h2>
              <strong>Dashboard</strong>
            </h2>
            <DatePicker
              size={"large"}
              className="date"
              picker="month"
              format={monthFormat}
              activeBg={"#00B207"}
              maxDate={dayjs(formattedDate, dateFormat)}
            />
          </div>
          <div className="number">
            <div className="col-4 left">
              <div className="tex">500M</div>
              <div className="per">+30%</div>
              <div className="num">Customer</div>
            </div>
            <div className="col-8 right">
              <div className="top-right">
                <div className="col top-right-child">
                  {" "}
                  <div className="num">Income</div>{" "}
                  <div className="tex">2M $</div>
                </div>
                <div className="col top-right-child">
                  {" "}
                  <div className="num">Products sold</div>{" "}
                  <div className="tex">300K</div>
                </div>
                <div className="col top-right-child">
                  {" "}
                  <div className="num">Recipe views</div>{" "}
                  <div className="tex">1.5M</div>
                </div>
              </div>
              <div className="bot-right">
                <div className="col bot-right1">
                  <div className=" image">
                    <div className="numb">420</div>
                  </div>
                  <div className=" name">
                    <div className="text1">Recipes</div>
                    <span className="text2">View all</span>
                  </div>
                </div>
                <div className="col bot-right2">
                  {" "}
                  <div className=" image">
                    <div className="numb">250</div>
                  </div>
                  <div className=" name">
                    <div className="text1">Products</div>
                    <span className="text2">View all</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="title">
            <h2>
              <strong>Chart</strong>
            </h2>
            <RangePicker
              picker="month"
              className="date"
              size={"large"}
              activeBg={"#00B207"}
              format={monthFormat}
              maxDate={dayjs(formattedDate, dateFormat)}
            />
          </div>
          <div className="chart">
            <CanvasJSChart
              options={options}
              /* onRef={ref => this.chart = ref} */
            />
            {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
          </div>
          <div className="title">
            <h2>
              <strong>New recipes</strong>
            </h2>
            <div
              style={{
                border: "2px solid #00B207",
                borderRadius: "20px",
                padding: "7px 15px",
                fontWeight: "600",
                color: "#00B207",
                cursor: "pointer",
              }}>
              View All
            </div>
          </div>
          <div className="new-recipe">
            {newRecipes.map((recipe, index) => {
              return <div className="col-3 recipe"></div>;
            })}
          </div>
        </div>
      </main>
    </div>
  );
};
export default Home;
