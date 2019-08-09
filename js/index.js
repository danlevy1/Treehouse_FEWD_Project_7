//Traffic Line Chart
const trafficLineChartCanvas = document.querySelector("#traffic-chart");
const trafficLineChart = new Chart(trafficLineChartCanvas, {
    type: "line",
    data: {
        labels: [
            "16-22",
            "23-29",
            "30-5",
            "6-12",
            "13-19",
            "20-26",
            "27-3",
            "4-10",
            "11-17",
            "18-24",
            "25-31"
        ],
        datasets: [
            {
                label: "Traffic",
                backgroundColor: "rgba(116, 119, 191, 0.2)",
                borderColor: "red",
                borderWidth: 1,
                borderColor: "rgba(116, 119, 191, 1)",
                pointBorderWidth: 1,
                pointRadius: 5,
                pointBackgroundColor: "rgba(255, 255, 255, 1)",
                lineTension: 0,
                data: [
                    750,
                    1250,
                    1000,
                    1500,
                    2000,
                    1500,
                    1750,
                    1250,
                    1750,
                    2250,
                    1750,
                    2250
                ]
            }
        ]
    },
    options: {
        responsive: true,
        aspectRatio: 3,
        legend: {
            display: false
        },
        layout: {
            padding: {
                top: 20
            }
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        min: 0,
                        max: 2500,
                        stepSize: 500
                    }
                },
                {
                    gridLines: {
                        offsetGridLines: true
                    }
                }
            ]
        }
    }
});
