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
	e.target.setAttribute(
		"style",
		`height: ${DF_STYLUS_PIXEL_WIDTH}px; width: ${DF_STYLUS_PIXEL_WIDTH}px;`,
	);
	e.target.classList.add("draw");
}

function eraseInStylus(e) {
	e.target.classList.remove("draw");
	e.target.style.cssText = `height: ${DF_STYLUS_PIXEL_WIDTH}px; width: ${DF_STYLUS_PIXEL_WIDTH}px;`;
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

const DF_STYLUS_PIXEL_WIDTH = 8;
const DF_STYLUS_PIXEL_COUNT = 64;

renderStylus(DF_STYLUS_PIXEL_COUNT, DF_STYLUS_PIXEL_WIDTH);

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
	Array.from(stylus.getElementsByClassName("square"), (square) => {
		square.classList.remove("draw");
		square.style.cssText = `height: ${DF_STYLUS_PIXEL_WIDTH}px; width: ${DF_STYLUS_PIXEL_WIDTH}px;`;
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
