import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { useEffect, useState } from "react";
import { getYearlyData, getYears } from "../../utils/utils";
import {
  backgroundColor,
  borderColor,
  monthLabels as labels,
} from "../../assets/data/data";
ChartJS.register(...registerables);

const TimelineSales = ({ data: inputData }) => {
  const [years, setYears] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);

  useEffect(() => {
    const yearsFromData = getYears(inputData);
    setYears(yearsFromData);
  }, [inputData]);

  useEffect(() => {
    const newData = getYearlyData(inputData, years);
    setYearlyData(newData);
  }, [inputData, years]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: `Relationship between calender month and number of sales`,
        color: "rgb(92,200,176)",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
          color: "rgb(92,200,176)",
        },
        ticks: {
          color: "rgb(200, 169, 92)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Sales",
          color: "rgb(92,200,176)",
        },
        type: "linear",
        display: true,
        position: "left",
        grid: {
          color: "rgba(255, 255, 255, 0.4)",
          borderColor: "rgba(255, 255, 255, 0.4)",
        },
        ticks: {
          color: "rgb(200, 169, 92)",
        },
      },
    },
  };

  const datasets = years.map((year, index) => {
    return {
      label: yearlyData[index]?.year,
      data: yearlyData[index]?.data,
      borderColor: borderColor[index],
      backgroundColor: backgroundColor[index],
      yAxisID: "y",
    };
  });

  const data = {
    labels,
    datasets,
  };

  return (
    <div className="panel">
      <Line data={data} options={options} redraw={true} />
    </div>
  );
};

export default TimelineSales;
