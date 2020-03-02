// my tweaks
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const widthBtn = document.getElementById("jsRange").querySelector("input");
const colorBtns = document.querySelectorAll(".controls_color");
const modeBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clearBtn = document.getElementById("jsClear");
const rangeText = document.getElementById("jsRangeText");

// initiate canvas
canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "rgb(255, 255, 255)";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "rgb(99, 110, 114)";
ctx.strokeStyle = "rgb(99, 110, 114)";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

if (canvas) {
	// mouse events on canvas
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mouseleave", stopPainting);
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("contextmenu", handleRightClick);
	
	// control button events
	widthBtn.addEventListener("input", changeThick);
	modeBtn.addEventListener("click", handleClickMode);
	clearBtn.addEventListener("click", handleClickClear);
	saveBtn.addEventListener("click", handleClickSave);
	
	// color button events
	Array.from(colorBtns).forEach(array => array.addEventListener("click", onClickColor));
}

function onMouseMove(event) {
	const x = event.offsetX;
	const y = event.offsetY;
	
	if(!painting) {
		ctx.beginPath();
		ctx.moveTo(x, y);
	} else {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

function stopPainting() {
	painting = false;
}

function startPainting(event) {
	if (filling) {
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	} else {
		painting = true;
	}
}

function handleRightClick(event) {
	console.log(event);
	event.preventDefault();
}

function handleClickSave(event) {
	const image = canvas.toDataURL();
	const link = document.createElement("a");
	link.href = image;
	link.download = "image.png";
	link.click();
}

function changeThick() {
	const width = widthBtn.value
	ctx.lineWidth = width;
	rangeText.innerText = width;
}

function onClickColor(event) {
	// activate button
	const color = event.target.style.backgroundColor;
	const r = getRgb(color)[0];
	const g = getRgb(color)[1];
	const b = getRgb(color)[2];
	
	Array.from(colorBtns).forEach(colorBtn => colorBtn.classList.remove("activated"));
	
	event.target.classList.add("activated");
	
	// change stroke color
	// console.log(event.target.style);
	ctx.strokeStyle = color;
	ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.3)`;
}

function handleClickMode(event) {
	const text = event.target.innerText;
	if(text == "Fill") {
		event.target.innerText = "Paint";
		filling = false;
	} else {
		event.target.innerText = "Fill";
		filling = true;
	}
}

function handleClickClear(event) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getRgb(color) {
	// const color = $('#my_element').css('backgroundColor');
	const myRgb = /rgb\((\d+), (\d+), (\d+)\)/.exec(color);
	const r = myRgb[1],
		g = myRgb[2],
		b = myRgb[3];
	return [r, g, b]
}














