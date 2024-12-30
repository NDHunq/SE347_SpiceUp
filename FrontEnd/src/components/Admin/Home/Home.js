import React, { useEffect, useState } from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { getAnalysis, getAnalysis2 } from "../../../services/adminServices";
import LatestRecipe from "../../User/Home/LatestRecipe";
import { useNavigate } from "react-router";

var CanvasJSReact = require("@canvasjs/react-charts");
dayjs.extend(customParseFormat);

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const dateFormat = "DD-MM-YYYY";
const { RangePicker } = DatePicker;

const Home = (props) => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [data, setData] = useState({});
  const currentDate = dayjs();
  const nav = useNavigate();

  const handleDateChange = async (date) => {
    if (date) {
      const month = date.month() + 1; // month() is zero-indexed
      const year = date.year(); // year() returns the year as a number
      setSelectedMonth(month);
      setSelectedYear(year);
      const dataAnalys = await getAnalysis(month, year);

      setData(dataAnalys.data);
      console.log("Selected Month:", typeof month);
      console.log("Selected Year:", typeof year);
      console.log("dataAnalys", dataAnalys.data);
    } else {
      console.log("No date selected");
    }
  };

  // Lấy ngày cuối cùng của tháng trước
  const lastDayOfPreviousMonth = currentDate
    .subtract(1, "month")
    .endOf("month");
  const dateFormat = "DD-MM-YYYY";
  const monthFormat = "MM-YYYY";
  const yearFormat = "YYYY";
  const [listRecipe, setListRecipe] = React.useState([]);
  const [listProduct, setListProduct] = React.useState([]);
  const [year, setYear] = React.useState(2024);
  const onYearChange = (e) => {
    if (e == null) return;
    setYear(e.year());
  };
  useEffect(() => {
    const fetchData = async () => {
      if (year == null) return;
      const data = await getAnalysis2(year);
      const recipes = data.map((item) => ({
        x: item.month,
        y: item.totalRecipes,
      }));
      const products = data.map((item) => ({
        x: item.month,
        y: item.totalProducts,
      }));
      setListRecipe(recipes);
      setListProduct(products);
      console.log("data", data);
      console.log("recipes", listRecipe);
      console.log("products", listProduct);
    };
    if (year != null) {
      fetchData();
    }
  }, [year]);

  // Định dạng ngày theo định dạng "DD-MM-YYYY"
  const formattedDate = lastDayOfPreviousMonth.format(dateFormat);
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light1", // "light1", "dark1", "dark2"
    title: {
      text: "Number of products and recipes in a years",
    },
    axisY: {
      title: "Number",
    },
    axisX: {
      title: "Month",
      interval: 1,
    },
    data: [
      {
        type: "line",
        toolTipContent: "{y} products",
        dataPoints: listProduct,
      },
      {
        type: "line",
        toolTipContent: " {y} recipes",
        dataPoints: listRecipe,
      },
    ],
  };
  const newRecipes = [{}, {}, {}, {}];

  useEffect(() => {
    const getDefaultData = async () => {
      try {
        const dataAnalys = await getAnalysis(dayjs().month, dayjs().year - 1);
        setData(dataAnalys.data);
      } catch (e) {
        console.log("Error in getting data", e);
      }
    };

    getDefaultData();
  }, []);
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
              defaultValue={dayjs()}
              onChange={handleDateChange}
            />
          </div>
          <div className="number">
            <div className="col-4 left">
              <div className="tex">{data.totalCustomers}</div>
              <div className="per">+30%</div>
              <div className="num">Customer</div>
            </div>
            <div className="col-8 right">
              <div className="top-right">
                <div className="col top-right-child">
                  {" "}
                  <div className="num">Income</div>{" "}
                  <div className="tex">{`${data.profit / 1000000}M $`}</div>
                </div>
                <div className="col top-right-child">
                  {" "}
                  <div className="num">Products sold</div>{" "}
                  <div className="tex">{`${data.productsSoldOut}K`}</div>
                </div>
                <div className="col top-right-child">
                  {" "}
                  <div className="num">Recipe views</div>{" "}
                  <div className="tex">{`${data.recipeViews}K`}</div>
                </div>
              </div>
              <div className="bot-right">
                <div className="col bot-right1">
                  <div className=" image">
                    <div className="numb">{`${data.totalRecipes}K`}</div>
                  </div>
                  <div className=" name">
                    <div className="text1">Recipes</div>
                    <span className="text2">View all</span>
                  </div>
                </div>
                <div className="col bot-right2">
                  {" "}
                  <div className=" image">
                    <div className="numb">{`${data.totalProducts}K`}</div>
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
            <DatePicker
              size={"large"}
              className="date"
              picker="year"
              format={yearFormat}
              defaultValue={dayjs(year.toString(), yearFormat)}
              activeBg={"#00B207"}
              onChange={(e) => onYearChange(e)}
              maxDate={dayjs(formattedDate, dateFormat)}
            />
          </div>

          <div className="chart">
            <CanvasJSChart
              options={options}
              onRef={(ref) => (this.chart = ref)}
            />
            You can get reference to the chart instance as shown above using
            onRef. This allows you to access all chart properties and methods
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
              }}
              onClick={() => nav("/admin/recipes")}
            >
              View All
            </div>
          </div>
          <LatestRecipe isAdmin={true} />
        </div>
      </main>
    </div>
  );
};

// const Home = (props) => {
//   return (
//     <div>ProblematicComponent is temporarily disabled</div>
//   )
// }
export default Home;
