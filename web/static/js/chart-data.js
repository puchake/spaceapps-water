const ctx = document.getElementById('chart').getContext('2d');

const monthLabels = [
    'today',
    '1 month',
    '2 months',
    '3 months',
    '4 months',
    '5 months',
    '6 months',
    '7 months',
    '8 months',
    '9 months'
];

let createData = function(population) {
    let datapoints = [];
    let labels = [];

    let index = 0;
    let lastPopulation = population;

    while (lastPopulation > 0 && datapoints.length < 10) {
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

let data = createData(1000000000);

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
            mode: 'index'
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
                    callback: function(value, index, values) {
                        return value.toExponential(2);
                    }
                }
            }]
        }
    }
});