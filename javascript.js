const container = document.querySelector('.container');
const changeSizeBtn = document.querySelector('#change-size');
const resetBtn = document.querySelector('#reset');

let isDrawing = false;

container.appendChild(generateGrid(64));

changeSizeBtn.addEventListener('click', replaceGrid);
resetBtn.addEventListener('click', resetGrid);




function generateGrid(size) {
    const grid = document.createElement('div');
    for(let rows = 0; rows != size; rows++) {
        const row = document.createElement('div');
        row.className = 'row';
        for(let boxs = 0; boxs != size; boxs++) {
            const box = document.createElement('div');
            box.className = 'box';
            row.appendChild(box);
        }
        grid.appendChild(row);
    }
    enableDrawing(grid);
    return grid;
}

function getSize() {
    let newSize = 0;
    do {
        newSize = parseInt(prompt('Input a number between 1 and 100'));
    } while(isNaN(newSize) || newSize < 1 || newSize > 100);
    return newSize;
}

function replaceGrid() {
    const newSize = getSize();
    const currentGrid = container.firstElementChild;
    disableDrawing(currentGrid);
    const newGrid = generateGrid(newSize);
    container.replaceChild(newGrid, currentGrid);
}

function randomRGB() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `${r}, ${g}, ${b}`;
}

function enableDrawing(grid) {
    document.addEventListener('mousedown', toggleDrawing, { capture: true });
    document.addEventListener('mouseup', toggleDrawing, { capture: true });

    grid.addEventListener('mousedown', draw);
    grid.addEventListener('mousemove', draw);
}

function toggleDrawing(event) {
    event.preventDefault();
    if(event.type === 'mousedown') {
        isDrawing = true;
    } else if(event.type === 'mouseup') {
        isDrawing = false;
    }
}

function draw(event) {
    const isBox = event.target.classList.contains('box');
    if(event.type === 'mousemove') console.log('h');
    if(isBox && isDrawing) {
        const notColored = event.target.style.backgroundColor === '';
        const boxStyle = event.target.style;
        if(notColored) {
            const color = randomRGB();
            boxStyle.backgroundColor = `rgb(${color})`;
            boxStyle.opacity = '0.1';
        } else if(!(parseInt(boxStyle.opacity))) {

            const increaseOpacity = parseFloat(boxStyle.opacity) + 0.1;
            boxStyle.opacity = increaseOpacity;
        }
    }
}

function resetGrid() {
    const boxs = document.querySelectorAll('.box');
    boxs.forEach((box) => {
        box.style.backgroundColor = '';
    });
}

function disableDrawing(grid) {
    document.removeEventListener('mousedown', toggleDrawing, { capture: true });
    document.removeEventListener('mouseup', toggleDrawing, { capture: true });

    grid.removeEventListener('mouseover', draw);
    grid.removeEventListener('mousedown', draw);
}