// Here are the global variables that will be used for the code quiz logic established below.
var timerNav = document.querySelector("#timer");
var scorelinkNav = document.querySelector("#scorelink");
var introDiv = document.querySelector("#intro");
var startQuizbtn = document.getElementById("start");
var quizcontentDiv = document.querySelector("#quizcontent");
var questionDiv = document.querySelector("#question");
var answersDiv = document.querySelector("#answers");
var answerA = document.querySelector("#answerA");
var answerB = document.querySelector("#answerB");
var answerC = document.querySelector("#answerC");
var answerD = document.querySelector("#answerD");
var alertCorrect = document.querySelector("#alertCorrect");
var alertWrong = document.querySelector("#alertWrong");
var quizscoreDiv = document.querySelector("#quizscore");
var finalScore = document.querySelector("#finalScore");
var initialsInput = document.getElementById("initials");
var submitScorebtn = document.getElementById("submitscore");
var scoreHistoryDiv = document.querySelector("#scorehistory");
var finalScorelist = document.querySelector("#scorelist");
var goBackbtn = document.getElementById("goBack");
var clearHistorybtn = document.getElementById("clearHistory");

var i = 0;
var secondsLeft = 75;
var timerInterval = 0;
var scores = [];
var activeDiv = introDiv;

var codeQuestions = [
	[
		"Where is the correct place to insert a JavaScript?",
		"A. the <p> section",
		"B. the <footer> section",
		"C. the <body> section",
		"D. Do not go in the HTML code",
		"C. the <body> section",
	],
	[
		"What is the correct syntax got referring to an external script called xxx.js?",
		'A. <script src= "xxx.js">',
		'B. <link src= "xxx.js"',
		'C. <a href "xxx.js"',
		"D. None of the above",
		'A. <script src= "xxx.js">',
	],
	[
		"How can you add a single-line comment in JavaScript?",
		"A. ??Use this comment format??",
		"B. !<--Use this comment format",
		"C. /*Use this comment format*/",
		"D. // Use this comment format",
		"D. // Use this comment format",
	],
	[
		"Which event occurs when the user clicks on an HTML element?",
		"A. onmouseover",
		"B. onclick",
		"C. onmouseclick",
		"D. onchange",
		"B. onclick",
	],
];

retain();

function loadQuestion(index) {
	questionDiv.innerHTML = codeQuestions[index][0];
	answerA.value = codeQuestions[index][1];
	answerB.value = codeQuestions[index][2];
	answerC.value = codeQuestions[index][3];
	answerD.value = codeQuestions[index][4];
}

function answerSelection(index) {
	// answer choice
	var selected = "";
	if (index === 1) {
		selected = answerA;
	} else if (index === 2) {
		selected = answerB;
	} else if (index === 3) {
		selected = answerC;
	} else {
		selected = answerD;
	}
	// alert needs to pop-up
	var alertMessage = "";
	if (selected.value === codeQuestions[i][5]) {
		alertMessage = alertCorrect;
		alertCorrect.classList.toggle("collapse");
	} else {
		alertMessage = alertWrong;
		alertWrong.classList.toggle("collapse");
		// if answer choice is incorrect, decrement by 10sec
		secondsLeft = secondsLeft - 10;
		timerNav.innerHTML = secondsLeft;
	}

	var alertTimer = setInterval(function () {
		alertMessage.classList.toggle("collapse");
		clearInterval(alertTimer);
	}, 500);

	if (i === 3) {
		clearInterval(timerInterval);
		quizcontentDiv.classList.toggle("collapse");
		quizscoreDiv.classList.toggle("collapse");
		activeDiv = quizscoreDiv;
		finalScore.innerHTML = secondsLeft;
		timerNav.innerHTML = secondsLeft;
	} else {
		i = i + 1;
		loadQuestion(i);
	}
}

function listofscores() {
	finalScorelist.innerHTML = "";
	for (var i = 0; i < scores.length; i++) {
		var li = document.createElement("li");
		li.textContent = i + 1 + " - " + scores[i];
		li.setAttribute("class", "list-group-item");
		finalScorelist.appendChild(li);
	}
}

function scoreHistory() {
	var initials = initialsInput.value;
	var scoreEntry = initials + " - " + secondsLeft;
	scores.push(scoreEntry);
	localStorage.setItem("scores", JSON.stringify(scores));
	quizscoreDiv.classList.toggle("collapse");
	scoreHistoryDiv.classList.toggle("collapse");
	activeDiv = scoreHistoryDiv;
	listofscores();
}

function startQuiz() {
	timerInterval = setInterval(function () {
		timerNav.innerHTML = secondsLeft;
		secondsLeft = secondsLeft - 1;
		timerNav.innerHTML = secondsLeft;

		if (secondsLeft === 0) {
			timerNav.innerHTML = secondsLeft;
			clearInterval(timerInterval);
		}
	}, 1000);

	introDiv.classList.toggle("collapse");
	quizcontentDiv.classList.toggle("collapse");
	activeDiv = quizcontentDiv;
	loadQuestion(i);
}

function goBack() {
	scoreHistoryDiv.classList.toggle("collapse");
	introDiv.classList.toggle("collapse");
	activeDiv = introDiv;
	secondsLeft = 75;
	timerNav.innerHTML = secondsLeft;
	i = 0;
}

function clearHistory() {
	scores = [];
	localStorage.setItem("scores", JSON.stringify(scores));
	listofscores();
}

function highScorelink() {
	activeDiv.classList.toggle("collapse");
	scoreHistoryDiv.classList.toggle("collapse");
	i = 0;
	secondsLeft = 75;
	timerNav.innerHTML = secondsLeft;
	clearInterval(timerInterval);
	listofscores();
}

function retain() {
	// Get stored todos from localStorage
	// Parsing the JSON string to an object
	var storedScores = JSON.parse(localStorage.getItem("scores"));

	// If todos were retrieved from localStorage, update the todos array to it
	if (storedScores !== null) {
		scores = storedScores;
	}
}
startQuizbtn.addEventListener("click", startQuiz);

answerA.addEventListener("click", function () {
	answerSelection(1);
});
answerB.addEventListener("click", function () {
	answerSelection(2);
});
answerC.addEventListener("click", function () {
	answerSelection(3);
});
answerD.addEventListener("click", function () {
	answerSelection(4);
});

submitScorebtn.addEventListener("click", scoreHistory);

goBackbtn.addEventListener("click", goBack);

clearHistorybtn.addEventListener("click", clearHistory);

scorelinkNav.addEventListener("click", highScorelink);
