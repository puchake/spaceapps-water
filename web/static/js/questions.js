function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let questionIndex = 0;
let questions = [
    {
        title: 'Do you drink water?',
        type: 'yesno',
    },
    {
        title: 'Do you have any car?',
        type: 'yesno',
    },
    {
        title: 'Do you have a phone?',
        type: 'yesno',
    },
    {
        title: 'Do you wear clothes?',
        type: 'yesno',
    },
    {
        title: 'Do you like hamburgers?',
        type: 'yesno',
    },
    {
        title: 'Do you use water to wash yourself?',
        type: 'yesno',
    },
    {
        title: 'Do you go to the toilet?',
        type: 'yesno',
    },
    {
        title: 'Do you read?',
        type: 'yesno',
    },
    {
        title: 'Do you drive car with bio fuels?',
        type: 'yesno',
    },
    {
        title: `If everyone were you, Afghanistan would be dead by around ${2070 + getRandomInt(20)}.`,
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

    const template = document.querySelector(`#${templateType}`
);
    let clone = document.importNode(template.content, true);

    if (question.type === 'slider') {
        enableSlider(clone.querySelector('input'));
    }

    questionContent.append(clone);
}

window.addEventListener('load', nextQuestion, false);