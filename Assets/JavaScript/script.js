// Here are all the declared global variables that call specific element tags in the index.html file based on the tag's associated id attribute.
var timerNav = document.querySelector("#timer");
var scorelinkNav = document.querySelector("#scorelink");
var introDiv = document.querySelector("#intro");
var startQuizbtn = document.getElementById("start");
var quizcontentDiv = document.querySelector("#quizcontent");
var questionDiv = document.querySelector("#question");
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

/*Here are all the declared global general variables that will be applied to the functions that follow throughout the code. 
The value for each variable listed below will change with the functions listed throughout the code.*/
// Var i keeps track of the current quiz question.
var i = 0;
// Var secondsLeft establishes a 75 second limit to complete the quiz.
var secondsLeft = 75;
// Var timerInterval is used to store the decrementing seconds of the timer.
var timerInterval = 0;
// Var scores declares a empty global array that will be used to append any save scores entere by the user.
var scores = [];
// Var activeDiv is used to keep track of current HTML div the user is accessing throughout each stage of the code quiz.
var activeDiv = introDiv;
// Var codeQuestions is a multi-dimensional array that stores the quiz questions and answers.
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

/* The retain() function is used to retain all saved scores even after the user refreshes the browser. I am invoking the function 
here so it immediately executes after the browser is refreshed. The function's logic is defined below.*/
retain();

/* The loadQuestion() function is used to pull and populate each code quiz questions for the user. This function is invoked in the 
answerSelection() function and startQuiz() function.*/
function loadQuestion(index) {
	questionDiv.innerHTML = codeQuestions[index][0];
	answerA.value = codeQuestions[index][1];
	answerB.value = codeQuestions[index][2];
	answerC.value = codeQuestions[index][3];
	answerD.value = codeQuestions[index][4];
}

// The answerSeletion() function is used to define the behavior that will occur once the user selects an answer choice.
function answerSelection(index) {
	// This portion of the function is used to track the answer choice selected by the user.
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
	// This portion of the function is used to populate an alert message based on whether the answer choice is "correct" or "wrong".
	var alertMessage = "";
	if (selected.value === codeQuestions[i][5]) {
		alertMessage = alertCorrect;
		alertCorrect.classList.toggle("collapse");
	} else {
		alertMessage = alertWrong;
		alertWrong.classList.toggle("collapse");
		// If the answer choice is incorrect, secondsLeft variable will decrement by 10secs.
		secondsLeft = secondsLeft - 10;
		timerNav.innerHTML = secondsLeft;
	}
	// This portion of the function ensures the alert message pop-up will collapse after .5 secs after the user selects an answer choice.
	var alertTimer = setInterval(function () {
		alertMessage.classList.toggle("collapse");
		clearInterval(alertTimer);
	}, 500);
	// This portion of the function will collapse the main quiz content div and populate the final score div after the user answers the last question.
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
/* The listofscores() function establishes the logic needed to create a new HTML list item within the HTML quiz score div based on the number
of scores appended into the global scores array variable defined above.*/
function listofscores() {
	finalScorelist.innerHTML = "";
	for (var i = 0; i < scores.length; i++) {
		var li = document.createElement("li");
		li.textContent = i + 1 + " - " + scores[i];
		li.setAttribute("class", "list-group-item");
		finalScorelist.appendChild(li);
	}
}

/* The scoreHistory() function locally stores the user's quiz scores that have been appended into the scores array, which then populates a list item
within the HTML per appended score by invoking the listofscores() function. This function also collapses the main HTML quiz score div and uncollapses the score 
history div so the user can see the score history div HTML element where their list of scores will be populated.*/
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

/* The startQuiz() function establishes the logic of what needs to execute when the start quiz button is clicked. This function ensure the timer decrements by 
1 second, collapses the intro div, uncollapses the main quiz content div where the questions populate, and then invokes the loadQuestion() function.*/
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

/* The goBack() function establishes the logic of what needs to execute when the user clicks the go back button on the score history div. When the user
clicks on the go back button, the following will occur: (a) score history div will collapse, (b) intro div will uncollapse, (c) timer will reset to 75 seconds, 
and (d) i variables used t track questions will reset.*/
function goBack() {
	scoreHistoryDiv.classList.toggle("collapse");
	introDiv.classList.toggle("collapse");
	activeDiv = introDiv;
	secondsLeft = 75;
	timerNav.innerHTML = secondsLeft;
	i = 0;
}

/* The clearHistory() function will reset the scores array back to an empty value, which will then clear any scores listed within HTML listed items in the score
history div once the listofscores() function is invoked.*/
function clearHistory() {
	scores = [];
	localStorage.setItem("scores", JSON.stringify(scores));
	listofscores();
}

/* The highScorelink() function establishes the logic of what needs to execute when the view highscores link in the top-left side of the nav is clicked. The following 
behavior will occure: (a) any active div will collapse, (b) score history div will uncollapse, (c) questions and timer will reset to intital starting parameters, 
and (d) listofscores () function is invoked and any scores appended into the scores array will show as HTML listed items. */
function highScorelink() {
	activeDiv.classList.toggle("collapse");
	scoreHistoryDiv.classList.toggle("collapse");
	i = 0;
	secondsLeft = 75;
	timerNav.innerHTML = secondsLeft;
	clearInterval(timerInterval);
	listofscores();
}

/* The retain() function is parsing out the user's quiz scores that are saved in local storage and reassigning them back to the scores array, which ensures that the 
saved quiz scores continue to populate in the score history div even after the user refreshes the page. */
function retain() {
	var storedScores = JSON.parse(localStorage.getItem("scores"));
	if (storedScores !== null) {
		scores = storedScores;
	}
}

// This adds an event listener to map the startQuiz() function to the start quiz button once the button is clicked.
startQuizbtn.addEventListener("click", startQuiz);

// This adds an event listener to map the answerSelection() function to the button for answer choice A once the button is clicked.
answerA.addEventListener("click", function () {
	answerSelection(1);
});

// This adds an event listener to map the answerSelection() function to the button for answer choice B once the button is clicked.
answerB.addEventListener("click", function () {
	answerSelection(2);
});

// This adds an event listener to map the answerSelection() function to the button for answer choice C once the button is clicked.
answerC.addEventListener("click", function () {
	answerSelection(3);
});

// This adds an event listener to map the answerSelection() function to the button for answer choice D once the button is clicked.
answerD.addEventListener("click", function () {
	answerSelection(4);
});

// This adds an event listener to map the scoreHistory() function to the submit score button once the button is clicked.
submitScorebtn.addEventListener("click", scoreHistory);

// This adds an event listener to map the goBack() function to the go back button once the button is clicked.
goBackbtn.addEventListener("click", goBack);

// This adds an event listener to map the clearHistory() function to the clear history button once the button is clicked.
clearHistorybtn.addEventListener("click", clearHistory);

// This adds an event listener to map the highScorelink() function to the view highscores link once the button is clicked.
scorelinkNav.addEventListener("click", highScorelink);
