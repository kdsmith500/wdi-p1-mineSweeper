/*----- constants -----*/

const width = document.getElementById('width');
const height = document.getElementById('height');
const mines = document.getElementById('mines');

/*----- app's state (variables) -----*/


/*----- cached element references -----*/


/*----- event listeners -----*/

document.getElementById('beginner').addEventListener('click', setBeginner);
document.getElementById('intermediate').addEventListener('click', setIntermediate);
document.getElementById('expert').addEventListener('click', setExpert);
document.getElementById('play').addEventListener('click', playGame);

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

function createBoard() {
    let width = `#width.value`;
    // let w, h, boardCell;
    // for (w = 0; i < #width)
    console.log(width);
}