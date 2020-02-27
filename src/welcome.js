const welcomeContainer = document.querySelector(".js-welcome");
const welcomeInput = welcomeContainer.querySelector("input");
const welcomeText = welcomeContainer.querySelector("p");

const savedName = localStorage.getItem("name");

function welcomeBack() {
	welcomeInput.classList.add("hide");
	welcomeText.innerText = `Welcome back ${savedName}`;
}

function askName() {
	welcomeText.classList.add("hide");
}

function handleSubmit(event) {
	event.preventDefault();
	localStorage.setItem("name", welcomeInput.value);
	welcomeText.innerText = `Welcome ${welcomeInput.value}`;
	welcomeText.classList.remove("hide");
	welcomeInput.classList.add("hide");

}

function init() {
	welcomeContainer.addEventListener("submit", handleSubmit);
	if (savedName) {
		welcomeBack();
	} else {
		askName();
	}
}

init();