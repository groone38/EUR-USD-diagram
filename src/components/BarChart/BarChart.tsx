import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { DataResponse } from "../../types/Response";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

interface AreaChartProps {
  data: DataResponse[];
  labels: string[];
}

const AreaChart = ({ data, labels }: AreaChartProps) => {
  const values = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Open/Close",
        data: data?.map((item: DataResponse) => item?.o),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Line options={options} data={values} />;
};

export default AreaChart;
