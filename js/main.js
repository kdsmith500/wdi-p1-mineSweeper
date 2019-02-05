/*----- constants -----*/

const width = document.getElementById('width');
const height = document.getElementById('height');
const mines = document.getElementById('mines');

/*----- app's state (variables) -----*/

let gameBoard = [];

/*----- cached element references -----*/

let boardWidth = document.getElementById('width').getAttribute('value');
let boardHeight = document.getElementById('height').getAttribute('value');
let boardMines = document.getElementById('mines').getAttribute('value');

/*----- event listeners -----*/

document.getElementById('beginner').addEventListener('click', setBeginner);
document.getElementById('intermediate').addEventListener('click', setIntermediate);
document.getElementById('expert').addEventListener('click', setExpert);
// document.getElementById('play').addEventListener('click', createBoard);
// document.querySelectorAll('.replay')addEventListener('click', MAKE_REPLAY_FUNCTION);

/*----- functions -----*/

function setBeginner() {
    width.value = '9';
    height.value = '9';
    mines.value = '10'; 
    console.log('beginner');
};

function setIntermediate() {
    width.value = '16';
    height.value = '16';
    mines.value = '40';
    console.log('intermediate'); 
};

function setExpert() {
    width.value = '16';
    height.value = '30';
    mines.value = '99';
    console.log('expert');
};

// function createBoard() {
//     let w, h, boardCell;
//     for (w = 0; w < boardWidth; w++) {
//         gameBoard[w] = [];
//         for (h = 0; h < boardHeight; h++) {
//             boardCell = document.createElement('div');
//             let boardCellClass = document.createAttribute('class');
//             boardCellClass.value = "hidden-cell";
//             boardCell.setAttributeNode(boardCellClass);
//             boardCell.appendChild();
//             gameBoard[w][h] = gameBoard(boardCell, w, h);
//             boardCell.data('location', {x: w, y: h});
//         }
//     document.innerHTML('<div class="clear-cell"></div>').appendTo(main);
//     }
// }