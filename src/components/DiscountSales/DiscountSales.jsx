import { useEffect, useState } from "react";
import { squashData } from "../../utils/utils";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

const DiscountSales = ({ data: inputData }) => {
  const [discountData, setDiscountData] = useState([]);

  // Graph Quantity vs Discount or Graph Quantity vs Product Name
  useEffect(() => {
    if (inputData) {
      // console.log(inputData);
      setDiscountData(squashData(inputData, "Discount", "Quantity"));
      // console.log(squashData(inputData, "Product Name"));
    }
  }, [inputData]);

  const data = {
    datasets: [
      {
        label: "Discounts",
        backgroundColor: "rgb(77,110,215)",
        borderColor: "rgb(255, 99, 132)",
        data: discountData,
        showLine: true,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "A chart to display the relationship between units sold and discount applied",
        color: "rgb(92,200,176)",
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Discount",
          color: "rgb(92,200,176)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.4)",
          borderColor: "rgba(255, 255, 255, 0.4)",
        },
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: "Quantity",
          color: "rgb(92,200,176)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.4)",
          borderColor: "rgba(255, 255, 255, 0.4)",
        },
      },
    },
  };

  return (
    <div className="panel">
      <Scatter data={data} options={options} />
    </div>
  );
};

export default DiscountSales;
