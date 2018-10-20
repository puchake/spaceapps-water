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

function populateCountrySelect() {
    let select = document.getElementById('countrySelect');

    for(let element in window.populationJson) {
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
    loadPopulation();
};

window.graphData = {
    'data': [],
    'labels': []
};
window.onload = init;