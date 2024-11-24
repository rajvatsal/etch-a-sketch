function generateStylus(e) {
	e.stopPropagation();

	const totalSquares = prompt("Number of squares on each side");
	if (totalSquares > 100) return alert("Squares cannot be more than 100");
	const squareLength = stylus.offsetWidth / totalSquares;
	stylus.innerHTML = "";
	renderStylus(totalSquares, squareLength);
}

function renderStylus(totalSquares, len) {
	for (let i = 0; i < totalSquares; i++) {
		const row = document.createElement("div");
		row.classList.add("row");
		stylus.appendChild(row);
		for (let j = 0; j < totalSquares; j++) {
			const square = document.createElement("div");
			square.classList.add("square");
			square.style.height = `${len}px`;
			square.style.width = `${len}px`;
			row.appendChild(square);
		}
	}
}

function drawInStylus(e) {
	e.target.classList.add("draw");
	e.target.style.backgroundColor = "";
}

function eraseInStylus(e) {
	e.target.classList.remove("draw");
	e.target.style.backgroundColor = "";
}

const getRandom = (upperBound) => Math.floor(Math.random() * (upperBound + 1));

function drawRandom(clr, e) {
	e.target.style.backgroundColor = `hsl(${clr.hue}deg, ${clr.saturation}%, ${clr.lightness}%)`;
	clr.reduceLightness();
}

function removePreviousEventListeners() {
	stylus.removeEventListener("mousedown", drawEventHandlerStylus);
	stylus.removeEventListener("mousedown", eraseEventHandlerStylus);
	stylus.removeEventListener("mousedown", drawRandomColorsEventHandlerStylus);
}

const stopDraw = (event, fn) => () => stylus.removeEventListener(event, fn);

const generateStylusButton = document.querySelector(".generate-stylus");
const eraseInStylusButton = document.querySelector(".eraser");
const penButton = document.querySelector(".pen");
const randomColorButton = document.querySelector(".random-color");
const clearStylusButton = document.querySelector(".clear-stylus");
const buttonAll = document.querySelectorAll("button");
const stylus = document.querySelector(".draw-board");
const DF_STYLUS_PIXEL_WIDTH = 8;
const DF_STYLUS_PIXEL_COUNT = 64;

renderStylus(DF_STYLUS_PIXEL_COUNT, DF_STYLUS_PIXEL_WIDTH);

function drawEventHandlerStylus(e) {
	const drawEvent = "mouseover";

	drawInStylus(e);
	stylus.addEventListener(drawEvent, drawInStylus);
	stylus.addEventListener("mouseup", stopDraw(drawEvent, drawInStylus));
	stylus.addEventListener("mouseleave", stopDraw(drawEvent, drawInStylus));
}

function eraseEventHandlerStylus(e) {
	const drawEvent = "mouseover";

	eraseInStylus(e);
	stylus.addEventListener(drawEvent, eraseInStylus);
	stylus.addEventListener("mouseup", stopDraw(drawEvent, eraseInStylus));
	stylus.addEventListener("mouseleave", stopDraw(drawEvent, eraseInStylus));
}

function drawRandomColorsEventHandlerStylus(e) {
	const clr = {
		hue: getRandom(360),
		saturation: getRandom(100),
		lightness: 50,
		reduceLightness: function () {
			this.lightness = this.lightness <= 0 ? 0 : this.lightness - 50 / 100;
		},
	};
	const boundFn = drawRandom.bind(drawRandom, clr);
	const drawEvent = "mouseover";

	drawRandom(clr, e);
	stylus.addEventListener(drawEvent, boundFn);
	stylus.addEventListener("mouseup", stopDraw(drawEvent, boundFn));
	stylus.addEventListener("mouseleave", stopDraw(drawEvent, boundFn));
}

eraseInStylusButton.addEventListener("click", () => {
	removePreviousEventListeners();
	stylus.addEventListener("mousedown", eraseEventHandlerStylus);
});
penButton.addEventListener("click", () => {
	removePreviousEventListeners();
	stylus.addEventListener("mousedown", drawEventHandlerStylus);
});
randomColorButton.addEventListener("click", () => {
	removePreviousEventListeners();
	stylus.addEventListener("mousedown", drawRandomColorsEventHandlerStylus);
});

generateStylusButton.addEventListener("click", generateStylus);

clearStylusButton.addEventListener("click", () => {
	Array.from(stylus.getElementsByClassName("square"), (square) => {
		square.classList.remove("draw");
		square.style.backgroundColor = "";
	});
});

// biome-ignore lint/complexity/noForEach: <explanation>
buttonAll.forEach((button) =>
	button.addEventListener("mouseover", (e) => {
		e.target.classList.add("hover");
	}),
);

// biome-ignore lint/complexity/noForEach: <explanation>
buttonAll.forEach((button) =>
	button.addEventListener("mouseleave", (e) => {
		e.target.classList.remove("hover");
	}),
);
