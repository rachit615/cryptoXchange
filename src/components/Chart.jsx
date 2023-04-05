import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  LineElement,
  Tooltip,
  Legend
);

const Chart = ({ arr = [], currency, days }) => {
  const prices = [];
  const dates = [];
  let border_color = "red";
  for (let i = 0; i < arr.length; i++) {
    if (days === "1") {
      dates.push(new Date(arr[i][0]).toLocaleTimeString());
    } else {
      dates.push(new Date(arr[i][0]).toLocaleDateString());
    }
    prices.push(arr[i][1]);
  }
  if (prices[0] < prices[prices.length - 1]) {
    border_color = "#26D7AB";
  }

  const data = {
    labels: dates,
    datasets: [
      {
        label: `Price in ${currency}`,
        data: prices,
        borderColor: border_color,
        backgroundColor: border_color,
      },
    ],
  };

  return (
    <Line
      options={{
        responsive: true,
      }}
      data={data}
    />
  );
};

export default Chart;
