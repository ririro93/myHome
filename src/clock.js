const clockContainer = document.querySelector(".js-clock");
const clockText = clockContainer.querySelectorAll("p");

function whatDay(num) {
	switch (num) {
		case 0:
			return  "Sun.";
		case 1:
			return  "Mon.";
		case 2:
			return  "Tue.";
		case 3:
			return  "Wed.";
		case 4:
			return  "Thu.";
		case 5:
			return  "Fri.";
		case 6:
			return  "Sat.";
		default:
			console.log("can't find the day");
	}			
}

function showDate() {
	const now = new Date();
	const day = whatDay(now.getDay());
	const month = now.getMonth() + 1;
	const date = now.getDate();
	const hours = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
	const minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
	const seconds = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();
	
	clockText[0].innerText = `${day}`;
	clockText[1].innerText = `${month} / ${date}`;
	clockText[2].innerText = `${hours} : ${minutes} : ${seconds}`;
}

function init() {
	showDate();
	setInterval(showDate, 1000);
}

init();