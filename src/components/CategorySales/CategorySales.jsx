import Select from "../Select/Select";
import { squashData, getValues } from "../../utils/utils";
import { backgroundColor, borderColor } from "../../assets/data/data";
import { useState, useEffect, useRef } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

const CategorySales = ({ data: inputData }) => {
  const filterOptions = ["Category", "Sub-Category"];
  const [filter, setFilter] = useState(filterOptions[0]);
  const [subFilter, setSubFilter] = useState("All");
  const [labelData, setLabelData] = useState([]);
  const [slicesValue, setSlicesValue] = useState([]);
  const categories = useRef([]);

  useEffect(() => {
    if (inputData) {
      let unfilteredData = [...inputData];

      if (subFilter !== "All" && filter === "Sub-Category") {
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
        backgroundColor,
        borderColor,
        hoverOffset: 4,
        hoverBackgroundColor: "rgba(125, 187, 115, 0.2)",
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: `Relationship between sales % and ${filter.toLowerCase()}`,
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
          options={["All", ...categories.current]}
          onChange={updateSubFilter}
        />
      )}
    </div>
  );
};

export default CategorySales;
