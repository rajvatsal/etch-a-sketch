function createSquares(e){
    e.stopPropagation();
    clearMain();
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
            row.appendChild(square);
        }
    }
}
function clearMain(){
    let main = document.querySelector('main');
    console.log(main);
    while (main.hasChildNodes()){
        main.removeChild(main.firstChild);        
    }
}
let button = document.querySelector('button');
button.addEventListener('click', createSquares);