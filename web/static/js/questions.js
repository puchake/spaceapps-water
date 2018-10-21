const dummyYesNoCallback = function(x) {
    console.log('Called yesno callback with ' + x);
};

const dummySliderCallback = function(x) {
    console.log('Called slider callback with ' + x);
};

let questionIndex = 0;
let questions = [
    {
        title: 'Do you drink water?',
        type: 'yesno',
        callback: dummyYesNoCallback
    },
    {
        title: 'How much water per day?',
        type: 'slider',
        min: 0,
        max: 5,
        callback: dummySliderCallback
    },
    {
        title: 'If everyone were you, Afghanistan would be dead by 2084.',
        type: 'text'
    },
    {
        title: 'See how you can speed up the apocalypse.',
        type: 'text'
    },
    {
        title: '',
        type: 'final'
    }
];

function nextQuestion() {
    if (questionIndex >= questions.length) {
        console.log('last question!');
        return;
    }

    const question = questions[questionIndex];
    questionIndex++;

    $('#questionTitle').text(question.title);

    const questionContent = $('#questionContent');
    questionContent.empty();

    let templateType = '';

    switch (question.type) {
        case 'yesno':
            templateType = 'yesno-template';
            break;
        case 'slider':
            templateType = 'slider-template';
            break;
        case 'text':
            return;
        case 'final':
            $('#questionHero').fadeOut();
            $('#detailView').fadeIn();
            return;
        default:
            console.error('Question type not handled!');
            return;
    }

    const template = document.querySelector(`#${templateType}`);
    let clone = document.importNode(template.content, true);

    if (question.type === 'slider') {
        enableSlider(clone.querySelector('input'));
    }

    questionContent.append(clone);
}

window.addEventListener('load', nextQuestion, false);