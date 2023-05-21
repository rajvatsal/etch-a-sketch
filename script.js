function generateStylus(e){
    e.stopPropagation();
    clearMain();

    i = 100;//to reset the value of each time new stylus is created to work correctly for drawRandom()
    size = prompt("Enter the size of square pixel in your grid in 'px'");
    let rowNum = prompt("enter row number");
    let columnNum = prompt("enter column number");
    let main = document.querySelector('main');
    let rowGroup = document.createElement('div');

    if (+rowNum === 0) rowNum = 64;
    if (+columnNum === 0) columnNum = 64;
    if (+size === 0) size = 8;
    rowGroup.setAttribute('id', 'row-group');
    main.appendChild(rowGroup);

    for (let i = 0; i < rowNum; i++){
        let row = document.createElement('div');
        row.classList.add('row');
        rowGroup.appendChild(row);
        for (let j = 0; j < columnNum; j++){
            let square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute(`style`, `height: ${size}px; width: ${size}px;`)
            row.appendChild(square);
        }
    }
}
function clearMain(){
    let main = document.querySelector('main');
    while (main.hasChildNodes()){
        main.removeChild(main.firstChild);        
    }
}
function drawInStylus(e){
    e.target.classList.add('draw');
    i = 100;
}
function eraseInStylus(e){
        e.target.classList.remove('draw');
        e.target.removeAttribute('style');
        i = 100;
}
function drawRandom(e){
    if (i < 0) i = 0;
    e.target.setAttribute(`style`, `background-color: rgb(${Math.floor(Math.random() * i)}%, ${Math.floor(Math.random() * i)}%, ${Math.floor(Math.random() * i)}%); width: ${size}px; height: ${size}px`);
    i = i - 10;
}
function removePreviousEventListeners(){
    let square = document.querySelectorAll('.square');
    square.forEach(singleSquare => singleSquare.removeEventListener('mouseover', eraseInStylus));
    square.forEach(singleSquare => singleSquare.removeEventListener('mouseover', drawInStylus));
    square.forEach(singleSquare => singleSquare.removeEventListener('mouseover', drawRandom));
}

let generateStylusButton = document.querySelector('.generate-stylus');
let eraseInStylusButton = document.querySelector('.eraser');
let penButton = document.querySelector('.pen');
let randomColorButton = document.querySelector('.random-color')
let square = document.querySelectorAll('.square');
let clearStylusButton = document.querySelector('.clear-stylus');
let buttonAll = document.querySelectorAll('button');
let size = 0;
let i = 100;

generateStylusButton.addEventListener('click', generateStylus);

eraseInStylusButton.addEventListener('click', () => {
    removePreviousEventListeners();

    let square = document.querySelectorAll('.square');
    square.forEach(singleSquare => singleSquare.addEventListener('mouseover', eraseInStylus))
})
penButton.addEventListener('click', () => {
    removePreviousEventListeners();

    let square = document.querySelectorAll('.square');
    square.forEach(singleSquare => singleSquare.addEventListener('mouseover', drawInStylus))
})
randomColorButton.addEventListener('click', () => {
    removePreviousEventListeners();

    let square = document.querySelectorAll('.square');
    square.forEach(singleSquare => singleSquare.addEventListener('mouseover', drawRandom))
})

clearStylusButton.addEventListener('click', () => {
    let square = document.querySelectorAll('.square');
    square.forEach(singleSquare => {
        singleSquare.classList.remove('draw');;
        singleSquare.removeAttribute('style');
        i = 100;
    })
});
buttonAll.forEach(button => button.addEventListener('mouseover', (e) => {
    e.target.classList.add('hover');
}));
buttonAll.forEach(button => button.addEventListener('mouseleave', (e) => {
    e.target.classList.remove('hover');
}))