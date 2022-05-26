import Select from "../Select/Select";
import { squashData, getValues } from "../../utils/utils";
import { useState, useEffect, useRef } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import "./CategorySales.scss";
ChartJS.register(...registerables);

const CategorySales = ({ data: inputData }) => {
  const filterOptions = ["Category", "Sub-Category"];
  const [filter, setFilter] = useState(filterOptions[0]);
  const [subFilter, setSubFilter] = useState("None");
  const [labelData, setLabelData] = useState([]);
  const [slicesValue, setSlicesValue] = useState([]);
  const categories = useRef([]);

  useEffect(() => {
    if (inputData) {
      let unfilteredData = [...inputData];

      if (subFilter !== "None" && filter === "Sub-Category") {
        unfilteredData = unfilteredData.filter(
          (item) => item["Category"] === subFilter
        );
      }

      const filteredData = squashData(unfilteredData, filter, "Quantity");

      const total = filteredData.reduce((acc, cur) => acc + cur.y, 0);
      setLabelData(filteredData.map((item) => item.x));
      setSlicesValue(filteredData.map((item) => (100 * item.y) / total));
    }
  }, [inputData, filter, subFilter]);

  useEffect(() => {
    categories.current = getValues(inputData, "Category").map((cat) => cat);
  }, [categories, inputData]);

  const updateFilter = (e) => {
    setFilter(e.target.value);
  };

  const updateSubFilter = (e) => {
    setSubFilter(e.target.value);
  };

  const data = {
    labels: labelData,
    datasets: [
      {
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
        text: `A chart to display the relationship between sales % and ${filter.toLowerCase()}`,
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
      <Select options={filterOptions} onChange={updateFilter} />
      {filter === "Sub-Category" && (
        <Select
          options={["None", ...categories.current]}
          onChange={updateSubFilter}
        />
      )}
    </div>
  );
};

export default CategorySales;
