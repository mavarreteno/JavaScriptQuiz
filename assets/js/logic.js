// Array of quiz questions
const quizQuestions = [
  {
    question:
      "What unit of measurement are 'setInterval()' functions measured in?",
    options: [
      "Milliseconds",
      "Millipedes",
      "Millie Bobby Brown",
      "Millennials",
    ],
    answer: 0,
  },
  {
    question: "What is a useful tool to debug in JavaScript?",
    options: ["console.bog", "console.log", "console.fog", "console.flop"],
    answer: 1,
  },
  {
    question: "Which of these is an example of a primitive value type?",
    options: ["1", "2", "3", "number"],
    answer: 3,
  },
];

let currentQuestionIndex = 0;
let timeRemaining = 0;
let countdown; // Global variable to store the countdown interval

// Function to start the quiz
function startQuiz() {
  // Hide the start button
  document.getElementById("startButton").style.display = "none";

  // Display the first question
  displayQuestion();

  // Start the countdown timer
  const totalTime = 40; // Total time in seconds
  timeRemaining = totalTime;
  updateTimer();

  countdown = setInterval(() => {
    timeRemaining--;
    updateTimer();

    if (timeRemaining <= 0) {
      clearInterval(countdown);
      alert("Time's up! GAME OVER!!!");
      finishQuiz();
    }
  }, 1000);
}

// Function to display the current question
function displayQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");

  questionElement.textContent = quizQuestions[currentQuestionIndex].question;

  optionsElement.innerHTML = "";
  quizQuestions[currentQuestionIndex].options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => {
      answerQuestion(index);
    });
    optionsElement.appendChild(button);
  });
}

// Function to update the timer display
function updateTimer() {
  const countdownElement = document.getElementById("countdown");
  countdownElement.textContent = timeRemaining;
}

// Function to handle answering a question
function answerQuestion(selectedIndex) {
  const correctIndex = quizQuestions[currentQuestionIndex].answer;

  if (selectedIndex !== correctIndex) {
    const timeDeduction = 15; // Deduct 15 seconds for each incorrect answer
    timeRemaining -= timeDeduction;
    updateTimer();
  }

  // Move to the next question
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();
  } else {
    // Quiz finished
    clearInterval(countdown);
    finishQuiz();
  }
}

// Function to finish the quiz
function finishQuiz() {
  // Display the input field for entering initials
  document.getElementById("initialsInput").style.display = "block";
  document.getElementById("submitBtn").addEventListener("click", saveScore);
}

// Function to save the score and initials
function saveScore() {
  const initialsInput = document.getElementById("initials");
  const initials = initialsInput.value;
  const highScore = timeRemaining;

  // Check if initials are entered
  if (initials.trim() === "") {
    alert("Please enter your initials.");
    return;
  }

  // Save the score and initials to local storage
  saveScoreToLocalStorage(initials, highScore);

  // Clear the input field and hide it
  initialsInput.value = "";
  document.getElementById("initialsInput").style.display = "none";

  // Display the high scores
  displayHighScores();
}

// Function to save the score and initials to local storage
function saveScoreToLocalStorage(initials, score) {
  // Retrieve existing scores from local storage
  let scores = JSON.parse(localStorage.getItem("scores")) || [];

  // Add the new score to the array
  scores.push({ initials, score });

  // Sort the scores in descending order based on score
  scores.sort((a, b) => b.score - a.score);

  // Save the updated scores to local storage
  localStorage.setItem("scores", JSON.stringify(scores));
}

// Function to display the high scores
function displayHighScores() {
  // Retrieve scores from local storage
  const scores = JSON.parse(localStorage.getItem("scores")) || [];

  // Clear the high score display
  const highScoreElement = document.getElementById("highscore");
  highScoreElement.innerHTML = "";

  // Create and append a list item for each score
  scores.forEach((score, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${score.initials}: ${score.score}`;
    highScoreElement.appendChild(listItem);
  });
}

// Start the quiz when the start button is clicked
document.getElementById("startButton").addEventListener("click", startQuiz);
