const monthLabel = function (month) {
    if (month === 0) {
        return 'today';
    } else if (month === 1) {
        return '1 month'
    } else {
        return `${month} months`;
    }
};

const createData = function (population) {
    let datapoints = [];
    let labels = [];

    let index = 0;
    let lastPopulation = population;
    let penultimatePoint = population;

    do {
        penultimatePoint = lastPopulation;
        datapoints.push(lastPopulation);

        lastPopulation *= 0.5;
        lastPopulation -= 100000;
        lastPopulation = Math.max(lastPopulation, 0);

        labels.push(monthLabel(index));
        index++;
    } while (penultimatePoint > 0 && datapoints.length < 15);

    return {
        'labels': labels,
        'data': datapoints
    }
};

function loadPopulation() {
    $.getJSON('static/data/population.json', function(data) {
        window.populationJson = data;
        console.log("Population json loaded.");
        populateCountrySelect();
    });
}

function setPopulationData(countryName) {
    console.log("Setting population data to population of " + countryName);
    let datapoints = window.populationJson[countryName];

    let startYear = 2000;
    let labels = Array.from(
        {length: datapoints.length}, (v, k) => startYear + k);

    window.graphData = {
        'labels': labels,
        'data': datapoints
    };

    updateChart();
}

function populateCountrySelect() {
    let select = document.getElementById('countrySelect');

    for(let element in window.populationJson) {
        const option = document.createElement('option');
        option.value = element;
        option.innerHTML = element;
        select.appendChild(option);
    }
}

const createNewElement = function () {
    const variableTypeSelect = document.querySelector('#variable-type');
    const variableType = variableTypeSelect
        .options[variableTypeSelect.selectedIndex].value;

    const template = document.querySelector('#variable-template');
    const container = document.querySelector('#variables-container');

    let clone = document.importNode(template.content, true);
    let title = clone.querySelector('#label');
    title.textContent = variableType;

    container.appendChild(clone);
};

const closeElement = function () {
    const closeButton = event.srcElement;
    const parentWindow = closeButton.closest('.variable-container');

    parentWindow.remove();
};

const init = function () {
    createNewElement();
    loadPopulation();
};

window.graphData = createData(500000000);
window.onload = init;