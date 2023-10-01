var startBtn = document.getElementById("start-btn");
var quizScreen = document.getElementById("quiz-screen");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var feedbackEl = document.getElementById("feedback");
var timerEl = document.getElementById("timer");
var timeRemainingEl = document.getElementById("time-remaining");
var endScreen = document.getElementById("end-screen");
var finalScoreEl = document.getElementById("final-score");
var initialsInput = document.getElementById("initials");
var submitScoreBtn = document.getElementById("submit-score");
var highScoresScreen = document.getElementById("high-scores");
var scoreListEl = document.getElementById("score-list");
var goBackBtn = document.getElementById("restart");
var clearScoresBtn = document.getElementById("clear-scores");
const viewScoresBtn = document.getElementById("view-scores-btn");
const highScoresSection = document.getElementById("high-scores");

var currentQuestionIndex = 0;
var timeRemaining = 60;
var timerInterval;
var score = 0;
var highScores = [];

var questions = [
  {
    question: "What is coding?",
    choices: ["The process of designing a website", "The process of using programming languages to give instructions to a computer", 
    "The process of creating a mobile application", "None of the above"],
    correctAnswer: 1
  },
  {
    question: "What is JavaScript?",
    choices: ["A compiled language used to make the website interactive", " A scripting language used to make the website interactive", 
    "An assembly language used to make the website interactive", "None of the above"],
    correctAnswer: 1
  },
  {
    question: "What is the purpose of JavaScript?",
    choices: ["To design the layout of a website","To create server-side applications",
     "To create dynamic and interactive web pages", "None of the above"],
    correctAnswer: 2
  },
  {
    question: "What is a JavaScript object?",
    choices: ["A container for named values and methods", " A function that performs a specific task", 
    "A primitive data type", "None of the above"],
    correctAnswer: 0
  },
  {
    question: "What is a JavaScript function?",
    choices: ["A primitive data type", "A container for named values and methods", 
    "A block of code designed to perform a particular task", "None of the above"],
    correctAnswer: 2
  }
];

startBtn.addEventListener("click", startQuiz);
submitScoreBtn.addEventListener("click", saveHighScore);
goBackBtn.addEventListener("click", goBack);
clearScoresBtn.addEventListener("click", clearScores);

viewScoresBtn.addEventListener("click", () => {
  highScoresSection.classList.remove("hide");
});

function startQuiz() {
  startBtn.classList.add("hide");
  quizScreen.classList.remove("hide");
  timerInterval = setInterval(updateTime, 1000);
  displayQuestion();
  
}

function displayQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  choicesEl.innerHTML = "";

  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choiceBtn = document.createElement("button");
    choiceBtn.textContent = currentQuestion.choices[i];
    choiceBtn.setAttribute("data-index", i);
    choiceBtn.addEventListener("click", checkAnswer);
    choicesEl.appendChild(choiceBtn);
  }
}

function checkAnswer(event) {
  var selectedChoice = event.target;
  var selectedAnswerIndex = parseInt(selectedChoice.getAttribute("data-index"));
  var currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswerIndex === currentQuestion.correctAnswer) {
    feedbackEl.textContent = "Correct!";
    score += 10;
  } else {
    feedbackEl.textContent = "Wrong!";
    timeRemaining -= 10;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    displayQuestion();
  }
}

function endQuiz() {
  clearInterval(timerInterval);
  quizScreen.classList.add("hide");
  endScreen.classList.remove("hide");
  finalScoreEl.textContent = score;

}

function updateTime() {
  timeRemaining--;
  timeRemainingEl.textContent = timeRemaining;

  if (timeRemaining <= 0) {
    endQuiz();
  }
}

function saveHighScore(event) {
  event.preventDefault();

  var initials = initialsInput.value.trim();

  if (initials !== "") {
    var highScore = {
      initials: initials,
      score: score
    };

    highScores.push(highScore);
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    showHighScores();
  }
}

function showHighScores() {
  endScreen.classList.add("hide");
  highScoresScreen.classList.remove("hide");
  scoreListEl.innerHTML = "";

  for (var i = 0; i < highScores.length; i++) {
    var highScore = highScores[i];
    var scoreItem = document.createElement("li");
    scoreItem.textContent = highScore.initials + " - " + highScore.score;
    scoreListEl.appendChild(scoreItem);
  }
}

function goBack() {
  highScoresScreen.classList.add("hide");
  startBtn.classList.remove("hide");
  currentQuestionIndex = 0;
  timeRemaining = 60;
  score = 0;
  initialsInput.value = "";
}

function clearScores() {
  highScores = [];
  localStorage.removeItem("highScores");
  scoreListEl.innerHTML = "";
}

