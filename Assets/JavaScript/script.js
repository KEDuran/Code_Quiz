// Here are the global variables that will be used for the code quiz logic established below.
var timerNav = document.querySelector("#timer");
var scorelinkNav = document.querySelector("#scorelink");
var introDiv = document.querySelector("#intro");
var startQuizbtn = document.getElementById("startquiz");
var quizcontentDiv = document.querySelector("#quizcontent");
var questionDiv = document.querySelector("#question");
var answersDiv = document.querySelector("#answers");
var alertDiv = document.querySelector("#alert");
var quizscoreDiv = document.querySelector("#quizscore");
var finalscoreAuto = document.querySelector("#finalscore");
var initialsInput = socument.getElementById("initials");
var submitScorebtn = document.getElementById("submitscore");
var scoreHistoryDiv = document.querySelector("#scorehistory");
var finalScorelist = document.querySelector("#scorelist");
var goBackbtn = document.getElementById("goBack");
var clearHistorybtn = document.getElementById("clearHistory");

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
		'A. <script src= "xxx.js"',
		'B. <link src= "xxx.js"',
		'C. <a href "xxx.js"',
		"D. None of the above",
		'A. <script src= "xxx.js"',
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
