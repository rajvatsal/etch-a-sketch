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
	e.target.setAttribute("style", `height: ${size}px; width: ${size}px;`);
	e.target.classList.add("draw");
}

function eraseInStylus(e) {
	e.target.classList.remove("draw");
	e.target.style.cssText = `height: ${size}px; width: ${size}px;`;
}

const getRandom = (upperBound) => Math.floor(Math.random() * (upperBound + 1));

function drawRandom(clr, e) {
	console.log(e.target);
	e.target.style.backgroundColor = `hsl(${clr.hue}deg, ${clr.saturation}%, ${clr.lightness}%)`;
	clr.reduceLightness();
}

function removePreviousEventListeners() {
	stylus.removeEventListener("mousedown", drawEventHandlerStylus);
	stylus.removeEventListener("mousedown", eraseEventHandlerStylus);
	stylus.removeEventListener("mousedown", drawRandomColorsEventHandlerStylus);
}

const generateStylusButton = document.querySelector(".generate-stylus");
const eraseInStylusButton = document.querySelector(".eraser");
const penButton = document.querySelector(".pen");
const randomColorButton = document.querySelector(".random-color");
const squares = document.querySelectorAll(".square");
const clearStylusButton = document.querySelector(".clear-stylus");
const buttonAll = document.querySelectorAll("button");
const stylus = document.querySelector(".draw-board");

const DEFAULT_STYLUS_WIDTH = 8;
const DEFAULT_STYLUS_SQRS = 64;

renderStylus(DEFAULT_STYLUS_SQRS, DEFAULT_STYLUS_WIDTH);

function drawEventHandlerStylus(e) {
	drawInStylus(e);
	stylus.addEventListener("mouseover", drawInStylus);
	stylus.addEventListener("mouseup", () => {
		stylus.removeEventListener("mouseover", drawInStylus);
	});
}

function eraseEventHandlerStylus(e) {
	eraseInStylus(e);
	stylus.addEventListener("mouseover", eraseInStylus);
	stylus.addEventListener("mouseup", () => {
		stylus.removeEventListener("mouseover", eraseInStylus);
	});
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

	drawRandom(clr, e);
	stylus.addEventListener("mouseover", boundFn);
	stylus.addEventListener("mouseup", () => {
		stylus.removeEventListener("mouseover", boundFn);
	});
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
	// biome-ignore lint/complexity/noForEach: <explanation>
	squares.forEach((square) => {
		square.classList.remove("draw");
		square.style.cssText = `height: ${size}px; width: ${size}px;`;
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
