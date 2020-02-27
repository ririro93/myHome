const usersContainer = document.querySelector(".js-users");
const userAddBtn = document.querySelector(".add-button");

function onClickAdd(event) {
	const newBtn = document.createElement("Button");
	console.log(newBtn);
}

function init() {
	userAddBtn.addEventListener("click", onClickAdd);	
}

init();