const containerDiv = document.querySelector('#container');

//default 16x16 grid

for (let i = 0; i < 256; i++) {
    const newGrid = document.createElement('div');
    newGrid.classList.add('flex-square');
    newGrid.style.width = '45px';
    newGrid.style.height = '45px';
    containerDiv.append(newGrid);
}

function applyHoverEffect() {
    const squares = document.querySelectorAll('.flex-square');
    squares.forEach(square => {
        square.addEventListener('mouseover', () => {
            square.style.backgroundColor = setColor();
        });
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

//Choose grid size and update grid accordingly

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