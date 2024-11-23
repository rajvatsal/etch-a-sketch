function generateStylus(e) {
	e.stopPropagation();
	clearstylus();

	i = 100; //to reset the value of each time new stylus is created to work correctly for drawRandom()

	let side = prompt("Enter side of the square");
	if (side > 100) return alert("Side cannot be more than 100");
	size = Math.sqrt(262144 / (side * side));

	if (+side === 0) side = 64;
	if (+size === 0) size = 8;

	renderStylus(side, size);
}

function renderStylus(side, size) {
	for (let i = 0; i < side; i++) {
		let row = document.createElement("div");
		row.classList.add("row");
		stylus.appendChild(row);
		for (let j = 0; j < side; j++) {
			let square = document.createElement("div");
			square.classList.add("square");
			square.setAttribute(`style`, `height: ${size}px; width: ${size}px;`);
			row.appendChild(square);
		}
	}
}

function clearstylus() {
	let stylus = document.querySelector(".draw-board");
	while (stylus.hasChildNodes()) {
		stylus.removeChild(stylus.firstChild);
	}
}

function drawInStylus(e) {
	e.target.setAttribute(`style`, `height: ${size}px; width: ${size}px;`);
	e.target.classList.add("draw");
	i = 100;
}

function eraseInStylus(e) {
	e.target.classList.remove("draw");
	e.target.style.cssText = `height: ${size}px; width: ${size}px;`;
	i = 100;
}

function drawRandom(e) {
	if (i < 0) i = 0;
	e.target.setAttribute(
		`style`,
		`background-color: rgb(${Math.floor(Math.random() * i)}%, ${Math.floor(Math.random() * i)}%, ${Math.floor(Math.random() * i)}%); width: ${size}px; height: ${size}px`,
	);
	i = i - 10;
}

function removePreviousEventListeners() {
	stylus.removeEventListener("mousedown", drawEventHandlerStylus);
	stylus.removeEventListener("mousedown", eraseEventHandlerStylus);
	stylus.removeEventListener("mousedown", drawRandomColorsEventHandlerStylus);
}

let generateStylusButton = document.querySelector(".generate-stylus");
let eraseInStylusButton = document.querySelector(".eraser");
let penButton = document.querySelector(".pen");
let randomColorButton = document.querySelector(".random-color");
let square = document.querySelectorAll(".square");
let clearStylusButton = document.querySelector(".clear-stylus");
let buttonAll = document.querySelectorAll("button");
let stylus = document.querySelector(".draw-board");
let size = 8;
let side = 64;
let i = 100;

renderStylus(side, size);

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
	i = 100;
	drawRandom(e);
	stylus.addEventListener("mouseover", drawRandom);
	stylus.addEventListener("mouseup", () => {
		stylus.removeEventListener("mouseover", drawRandom);
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
	let square = document.querySelectorAll(".square");
	square.forEach((singleSquare) => {
		singleSquare.classList.remove("draw");
		singleSquare.style.cssText = `height: ${size}px; width: ${size}px;`;
		i = 100;
	});
});

buttonAll.forEach((button) =>
	button.addEventListener("mouseover", (e) => {
		e.target.classList.add("hover");
	}),
);

buttonAll.forEach((button) =>
	button.addEventListener("mouseleave", (e) => {
		e.target.classList.remove("hover");
	}),
);
