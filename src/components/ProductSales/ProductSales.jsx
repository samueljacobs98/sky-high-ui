import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { useEffect, useState } from "react";
import { squashData } from "../../utils/utils";
import Select from "../Select/Select";
ChartJS.register(...registerables);

const ProductSales = ({ data: inputData }) => {
  const [sortedData, setSortedData] = useState([]);
  const [sortDataAscending, setSortDataAscending] = useState(false);
  // console.log(inputData);
  // 0: Product Name, 1: Quantity, 2: Discount

  useEffect(() => {
    const sortMethods = [
      (a, b) => a.y - b.y,
      (a, b) => b.y - a.y,
      // (a, b) => a.x.toUpperCase().localeCompare(b.x.toUpperCase()),
    ];
    if (inputData) {
      setSortedData(
        squashData(inputData, "Product Name", "Quantity")
          .sort(sortMethods[sortDataAscending ? 0 : 1])
          .slice(0, 10)
      );
    }
  }, [inputData, sortDataAscending]);

  const data = {
    labels: sortedData.map((item) => item.x),
    datasets: [
      {
        backgroundColor: "rgb(77,110,215)",
        borderColor: "rgb(255, 99, 132)",
        data: sortedData.map((item) => item.y),
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: `Top 10 selling products`,
        color: "rgb(92,200,176)",
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.4)",
          borderColor: "rgba(255, 255, 255, 0.4)",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.4)",
          borderColor: "rgba(255, 255, 255, 0.4)",
        },
      },
    },
  };

  const selectOptions = ["Top 10 Products", "Bottom 10 Products"];

  const onChange = (e) => {
    switch (e.target.value) {
      case selectOptions[0]:
        setSortDataAscending(false);
        break;
      case selectOptions[1]:
        setSortDataAscending(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="panel">
      <Bar data={data} options={options} />
      <Select options={selectOptions} onChange={onChange} />
    </div>
  );
};

export default ProductSales;
