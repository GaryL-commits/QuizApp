// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
    {
    question: "What is the capital of France?",
    answers: [
        {text: "London", correct: false},
        {text: "Berlin", correct: false},
        {text: "Paris", correct: true},
        {text: "Madrid", correct: false},
        ],
    },
    {
        question: "Which planet is known as the Red planet?",
        answers: [
        {text: "Venus", correct: false},
        {text: "Mars", correct: true},
        {text: "Jupiter", correct: false},
        {text: "Saturn", correct: false},
        ],
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
        {text: "Atlantic Ocean", correct: false},
        {text: "Indian Ocean", correct: false},
        {text: "Arctic Ocean", correct: false},
        {text: "Pacific Ocean", correct: true},
        ],
    },  
    {
        question: "Which of these is NOT a programming language?",
        answers: [
        {text: "Java", correct: false},
        {text: "Python", correct: false},
        {text: "Banana", correct: true},
        {text: "JavaScript", correct: false},
        ],
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
        {text: "Go", correct: false},
        {text: "Gd", correct: false},
        {text: "Au", correct: true},
        {text: "Ag", correct: false},
        ],
    },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
    // reset vars
    currentQuestionIndex = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}

function showQuestion() {
    // reset state
    answersDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    
    questionText.textContent = currentQuestion.question;
    answersContainer.innerHTML = "";
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        button.addEventListener("click", () => selectAnswer(button, answer.correct));
        answersContainer.appendChild(button);
    });
    progressBar.style.width = `${((currentQuestionIndex)/ quizQuestions.length) * 100}%`;
}

function selectAnswer(selectedButton, isCorrect) {
    if (answersDisabled) return;
    answersDisabled = true;

    const buttons = answersContainer.querySelectorAll(".answer-btn");

    buttons.forEach(button => {
        // find out if this button was the correct answer
        const buttonIsCorrect = quizQuestions[currentQuestionIndex].answers.find(
            answer => answer.text === button.textContent
        ).correct;

        if (buttonIsCorrect) {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            progressBar.style.width = "100%";
            setTimeout(showResults, 400);
        }
    }, 1000);
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    // optional: tailor the message to how they did
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) {
        resultMessage.textContent = "Perfect score! Amazing!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good job!";
    } else {
        resultMessage.textContent = "Better luck next time!";
    }
}

function restartQuiz() {
    progressBar.style.width = "0%";
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    resultScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}