const alarmContainer = document.querySelector(".js-alarm-container");
const alarmHours = alarmContainer.querySelector("#hours");
const alarmMinutes = alarmContainer.querySelector("#minutes");
const alarmDiv = document.querySelector(".alarm-div");
const alarmButton = document.querySelector(".alarm-button").querySelector("button");

// Variables
const existingAlarm = localStorage.getItem("alarm");
let alarmOn = false;

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
	const text = alarmButton.innerText;
	if (text == "OFF") {
		alarmButton.innerText = "ON";
		alarmOn = true;
	} else {
		alarmButton.innerText = "OFF";
		alarmOn = false;
	}
}

function handleSubmit() {
	changeAlarm();
	saveLocal();
	emptyAlarm();
}

function changeAlarm() {
	alarmDiv.innerText = `${alarmHours.value} : ${alarmMinutes.value}`;
	if (alarmButton.innerText == "ON") {
		alarmOn = true;
	}
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
	if (date.getHours() == currAlarmHours && date.getMinutes() == currAlarmMinutes && alarmOn) {
		alarmOn = false;
		// notifyMe();
		// window.getAttention();
		const alarmWindow = window.open("alarm.html");
		alarmWindow.focus();	
	}
}

// function notifyMe() {
//   // Let's check if the browser supports notifications
//   if (!("Notification" in window)) {
//     alert("This browser does not support desktop notification");
//   }

//   // Let's check whether notification permissions have already been granted
//   else if (Notification.permission === "granted") {
//     // If it's okay let's create a notification
//     let notification = new Notification("ALARM!!");
//   }

//   // Otherwise, we need to ask the user for permission
//   else if (Notification.permission !== "denied") {
//     Notification.requestPermission().then(function (permission) {
//       // If the user accepts, let's create a notification
//       if (permission === "granted") {
//         let notification = new Notification("ALARM!!");
//       }
//     });
//   }

// }