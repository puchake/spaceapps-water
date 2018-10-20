const ctx = document.getElementById('chart').getContext('2d');

const monthLabel = function (month) {
    if (month === 0) {
        return 'today';
    } else if (month === 1) {
        return '1 month'
    } else {
        return `${month} months`;
    }
};

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const months = [...Array(20).keys()];
const monthLabels = months.map(x => monthLabel(x));

let createData = function (population) {
    let datapoints = [];
    let labels = [];

    let index = 0;
    let lastPopulation = population;

    while (lastPopulation > 0 && datapoints.length < 15) {
        datapoints.push(lastPopulation);
        lastPopulation *= 0.8;

        labels.push(monthLabels[index]);
        index++;
    }

    return {
        'labels': labels,
        'data': datapoints
    }
};

let data = createData(500000000);

let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: data.labels,
        datasets: [{
            label: 'Number of people alive',
            data: data.data,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(0, 0, 0, 0)'
        }]
    },
    options: {
        responsive: true,
        tooltips: {
            mode: 'index',
            callbacks: {
                label: function (tooltipItem, data) {
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