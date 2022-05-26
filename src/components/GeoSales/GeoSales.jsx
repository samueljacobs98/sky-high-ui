import { useState, useEffect } from "react";
// import { squashData } from "../../utils/utils";
import "./GeoSales.scss";

const GeoSales = ({ data: inputData }) => {
  const filterOptions = ["City", "State", "Region"];
  const [filter, setFilter] = useState(filterOptions[0]);
  const [data, setData] = useState([]);
  // console.log(inputData);
  // 0: Sales, 1: Profit, 2: City, 3: Region, 4: State
  // Show sales by city - bar chart
  // Show sales by state - pie chart
  // show sales by region - pie chart

  console.log(inputData);

  useEffect(() => {
    if (inputData) {
      // console.log(inputData);
      // setData();
      // console.log(squashData(inputData, "Product Name"));
    }
  }, [inputData]);

  const updateFilter = (e) => {
    setFilter(e.target.value);
  };

  const barChartJSX = () => {
    return <p>Test1</p>;
  };

  const pieChartJSX = () => {
    return <p>Test2</p>;
  };

  return (
    <div className="panel">
      {filter === "City" ? barChartJSX() : pieChartJSX()}
      <div className="panel__filter">
        <label htmlFor="select-filter">Select Filter</label>
        <select name="select-filter" id="select-filter" onChange={updateFilter}>
          <option value={filterOptions[0]}>{filterOptions[0]}</option>
          <option value={filterOptions[1]}>{filterOptions[1]}</option>
          <option value={filterOptions[2]}>{filterOptions[2]}</option>
        </select>
      </div>
    </div>
  );
};

export default GeoSales;
