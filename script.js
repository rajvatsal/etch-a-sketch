function generateStylus(e){
    e.stopPropagation();
    clearMain();

    let size = prompt("Enter the size of square pixel in your grid in 'px'");
    let rowNum = prompt("enter row number");
    let columnNum = prompt("enter column number");
    let main = document.querySelector('main');
    let rowGroup = document.createElement('div');

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
    drawInStylus();
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
let generateStylusButton = document.querySelector('.generate-stylus');
let eraseInStylusButton = document.querySelector('.eraser');

generateStylusButton.addEventListener('click', generateStylus);
eraseInStylusButton.addEventListener('click', eraseInStylus);