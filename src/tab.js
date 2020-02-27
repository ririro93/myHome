const tabContainer = document.querySelector(".js-tab");
const todoBtn = tabContainer.querySelector(".checkBtn");
const phoneBtn = tabContainer.querySelector(".phoneBtn");
const alarmBtn = tabContainer.querySelector(".alarmBtn");
const memoBtn = tabContainer.querySelector(".memoBtn");
const bucketBtn = tabContainer.querySelector(".bucketBtn");
const favoritesBtn = tabContainer.querySelector(".favoritesBtn");

function openTab(event, tabName) {
	const tabContent = document.getElementsByClassName("tabContent");
	for (let i = 0; i < tabContent.length; i++) {
		tabContent[i].style.display = "none";
	}
	
	const tabLinks = document.getElementsByClassName("tabLinks");
	for (let i = 0; i < tabLinks.length; i++) {
		tabLinks[i].classList.remove("active");
	}
	
	document.getElementById(`${tabName}Tab`).style.display = "block";
	event.currentTarget.classList.toggle("active");
}

function handleClick(event) {
	openTab(event, event.target.id);	
}

function init() {
	// 버튼들에 이벤트리스너 달기
	todoBtn.addEventListener("click", handleClick);
	phoneBtn.addEventListener("click", handleClick);
	alarmBtn.addEventListener("click", handleClick);
	memoBtn.addEventListener("click", handleClick);
	bucketBtn.addEventListener("click", handleClick);
	favoritesBtn.addEventListener("click", handleClick);
	
	// 디폴트로 투두리스트 열어두기
	todoBtn.click();
}

init();