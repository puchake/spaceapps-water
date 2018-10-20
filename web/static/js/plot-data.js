const ctx = document.getElementById('chart').getContext('2d');

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: window.graphData.labels,
        datasets: [{
            label: 'Number of people alive',
            data: window.graphData.data,
            borderColor: 'rgb(255, 99, 132)'
        }]
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
                    labelString: 'Population'
                },
                ticks: {
                    suggestedMin: 0,
                    callback: function (value) {
                        return value.toExponential(1);
                    }
                }
            }]
        }
    }
});