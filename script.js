function generateStylus(e){
    e.stopPropagation();
    clearMain();

    i = 100;//to reset the value of each time new stylus is created to work correctly for drawRandom()
    let size = prompt("Enter the size of square pixel in your grid in 'px'");
    let rowNum = prompt("enter row number");
    let columnNum = prompt("enter column number");
    let main = document.querySelector('main');
    let rowGroup = document.createElement('div');

    if (+rowNum === 0) rowNum = 64;
    if (+columnNum === 0) columnNum = 64;
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
function drawInStylus(){
    let square = document.querySelectorAll('.square');
    square.forEach(singleSquare => singleSquare.addEventListener('mouseover', (e) => {
        e.target.classList.add('draw');
    }))
}
function eraseInStylus(){
    let square = document.querySelectorAll('.square');
    square.forEach(singleSquare => singleSquare.addEventListener('mouseover', (e) => {
        e.target.classList.remove('draw');
    }))
}
function getRandomColor(i){
    if (i < 0) i = 0;
    return `background-color: rgb(${Math.floor(Math.random() * i)}%, ${Math.floor(Math.random() * i)}%, ${Math.floor(Math.random() * i)}%`
}
function drawRandom(){
    let square = document.querySelectorAll('.square');
    square.forEach(singleSquare => singleSquare.addEventListener('mouseover', (e) => {
        e.target.setAttribute(`style`, `${getRandomColor(i)}`);
        i -= 10;
    }))
}

let generateStylusButton = document.querySelector('.generate-stylus');
let eraseInStylusButton = document.querySelector('.eraser');
let penButton = document.querySelector('.pen');
let randomColorButton = document.querySelector('.random-color')
let square = document.querySelectorAll('.square');
let clearStylus = document.querySelector('.clear-stylus');
let i = 110;

generateStylusButton.addEventListener('click', generateStylus);
eraseInStylusButton.addEventListener('click', eraseInStylus);
penButton.addEventListener('click', drawInStylus);
randomColorButton.addEventListener('click', drawRandom);
clearStylus.addEventListener('click', () => {
    let square = document.querySelectorAll('.square');
    square.forEach(singleSquare => singleSquare.classList.remove('draw'));
});