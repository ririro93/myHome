const phoneNameForm = document.querySelector(".js-phoneNameForm");
const nameInput = phoneNameForm.querySelector("#name");
const phonePhoneForm = document.querySelector(".js-phonePhoneForm");
const phoneInput = phonePhoneForm.querySelector("#phone");
const phonebookList = document.querySelector("#phoneTab").querySelector("ul");

const existingData = localStorage.getItem("phoneData");

let data = [];

function showExistingData() {
	const phoneData = JSON.parse(existingData);
	for (let i = 0; i < phoneData.length; i++) {
		const newPhoneList = document.createElement("List");
	
		// 삭제 버튼
		const newPhoneListBtn = document.createElement("button");
		newPhoneListBtn.addEventListener("click", handleErase);
		newPhoneListBtn.innerText = "X";

		// 붙여넣을 이름
		const newPhoneListNameDiv = document.createElement("div");
		const newPhoneListName = document.createTextNode(`${phoneData[i].name}`);
		newPhoneListNameDiv.classList.add("phone-name",  "phoneDiv");
		newPhoneListNameDiv.appendChild(newPhoneListName);

		// 붙여넣을 전화번호
		const newPhoneListPhoneDiv = document.createElement("div");
		const newPhoneListPhone = document.createTextNode(`${phoneData[i].phone}`);
		newPhoneListPhoneDiv.classList.add("phone-number",  "phoneDiv");
		newPhoneListPhoneDiv.appendChild(newPhoneListPhone);

		// 편집 버튼
		const newPhoneListEditBtn = document.createElement("button");
		newPhoneListEditBtn.addEventListener("click", handleEdit);
		newPhoneListEditBtn.classList.add("phone-edit");
		newPhoneListEditBtn.innerText = "수정";

		// 리스트에 추가
		newPhoneList.appendChild(newPhoneListBtn);
		newPhoneList.appendChild(newPhoneListNameDiv);
		newPhoneList.appendChild(newPhoneListPhoneDiv);
		newPhoneList.appendChild(newPhoneListEditBtn);
		phonebookList.appendChild(newPhoneList);

		// 편집 때 쓸 input 버튼 2개랑 완료 버튼
		// 새로운 input 두개 생성해서 붙이기
		const nameInputEle = document.createElement("input");
		nameInputEle.classList.add("phoneDiv", "hide");
		nameInputEle.value = newPhoneList.childNodes[1].innerText;
		nameInputEle.addEventListener("keyup", handleKeyUp);

		const phoneInputEle = document.createElement("input");
		phoneInputEle.classList.add("phoneDiv", "hide");
		phoneInputEle.value = newPhoneList.childNodes[2].innerText;
		phoneInputEle.addEventListener("keyup", handleKeyUp);

		// 새로운 button 붙이기
		const finBtn = document.createElement("button");
		finBtn.innerText = "완료";
		finBtn.classList.add("hide");
		finBtn.addEventListener("click", handleFin);

		// 리스트 추가
		newPhoneList.appendChild(nameInputEle);
		newPhoneList.appendChild(phoneInputEle);
		newPhoneList.appendChild(finBtn);
		
		data.push({
			id: phoneData[i].name,
			name: phoneData[i].name,
			phone: phoneData[i].phone
		});
	}
}

function handleKeyUp(event) {
	if (event.keyCode == 13) {
		event.preventDefault();
		event.target.parentNode.childNodes[6].click();
	}
}

function handleSubmit(event) {
	event.preventDefault();
	console.log(event);
	createList();
	saveInputs();
	clearInputs();
}

function createList() {
	// 새로운 리스트 element
	const newPhoneList = document.createElement("List");
	
	// 삭제 버튼
	const newPhoneListBtn = document.createElement("button");
	newPhoneListBtn.addEventListener("click", handleErase);
	newPhoneListBtn.innerText = "X";
	
	// 붙여넣을 이름
	const newPhoneListNameDiv = document.createElement("div");
	const newPhoneListName = document.createTextNode(`${nameInput.value}`);
	newPhoneListNameDiv.classList.add("phone-name",  "phoneDiv");
	newPhoneListNameDiv.appendChild(newPhoneListName);
	
	// 붙여넣을 전화번호
	const newPhoneListPhoneDiv = document.createElement("div");
	const newPhoneListPhone = document.createTextNode(`${phoneInput.value}`);
	newPhoneListPhoneDiv.classList.add("phone-number",  "phoneDiv");
	newPhoneListPhoneDiv.appendChild(newPhoneListPhone);
	
	// 편집 버튼
	const newPhoneListEditBtn = document.createElement("button");
	newPhoneListEditBtn.addEventListener("click", handleEdit);
	newPhoneListEditBtn.classList.add("phone-edit");
	newPhoneListEditBtn.innerText = "수정";
	
	// 리스트에 추가
	newPhoneList.appendChild(newPhoneListBtn);
	newPhoneList.appendChild(newPhoneListNameDiv);
	newPhoneList.appendChild(newPhoneListPhoneDiv);
	newPhoneList.appendChild(newPhoneListEditBtn);
	phonebookList.appendChild(newPhoneList);
	
	// 편집 때 쓸 input 버튼 2개랑 완료 버튼
	// 새로운 input 두개 생성해서 붙이기
	const nameInputEle = document.createElement("input");
	nameInputEle.classList.add("phoneDiv", "hide");
	nameInputEle.value = newPhoneList.childNodes[1].innerText;

	const phoneInputEle = document.createElement("input");
	phoneInputEle.value = newPhoneList.childNodes[2].innerText;
	phoneInputEle.classList.add("phoneDiv", "hide");
	
	// 새로운 button 붙이기
	const finBtn = document.createElement("button");
	finBtn.innerText = "완료";
	finBtn.classList.add("hide");
	finBtn.addEventListener("click", handleFin);

	// 리스트 추가
	newPhoneList.appendChild(nameInputEle);
	newPhoneList.appendChild(phoneInputEle);
	newPhoneList.appendChild(finBtn);
}

function saveInputs() {
	const nameText = nameInput.value;
	const phoneText = phoneInput.value;
	
	data.push({
		id: nameText,
		name: nameText,
		phone: phoneText
	});
	
	saveInLocal();
}

function saveInLocal() {
	localStorage.setItem("phoneData", JSON.stringify(data));
}

function clearInputs() {
	nameInput.value = "";	
	phoneInput.value = "";	
}

function handleErase(event) {
	const formerName = event.target.parentNode.childNodes[1].innerText;
	console.log(formerName);
	event.target.parentNode.remove();
	data = data.filter(data => data.id != formerName);
	saveInLocal();
}


function handleEdit(event) {
	hideList(event.target.parentNode);
}

function hideList(node) {
	// 원래 리스트 숨기기
	node.childNodes[1].classList.add("hide");
	node.childNodes[2].classList.add("hide");
	node.childNodes[3].classList.add("hide");
	node.childNodes[4].classList.remove("hide");
	node.childNodes[5].classList.remove("hide");
	node.childNodes[6].classList.remove("hide");
	
}

function handleFin(event) {
	const formerName = event.target.parentNode.childNodes[1].innerText;
	console.log(formerName);
	// input 새 값 입력
	const newName = event.target.parentNode.childNodes[4].value;
	const newPhoneNum = event.target.parentNode.childNodes[5].value;
	event.target.parentNode.childNodes[1].innerText = newName;
	event.target.parentNode.childNodes[2].innerText = newPhoneNum;
	event.target.parentNode.childNodes[0].classList.remove("hide");
	event.target.parentNode.childNodes[1].classList.remove("hide");
	event.target.parentNode.childNodes[2].classList.remove("hide");
	event.target.parentNode.childNodes[3].classList.remove("hide");
	event.target.parentNode.childNodes[4].classList.add("hide");
	event.target.parentNode.childNodes[5].classList.add("hide");
	event.target.parentNode.childNodes[6].classList.add("hide");
	data = data.map(data => data.id == formerName
		? {...data, id: newName, name: newName, phone: newPhoneNum}
		: data
	);
	
	saveInLocal();
	console.log(data);
}

function init() {
	phoneNameForm.addEventListener("submit", handleSubmit);
	phonePhoneForm.addEventListener("submit", handleSubmit);
	if (existingData) {
		showExistingData();
	}
}

init();