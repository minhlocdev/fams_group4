import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Legend,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
} from "chart.js";
import theme from "../../assets/theme";
ChartJS.register(
  Title,
  Legend,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement
);
const BarChart = ({ userData }) => {
  const {
    activeSyllabus,
    activeTrainer,
    activeTraining,
    inactiveSyllabus,
    inactiveTrainer,
    inactiveTraining,
    openingClass,
    planningClass,
  } = userData || {};
  const active = [activeTrainer, openingClass, activeSyllabus, activeTraining];
  const inactive = [
    inactiveTrainer,
    planningClass,
    inactiveSyllabus,
    inactiveTraining,
  ];
  const data = {
    labels: ["Trainer", "Class", "Syllabus", "Training Program"],
    datasets: [
      {
        label: "Active/Opening",
        data: active,
        backgroundColor: "#7eff93",
        borderColor: theme.green,
        borderWidth: 1,
      },
      {
        label: "Inactive/Planning",
        data: inactive,
        backgroundColor: "#fbb185",
        borderColor: theme.orange,
        borderWidth: 1,
      },
    ],
  };
  const config = {
    type: "bar",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Bar Chart",
        },
      },
    },
  };
  return (
    <div style={{ width: "80%", margin: "auto", height: "400px" }}>
      <Bar data={data} options={config} />
    </div>
  );
};

export default BarChart;
