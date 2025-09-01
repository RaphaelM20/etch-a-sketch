const containerDiv = document.querySelector('#container');
let colorModeActive = true;
let isMouseDown = false;

document.addEventListener('mousedown', () => isMouseDown = true);
document.addEventListener('mouseup', () => isMouseDown = false);

//default 16x16 grid

const defaultSize = 16; 

function createGrid(size) {
    containerDiv.innerHTML = '';

    const squareSize = 100 / size + '%';

    for (let i = 0; i < size * size; i++) {
        const newGrid = document.createElement('div');
        newGrid.classList.add('flex-square');

        newGrid.style.flex = `0 0 ${squareSize}`;
        newGrid.style.aspectRatio = '1 / 1';

        containerDiv.appendChild(newGrid);
    }

    applyHoverEffect(); 
}

createGrid(defaultSize);


//addeventlisteners and check what mode is active

function applyHoverEffect() {
    const squares = document.querySelectorAll('.flex-square');

    squares.forEach(square => {
        square.addEventListener('mouseover', () => {
            if (!isMouseDown) return;

            if (eraserMode) {
                square.style.backgroundColor = 'white';
            } 
            else if (randomColorMode) {
                const [r, g, b] = randomColor();
                square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            } 
            else if (colorModeActive){
                square.style.backgroundColor = setColor();
            }
        });

        square.addEventListener('click', () => {
            if (eraserMode) {
                square.style.backgroundColor = 'white';
            }
            else if (randomColorMode) {
                const [r, g, b] = randomColor();
                square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            }
            else if (colorModeActive) {
                square.style.backgroundColor = setColor();
            }
        });
    });
}


applyHoverEffect();

//set color function
function setColor (){
    const colorValue = document.querySelector('#colorPicker').value
    return colorValue;
}

//Color Mode Button
const colorModeButton = document.querySelector('#colorModeButton');

colorModeButton.addEventListener('click', () => {
    colorModeActive = !colorModeActive;
    colorModeButton.classList.toggle('color-active');

    // Turn off other modes
    if (colorModeActive) {
        eraserMode = false;
        randomColorMode = false;
        eraserButton.classList.remove('eraser-active');
        randomColorButton.classList.remove('random-active');
    }
});

//clear grid button

const clearButton = document.querySelector('#clearButton');

clearButton.addEventListener('click', () => {
    const squares = document.querySelectorAll('.flex-square');
    squares.forEach(square => {
        square.style.backgroundColor = 'white';
    });
});

//Choose grid size and update grid size

const gridSizeSlider = document.querySelector('#gridSizeRange');
const gridSizeValue = document.querySelector('#gridSizeValue');
const gridSizeValue2 = document.querySelector('#gridSizeValue2');

gridSizeSlider.addEventListener('input', () => {
    const gridSize = parseInt(gridSizeSlider.value);
    gridSizeValue.textContent = gridSize;
    gridSizeValue2.textContent = gridSize;

    containerDiv.innerHTML = '';
    const totalSquares = gridSize * gridSize;

    for (let i = 0; i < totalSquares; i++) {
        const newGrid = document.createElement('div');
        newGrid.classList.add('flex-square');
        
        const squareSizePercent = 100 / gridSize + '%';
        newGrid.style.flex = `0 0 ${squareSizePercent}`;
        newGrid.style.aspectRatio = '1 / 1';
        containerDiv.appendChild(newGrid);
    }

    applyHoverEffect();
});

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

  if (randomColorMode) {
        eraserMode = false;
        colorModeActive = false;
        eraserButton.classList.remove('eraser-active');
        colorModeButton.classList.remove('color-active');
    }
});

//Eraser Button
const eraserButton = document.querySelector('#eraserButton');
let eraserMode = false;

eraserButton.addEventListener('click', () => {
    eraserMode = !eraserMode
    eraserButton.classList.toggle('eraser-active');

    if (eraserMode) {
        randomColorMode = false;
        colorModeActive = false;
        randomColorButton.classList.remove('random-active');
        colorModeButton.classList.remove('color-active');
    }
})