const ctx = document.getElementById('chart').getContext('2d');

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

let config = {
    type: 'line',
    data: {
        labels: window.graphData.labels,
        datasets: [
            {
                label: 'Water consumption per year',
                data: window.graphData.data[0],
                borderColor: 'rgb(255, 99, 132)'
            },
            {
                label: 'Renewable water resources',
                data: window.graphData.data[1],
                borderColor: 'rgb(0, 0, 255)'
            }
        ]
    },
    options: {
        legend: false,
        responsive: true,
        tooltips: {
            mode: 'index',
            callbacks: {
                label: function (tooltipItem) {
                    // noinspection JSSuspiciousNameCombination
                    return numberWithCommas(Math.round(tooltipItem.yLabel));
                }
            }
        },
        aspectRatio: 3,
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Water [10^9 m^3 / year]'
                },
                ticks: {
                    suggestedMin: 0,
                    callback: function (value) {
                        return value;
                    }
                }
            }]
        }
    }
};

let chart = new Chart(ctx, config);

function updateChart() {
    config.data.datasets[0].data = window.graphData.data[0];
    config.data.datasets[1].data = window.graphData.data[1];
    config.data.labels = window.graphData.labels;
    chart.update();
}