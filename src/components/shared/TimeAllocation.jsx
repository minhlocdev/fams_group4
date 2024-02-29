import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function TimeAllocation({ control }) {
    const data = {
        labels: [
            'Assignment/Lab',
            'Concept/Lecture',
            'Guide/Review',
            'Test/Quiz',
            'Exam'
        ],
        datasets: [{
            data: [54, 29, 9, 1, 6],
            backgroundColor: [
                '#F4BE37',
                '#FF9F40',
                '#0D2535',
                '#5388D8',
                '#206EE5'
            ],
            borderWidth: 0
        }]
    }
    const option = {
        responsive: true,
        aspectRatio: control ? 2 : 0.5,
        layout: {
            padding: {
                left: control ? 0 : 10,
                right: control ? 0 : 10,
                bottom: control ? 0 : 20,
                top: control ? 0 : 10
            }
        },
        plugins: {
            datalabels: {
                display: true
            },
            legend: {
                align: control ? 'center' : 'start',
                position: control ? 'right' : 'bottom',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    font: {
                        size: 13,
                        lineHeight: 1.5
                    },
                    padding: 15,
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
                                }
                            })
                        } else { return [] }
                    },


                }
            }
        },
    }

    return (
        <Pie data={data} options={option} />
    )
}
