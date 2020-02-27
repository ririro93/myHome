const body = document.querySelector("body");

const backgroundNum = 4;

function randomInt() {
	return Math.floor(Math.random() * backgroundNum) + 1
}

function init() {
	const randBg = randomInt();
	body.style.backgroundImage = `url(./images/${randBg}.jpg)`;
}

init();