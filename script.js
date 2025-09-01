const containerDiv = document.querySelector('#container');
let isMouseDown = false;

document.addEventListener('mousedown', () => isMouseDown = true);
document.addEventListener('mouseup', () => isMouseDown = false);

//default 16x16 grid

for (let i = 0; i < 256; i++) {
    const newGrid = document.createElement('div');
    newGrid.classList.add('flex-square');
    newGrid.style.width = '45px';
    newGrid.style.height = '45px';
    containerDiv.append(newGrid);
}

//addeventlisteners and check what mode is active

function applyHoverEffect() {
    const squares = document.querySelectorAll('.flex-square');

    squares.forEach(square => {
        square.addEventListener('mouseover', () => {
            if (eraserMode && isMouseDown) {
                square.style.backgroundColor = 'white';
            }

            else if (randomColorMode) {
                const [r, g, b] = randomColor();
                square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            } 

            else {
                square.style.backgroundColor = setColor();
            }
        });

        square.addEventListener('click', () => {
            if (eraserMode) {
                square.style.backgroundColor = 'white';
            }
        })
    });
}

applyHoverEffect();

//set color function
function setColor (){
    const colorValue = document.querySelector('#colorPicker').value
    return colorValue;
}


//clear grid button

const clearButton = document.querySelector('#clearButton');

clearButton.addEventListener('click', () => {
    const squares = document.querySelectorAll('.flex-square');
    squares.forEach(square => {
        square.style.backgroundColor = 'white';
    });
});

//Choose grid size and update grid size

const setGridSize = document.querySelector('#getGridSize');

setGridSize.addEventListener('click', () => {
    let userInput = prompt('Please enter the size of the grid. Maximum size allowed is 100: ');
    let gridSize = parseInt(userInput);

    if (isNaN(gridSize) || !Number.isInteger(gridSize) || gridSize > 100){
        alert('Invalid Input. Please enter a whole number between 1 and 100.');
        return;
    }

    containerDiv.innerHTML = '';
    const squareSize = 720 / gridSize;
    const totalSquares = gridSize * gridSize;

    for (let i = 0; i < totalSquares; i++){
        const newGrid = document.createElement('div');
        newGrid.classList.add('flex-square');
        newGrid.style.width = `${squareSize}px`;
        newGrid.style.height = `${squareSize}px`;
        containerDiv.appendChild(newGrid);
    }

    applyHoverEffect();
})

//Random Color
function randomColor () {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return [r, g, b];
}

const randomColorButton = document.querySelector('#randomColorButton');
let randomColorMode = false;

randomColorButton.addEventListener('click', () => {
  randomColorMode = !randomColorMode;
  randomColorButton.classList.toggle('random-active');
});

//Eraser Button
const eraserButton = document.querySelector('#eraserButton');
let eraserMode = false;

eraserButton.addEventListener('click', () => {
    eraserMode = !eraserMode
    eraserButton.classList.toggle('eraser-active');
})