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

function loadCountries() {
    $.getJSON('static/data/countries.json', function(data) {
        window.countriesJson = data;
        console.log("Countries json loaded.");
        populateSelect("countrySelect", window.countriesJson);
    });
}

function setPopulationData(countryName) {
    console.log("Setting population data to population of " + countryName);
    let datapoints = window.countriesJson[countryName]["population"];

    let startYear = 2000;
    let labels = Array.from(
        {
            length: datapoints.length
        }, (v, k) => startYear + k);

    window.graphData = {
        'labels': labels,
        'data': datapoints
    };

    updateChart();
}

const defaultCountry = 'Ghana';

function populateSelect(selectId, jsonDict) {
    let select = document.getElementById(selectId);

    for(let element in jsonDict) {
        const option = document.createElement('option');
        option.value = element;
        option.innerHTML = element;

        if (element === defaultCountry) {
            option.selected = true;
        }

        select.appendChild(option);
    }

    setPopulationData(defaultCountry);
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
    loadCountries();
};

window.graphData = {
    'data': [],
    'labels': []
};
window.onload = init;