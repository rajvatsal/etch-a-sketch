function createSquares(rowNum, columnNum){
    let body = document.querySelector('body');
    let rowGroup = document.createElement('div');
    rowGroup.setAttribute('id', 'row-group');
    body.appendChild(rowGroup);
    for(let i = 0; i < rowNum; i++){
        let row = document.createElement('div');
        row.classList.add('row');
        rowGroup.appendChild(row);
        for(let j = 0; j < columnNum; j++){
            let square = document.createElement('div');
            square.classList.add('square');
            row.appendChild(square);
        }
    }
}