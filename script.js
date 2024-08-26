// script.js

const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: 0
    },
    {
        question: "Which language is used for web apps?",
        options: ["Python", "JavaScript", "Java", "C++"],
        answer: 1
    },
    {
        question: "Who is the President of the USA in 2021?",
        options: ["Joe Biden", "Donald Trump", "Barack Obama", "George Bush"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const timerEl = document.getElementById("timer");
const resultContainerEl = document.getElementById("result-container");
const resultEl = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainerEl.classList.add("hide");
    nextBtn.classList.remove("hide");
    showQuestion();
    startTimer();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.innerText = currentQuestion.question;
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option");
        if (index === currentQuestion.answer) {
            button.dataset.correct = true;
        }
        button.addEventListener("click", selectAnswer);
        optionsEl.appendChild(button);
    });
}

function resetState() {
    clearTimeout(timer);
    timeLeft = 10;
    timerEl.innerText = `Time: ${timeLeft}`;
    while (optionsEl.firstChild) {
        optionsEl.removeChild(optionsEl.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        score++;
    }
    Array.from(optionsEl.children).forEach(button => {
        button.disabled = true;
    });
    nextBtn.classList.remove("hide");
}

function showResult() {
    resultEl.innerText = `Your Score: ${score}`;
    resultContainerEl.classList.remove("hide");
    nextBtn.classList.add("hide");
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        startTimer();
    } else {
        showResult();
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);

startQuiz();
