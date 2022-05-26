import { useState, useEffect } from "react";
import { squashData } from "../../utils/utils";
import "./GeoSales.scss";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

const GeoSales = ({ data: inputData }) => {
  const filterOptions = ["State", "Region"];
  const [filter, setFilter] = useState(filterOptions[0]);
  const [labelData, setLabelData] = useState([]);
  const [slicesValue, setSlicesValue] = useState([]);

  useEffect(() => {
    if (inputData) {
      const filteredData = squashData(inputData, filter, "Sales");
      const total = filteredData.reduce((acc, cur) => acc + cur.y, 0);
      setLabelData(filteredData.map((item) => item.x));
      setSlicesValue(filteredData.map((item) => item.y / total));
    }
  }, [inputData, filter]);

  const updateFilter = (e) => {
    setFilter(e.target.value);
  };

  const data = {
    labels: labelData,
    datasets: [
      {
        label: "A doughnut Chart",
        data: slicesValue,
        backgroundColor: [
          "rgba(214, 92, 115, 0.2)",
          "rgba(77, 181, 225, 0.2)",
          "rgba(255, 227, 192, 0.2)",
          "rgba(105, 209, 199, 0.2)",
          "rgba(109, 54, 202, 0.2)",
          "rgba(250, 194, 154, 0.2)",
        ],
        borderColor: [
          "rgba(214, 92, 115, 1)",
          "rgba(77, 181, 225, 1)",
          "rgba(255, 227, 192, 1)",
          "rgba(105, 209, 199, 1)",
          "rgba(109, 54, 202, 1)",
          "rgba(250, 194, 154, 1)",
        ],
        hoverOffset: 4,
        hoverBackgroundColor: "rgba(125, 187, 115, 0.2)",
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: `A chart to display the relationship between number of sales sold and ${filter.toLowerCase()}`,
        color: "rgb(92,200,176)",
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="panel">
      <Pie data={data} options={options} />
      <div className="panel__filter">
        <label htmlFor="select-filter">Select Filter</label>
        <select name="select-filter" id="select-filter" onChange={updateFilter}>
          <option value={filterOptions[0]}>{filterOptions[0]}</option>
          <option value={filterOptions[1]}>{filterOptions[1]}</option>
        </select>
      </div>
    </div>
  );
};

export default GeoSales;
