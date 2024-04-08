import React, { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { SyllabusContext } from "../../context/SyllabusContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TimeAllocation({ control, timeallocation }) {
  const { timeAllocation } = useContext(SyllabusContext);
  const handleValueTimeAllocation = (array) => {
    const sum = array.reduce((acc, curr) => acc + curr, 0);
    if (sum !== 0) {
      const newArray = array.map((item) => Math.ceil((item * 100) / sum));
      return newArray;
    } else return [0, 0, 0, 0, 0];
  };
  const convertedArray = [
    timeallocation?.assignment_Lab,
    timeallocation?.concept_Lecture,
    timeallocation?.guide_Review,
    timeallocation?.test_Quiz,
    timeallocation?.exam,
  ];

  const data = {
    labels: [
      "Assignment/Lab",
      "Concept/Lecture",
      "Guide/Review",
      "Test/Quiz",
      "Exam",
    ],
    datasets: [
      {
        data: handleValueTimeAllocation(
          timeallocation ? convertedArray : timeAllocation
        ),
        backgroundColor: [
          "#F4BE37",
          "#FF9F40",
          "#0D2535",
          "#5388D8",
          "#206EE5",
        ],
        borderWidth: 0,
      },
    ],
  };
  const option = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: control ? 2 : 0.5,
    layout: {
      padding: {
        left: control ? 0 : 10,
        right: control ? 0 : 10,
        bottom: control ? 0 : 20,
        top: control ? 0 : 10,
      },
    },
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        align: control ? "center" : "start",
        position: control ? "right" : "bottom",
        labels: {
          filter: (legendItem, data) =>
            data.datasets[0].data[legendItem.index] !== 0,
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 13,
            lineHeight: 1.5,
          },
          padding: 10,
          boxWidth: 5,
          boxHeight: 5,
          generateLabels: function (chart) {
            const data = chart.data;
            const dataset = data.datasets[0];
            if (data.labels.length && data.datasets.length) {
              return data.labels.map(function (label, i) {
                return {
                  text: `${label} (${dataset.data[i]}%) `,
                  fillStyle: dataset.backgroundColor[i],
                  hidden: isNaN(dataset.data[i]) || dataset.data[i] === 0,
                  index: i,
                  strokeStyle: dataset.backgroundColor[i],
                };
              });
            } else {
              return [];
            }
          },
        },
      },
    },
  };

  return <Pie data={data} options={option} />;
}
