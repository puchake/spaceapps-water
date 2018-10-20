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

window.graphData = createData(500000000);
window.onload = createNewElement;