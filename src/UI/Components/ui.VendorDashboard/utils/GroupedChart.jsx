import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#333",
      },
    },
    title: {
      display: true,
      text: "Top Category",
      font: {
        size: 18,
        weight: "bold",
      },
      color: "#333",
    },
  },
  scales: {
    x: {
      stacked: false, // Grouped bars
      ticks: {
        color: "#555",
      },
      grid: {
        color: "#eee",
      },
    },
    y: {
      stacked: false,
      ticks: {
        color: "#555",
      },
      grid: {
        color: "#eee",
      },
    },
  },
};

const labels = ["Electronics", "Fashion", "Grocery", "Home Decor", "Beauty", "Sports"];

const data = {
  labels,
  datasets: [
    {
      label: "Online Sales",
      data: [850, 630, 450, 720, 560, 380],
      backgroundColor: "rgba(75, 192, 192, 0.7)",
    },
    {
      label: "In-Store Sales",
      data: [650, 580, 390, 680, 520, 340],
      backgroundColor: "rgba(53, 162, 235, 0.7)",
    },
    {
      label: "Returns",
      data: [120, 80, 60, 90, 40, 30],
      backgroundColor: "rgba(255, 99, 132, 0.7)",
    },
  ],
};

const TopCategoryChart = () => {
  return (
    <div className="w-full px-10">
      <Bar options={options} data={data} style={{width: '90%', height: '100vh'}} />
    </div>
  );
};

export default TopCategoryChart;
