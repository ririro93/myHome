const alarmContainer = document.querySelector(".js-alarm-container");
const alarmHours = alarmContainer.querySelector("#hours");
const alarmMinutes = alarmContainer.querySelector("#minutes");
const alarmDiv = document.querySelector(".alarm-div");
const alarmButton = document.querySelector(".alarm-button");

// Variables
const existingAlarm = localStorage.getItem("alarm");
let opened = false;

// script start
init();


function init() {
	// event listeners
	alarmHours.addEventListener("keyup", handleKeyup);
	alarmMinutes.addEventListener("keyup", handleKeyup);
	alarmButton.addEventListener("click", handleClick);
	
	if (existingAlarm) {
		showExistingAlarm();
	}
	setInterval(checkTime, 1000);
}

function handleKeyup(event) {
	if(event.keyCode == 13) {
		handleSubmit();
	}
}

function handleClick() {
	opened = false;
}

function handleSubmit() {
	changeAlarm();
	saveLocal();
	emptyAlarm();
}

function changeAlarm() {
	alarmDiv.innerText = `${alarmHours.value} : ${alarmMinutes.value}`;
}

function saveLocal() {
	localStorage.setItem("alarm", alarmDiv.innerText);
}

function emptyAlarm() {
	alarmHours.value = "";
	alarmMinutes.value = "";
}

function showExistingAlarm() {
	alarmDiv.innerText = existingAlarm;
}

function checkTime() {
	const date = new Date();
	const currAlarmHours = alarmDiv.innerText.slice(0,2);
	const currAlarmMinutes = alarmDiv.innerText.slice(5, 7);
	if (date.getHours() == currAlarmHours && date.getMinutes() == currAlarmMinutes && !opened) {
		window.open("alarm.html");
		opened = true;
	}
}