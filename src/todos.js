const todosForm = document.querySelector(".js-todos");
const todoInput = todosForm.querySelector("input");
const todoList = todosForm.querySelector("ul");

let i = 1;
let todos = [];

function handleClickCan(event) {
	// 페이지에서 지우기
	console.log(event.target.parentNode.id);
	removeElement(event.target.parentNode.id);
	todos = todos.filter(todo => todo.id != event.target.parentNode.id)
	
	// 로컬스토리지에서 지우기
	const newTodos = todos;
	localStorage.setItem("todos", JSON.stringify(newTodos));
}

function removeElement(elementId) {
    // Removes an element from the document.
    const element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function handleClickCheck(event) {
	// 줄 긋기
	event.target.parentNode.querySelector("div").classList.toggle("checked");
	
	// id로 todos에서 checked true로 바꾸기
	todos.map(todo => {
		if (todo.id == event.target.parentNode.id) {
			todo.checked = !todo.checked;
		}
	});
	saveTodos();
}

function handleSubmit(event) {
	event.preventDefault();
	const todoLi = document.createElement("Li");
	todoLi.id = i;
	
	const todoBtn1 = document.createElement("Button");
	todoLi.appendChild(todoBtn1);
	todoBtn1.innerText = "X";
	todoBtn1.type = "button";
	todoBtn1.onclick = handleClickCan;
	
	const todoText = document.createElement("div");
	todoText.innerText = todoInput.value;
	todoLi.appendChild(todoText);
	
	const todoBtn2 = document.createElement("Button");
	todoLi.appendChild(todoBtn2);
	todoBtn2.innerText = "✔";
	todoBtn2.type = "button";
	todoBtn2.classList.add("check");
	todoBtn2.onclick = handleClickCheck;
	
	todoList.appendChild(todoLi);
	
	// 로컬 스토리지에 할 일 저장
	todos.push({
		id: i++,
		text: todoInput.value,
		checked: false
	});
	saveTodos();
	
	// 인풋 초기화
	todoInput.value = "";
}

function saveTodos() {
	localStorage.setItem("todos", JSON.stringify(todos));
}

function showExistingTodos() {
	const existingTodos = JSON.parse(localStorage.getItem("todos"));
	existingTodos.forEach(todo => {
		const todoLi = document.createElement("Li");
		todoLi.id = todo.id;

		const todoBtn1 = document.createElement("Button");
		todoLi.appendChild(todoBtn1);
		todoBtn1.innerText = "X";
		todoBtn1.type = "button";
		todoBtn1.onclick = handleClickCan;

		const todoText = document.createElement("div");
		todoText.innerText = todo.text;
		todoLi.appendChild(todoText);

		const todoBtn2 = document.createElement("Button");
		todoLi.appendChild(todoBtn2);
		todoBtn2.innerText = "✔";
		todoBtn2.type = "button";
		todoBtn2.classList.add("check");
		todoBtn2.onclick = handleClickCheck;
		if (todo.checked) {
			todoText.classList.add("checked");
		}

		todoList.appendChild(todoLi);
		todos.push({
			id: todo.id,
			text: todo.text,
			checked: todo.checked
		});
		
		// 불러오고 새로운 할일 생성 할 때를 위한 i 선언
		i = todo.id + 1;
	})
}


function init() {
	todosForm.addEventListener("submit", handleSubmit);
	if(localStorage.getItem("todos")) {
		showExistingTodos();
	}
}

init();