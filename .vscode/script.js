const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false }
        ]
    },
    {
        question: "What is 2 + 2?",
        answers: [
            { text: "4", correct: true },
            { text: "22", correct: false },
            { text: "2", correct: false },
            { text: "5", correct: false }
        ]
    },
    // Add more questions here
];

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.querySelector('.answer-buttons');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('time');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let timeLeft = 30;
let timer;

startQuiz();

function startQuiz() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    resultElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    nextButton.classList.add('hide');
    setNextQuestion();
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showResult();
        }
    }, 1000);
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    nextButton.classList.add('hide');
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        clearInterval(timer);
        showResult();
    }
}

function setStatusClass(element, correct) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function showResult() {
    questionContainerElement.classList.add('hide');
    resultElement.classList.remove('hide');
    scoreElement.textContent = `Your score: ${score}`;
}

restartButton.addEventListener('click', startQuiz);
