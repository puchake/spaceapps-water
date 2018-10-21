function loadCountries() {
    $.getJSON('static/data/countries.json', function(data) {
        window.countriesJson = data;
        console.log("Countries json loaded.");
        populateSelect("countrySelect", window.countriesJson);
        setWaterData(defaultCountry);
    });
}

function loadProducts() {
    $.getJSON('static/data/products.json', function(data) {
        window.productsJson = data;
        console.log("Products json loaded.");
        populateSelect("variable-type", window.productsJson);
    });
}

function setWaterData(countryName) {
    console.log("Setting population data to population of " + countryName);
    let referencePopulation = window.countriesJson[countryName]["population"]
        [16];
    let consumption_datapoints = window.countriesJson[countryName]
        ["population"].map(
            (population) => population / referencePopulation
                * window.countriesJson[countryName]["total_water_consumption"]
        );
    let resources_datapoints = Array.from(
        {
            length: consumption_datapoints.length
        }, (v, k) => window.countriesJson[countryName]["total_water_resources"]
    );

    let startYear = 2000;
    let labels = Array.from(
        {
            length: consumption_datapoints.length
        }, (v, k) => startYear + k);

    window.graphData = {
        'labels': labels,
        'data': [consumption_datapoints, resources_datapoints]
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

    enableSlider(clone.querySelector('input'));

    container.appendChild(clone);
};

const closeElement = function () {
    const closeButton = event.srcElement;
    const parentWindow = closeButton.closest('.variable-container');

    parentWindow.remove();
};

const dataInit = function () {
    createNewElement();
    loadCountries();
    loadProducts();
};

window.graphData = {
    'data': [],
    'labels': []
};
window.addEventListener('load', dataInit, false);