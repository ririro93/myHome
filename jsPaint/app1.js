// from nomad coders
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

if (canvas) {
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mouseleave", stopPainting);
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
}

function onMouseMove(event) {
	const x = event.offsetX;
	const y = event.offsetY;
	console.log(event);
	console.log("x: ", x, "y: ", y);
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
	painting = true;
}