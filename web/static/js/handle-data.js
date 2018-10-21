function loadCountries() {
    $.getJSON('static/data/countries.json', function (data) {
        window.countriesJson = data;
        console.log("Countries json loaded.");
        populateSelect("countrySelect", window.countriesJson);
        setWaterData(defaultCountry);
    });
}

function loadProducts() {
    $.getJSON('static/data/products.json', function (data) {
        window.productsJson = data;
        console.log("Products json loaded.");
        populateSelect("variable-type", window.productsJson);
    });
}

function setWaterData(countryName) {
    window.countryName = countryName;
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

    reloadModifiers();
}

const defaultCountry = 'Afghanistan';

function populateSelect(selectId, jsonDict) {
    let select = document.getElementById(selectId);

    for (let element in jsonDict) {
        const option = document.createElement('option');
        option.value = element;
        option.innerHTML = element;

        if (element === defaultCountry) {
            option.selected = true;
        }

        select.appendChild(option);
    }
}

const sumModifiers = function () {
    let litersSum = 0;
    for (let element in window.waterModifiers) {
        let modifier = window.waterModifiers[element];
        let timeMultiplier = 1;
        if (modifier.timeUnit === "decennially") {
            timeMultiplier = 0.1;
        }
        if (modifier.timeUnit === "monthly") {
            timeMultiplier = 12;
        }
        else if (modifier.timeUnit === "weekly") {
            timeMultiplier = 52;
        }
        else if (modifier.timeUnit === "daily") {
            timeMultiplier = 365;
        }
        litersSum += (modifier.current - modifier.avg) * modifier.multiplier
            * timeMultiplier;
    }
    return litersSum / 1e12;
};

const removeWaterModifier = function (name) {
    delete window.waterModifiers[name];
    reloadModifiers();
};

const reloadModifiers = function () {
    let referencePopulation = window.countriesJson[window.countryName]
        ["population"][16];
    let consumption_datapoints = window.countriesJson[window.countryName]
        ["population"].map(
        (population) => population / referencePopulation
            * window.countriesJson[window.countryName]
                ["total_water_consumption"]
    );
    let modifiersSum = sumModifiers();
    for (let i = 0; i < consumption_datapoints.length; i++) {
        consumption_datapoints[i] = consumption_datapoints[i]
            + window.countriesJson[window.countryName]["population"][i]
            * modifiersSum;
    }
    window.graphData.data[0] = consumption_datapoints;
    updateChart();
};

const applyWaterModifierWithName = function (value, name) {
    let product = window.productsJson[name];
    applyWaterModifier(name, product.avg, Number(value), product.liters,
                       product.time);
};

const applyWaterModifier = function (name, avg, current, multiplier, timeUnit) {
    window.waterModifiers[name] = {avg, current, multiplier, timeUnit};
    reloadModifiers();
};

const createNewElement = function () {
    const variableTypeSelect = document.querySelector('#variable-type');
    const variableType = variableTypeSelect
        .options[variableTypeSelect.selectedIndex].value;
    if (variableType in window.waterModifiers) {
        return;
    }

    const template = document.querySelector('#variable-template');
    const container = document.querySelector('#variables-container');

    let clone = document.importNode(template.content, true);
    let title = clone.querySelector('#label');
    let outputLabel = clone.querySelector('output');
    let slider = clone.querySelector('#sliderWithValue');
    let product = window.productsJson[variableType];
    slider.min = product.min;
    slider.max = product.max;
    slider.value = product.avg;
    slider.title = variableType;
    outputLabel.innerText = slider.value;
    title.textContent = variableType + " " + product.unit + " ("
        + product.time + ")";

    enableSlider(clone.querySelector('input'));

    container.appendChild(clone);
    applyWaterModifier(variableType, product.avg, product.avg, product.liters,
        product.time)
};

const closeElement = function () {
    const closeButton = event.srcElement;
    const parentWindow = closeButton.closest('.variable-container');
    removeWaterModifier(parentWindow.querySelector("#sliderWithValue").title);

    parentWindow.remove();
};

const dataInit = function () {
    loadCountries();
    loadProducts();
    window.waterModifiers = {}
};

window.graphData = {
    'data': [],
    'labels': []
};
window.addEventListener('load', dataInit, false);