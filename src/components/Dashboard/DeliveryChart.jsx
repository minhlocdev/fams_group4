import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Legend, Tooltip, Title } from "chart.js";
ChartJS.register(Legend, Tooltip, Title);

export default function DeliveryChart({ deliveryType }) {
  const data = {
    labels: [
      "Assignment/Lab",
      "Concept/Lecture",
      "Guide/Review",
      "Test/Quiz",
      "Exam",
      "Seminar/Workshop",
    ],
    datasets: [
      {
        data: deliveryType,
        backgroundColor: [
          "#F4BE37",
          "#FF9F40",
          "#0D2535",
          "#5388D8",
          "#206EE5",
          "#C3C3C3",
        ],
      },
    ],
  };

  const config = {
    type: "pie",
    data: data, // Pass the data object here
    options: {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 2,
      plugins: {
        legend: {
          // Correct plugin name
          position: "bottom",
        },
        title: {
          display: true,
          text: "Time Allocation of Delivery Type",
        },
      },
    },
  };

  return <Pie data={data} options={config.options} />;
}
