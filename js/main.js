/*----- constants -----*/


/*----- app's state (variables) -----*/

let w;
let h;
let board;
/*----- cached element references -----*/

let boardWidth = document.getElementById('width');
let boardHeight = document.getElementById('height');
let boardMines = document.getElementById('mines');
let titlePage = document.getElementById('title-page');
let main = document.querySelector('main');
/*----- event listeners -----*/

document.getElementById('beginner').addEventListener('click', setBeginner);
document.getElementById('intermediate').addEventListener('click', setIntermediate);
document.getElementById('expert').addEventListener('click', setExpert);
document.getElementById('play').addEventListener('click', createBoard);
// document.querySelectorAll('.replay')addEventListener('click', MAKE_REPLAY_FUNCTION);

/*----- functions -----*/

function setBeginner() {
    width.value = '9';
    height.value = '9';
    mines.value = '10'; 
};

function setIntermediate() {
    width.value = '16';
    height.value = '16';
    mines.value = '40';
};

function setExpert() {
    width.value = '16';
    height.value = '30';
    mines.value = '99';
};

function check(x1, y1) {
    if ((x1 >= 0) && (y1 >= 0) && (x1 <= w) && (y1 <= h))
        return board[x1+y1*w];
}

function createBoard() {
    let mines = boardMines.value;
    w = boardWidth.value;
    h = boardHeight.value;
    let remaining = mines;
    let cell = [];
    board = [];
    let revealed = [];
    titlePage.style = "display: none";
    main.style = `display: flex; width: ${w*34}px`;
    for (let i = 0; i < w*h; i++) {
        cell[i] = document.createElement('img');
        cell[i].src = "images/x.svg";
        cell[i].style = "height: 30px; width: 30px";
        // cell[i].addEventListener('click', click);
        cell[i].id = i;
        main.appendChild(cell[i]);
    }
    let placed = 0;
    do {
        i = Math.floor(Math.random()*w*h);
        if (board[i] != 'mine') {
            board[i] = 'mine';
            placed++;
        }
    } while (placed < mines);
    for (let x = 0; x < w; x++)
        for (let y = 0; y < h+1; y++) {
            if (check(x, y) != 'mine') {
                board[x+y*w] =
                ((check(x, y+1) == 'mine') | 0)
                + ((check(x-1, y+1) == 'mine') | 0)
                + ((check(x+1, y+1) == 'mine') | 0)
                + ((check(x, y-1) == 'mine') | 0)
                + ((check(x-1, y-1) == 'mine') | 0)
                + ((check(x+1, y-1) == 'mine') | 0)
                + ((check(x-1, y) == 'mine') | 0)
                + ((check(x+1, y) == 'mine') | 0);
            }
        }
}

