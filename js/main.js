/*----- constants -----*/


/*----- app's state (variables) -----*/

let w;
let h;
let board;
let mines;
let remaining;
let cell;
let revealed;
let placed;
/*----- cached element references -----*/

let boardWidth = document.getElementById('width');
let boardHeight = document.getElementById('height');
let boardMines = document.getElementById('mines');
let titlePage = document.getElementById('title-page');
let main = document.querySelector('main');
let replay = document.querySelectorAll('.replay');
let winCondition = document.getElementById('win-condition');
let loseCondition = document.getElementById('lose-condition');
/*----- event listeners -----*/

document.getElementById('beginner').addEventListener('click', setBeginner);
document.getElementById('intermediate').addEventListener('click', setIntermediate);
document.getElementById('expert').addEventListener('click', setExpert);
document.getElementById('play').addEventListener('click', createBoard);
replay.forEach(function(replayHandler) {
    replayHandler.addEventListener('click', replayButton);
});

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

function replayButton() {
    winCondition.style = 'display: none;';
    loseCondition.style = 'display: none;';
    titlePage.style = 'display: grid;';
}

function loseSequence() {
    setTimeout(function() {
    main.style = 'display: none;';
    loseCondition.style = 'display: grid;';
    }, 10000);
}

function check(x1, y1) {
    if ((x1 >= 0) && (y1 >= 0) && (x1 <= w) && (y1 <= h))
        return board[x1+y1*w];
}

function picture(index) {
    return cell[index].src.substr(cell[index].src.length - 5, 1);
}

function createBoard() {
    mines = boardMines.value;
    w = boardWidth.value;
    h = boardHeight.value;
    remaining = mines;
    cell = [];
    board = [];
    revealed = [];
    placed = 0;
    titlePage.style = "display: none;";
    main.style = `display: flex; width: ${w*34}px;`;
    for (let i = 0; i < w*h; i++) {
        cell[i] = document.createElement('img');
        cell[i].src = "images/x.png";
        cell[i].style = "height: 30px; width: 30px";
        cell[i].addEventListener('mousedown', click);
        cell[i].id = i;
        main.appendChild(cell[i]);
    }
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

function click(event) {
    console.log(`${event.button}`);
    let source = event.target;
    let id = source.id;
    if (event.button === 2) {
        switch (picture(id)) {
            case 'x':
            console.log('flag');
                cell[id].src = 'images/f.png';
                remaining--;
                break;
            case 'f':
            console.log('question mark');
                cell[id].src = 'images/q.png';
                remaining++;
                break;
            case 'q':
            console.log('covered');
                cell[id].src = 'images/x.png';
                break;
        }
        console.log('out of switch');
    }
    if (event.button === 0 && picture(id) != 'f' && picture(id) != 'q') {
        console.log('left click not flag not question mark');
        if (board[id] == 'mine') {
            console.log('mine');
            loseSequence();
            for (i = 0; i < w*h; i++) {
                if (board[i] == 'mine') {
                    cell[i].src = 'images/m.png';
                } else if (board[i] != 'mine' && picture(i) == 'f') {
                    cell[i].src = 'images/e.png';
                }
            }
        } else if (picture(id) == 'x') {
            console.log(`reveal ${id}`);
            reveal(id);
        } 
    }
    if (revealed == w*h - mines) {
        main.style = 'display: none;';
        winCondition.style = 'display: grid;';
    }
}

function reveal(index) {
    if (board[index] != 'mine' && picture(index) == 'x') {
        revealed++;
        cell[index].src = 'images/' + board[index] + '.png';
    }
    x = index % w;
    y = Math.floor(index / w);
    // if (board[index] == 0) {
    //     console.log('you clicked a 0');
    //     switch () {
    //         case (x > 0 && picture(index - 1) == 'x'):
    //             console.log('cell left');
    //             reveal(index - 1);
    //         case (x < (w - 1) && picture(index + 1) == 'x'):
    //             console.log('cell right');
    //             reveal(index + 1);
    //         case (y < (h - 1) && picture(index + w) == 'x'):
    //             console.log('cell down');
    //             reveal(index + w);
    //         case (y > 0 && picture(index - w) == 'x'):
    //             console.log('cell up');
    //             reveal(index - w);
    //         case (x > 0 && y > 0 && picture(index - w - 1) == 'x'):
    //             console.log('cell up-left');
    //             reveal(index - w - 1);
    //         case (x < (w - 1) && y < (h - 1) && picture(index + w + 1) == 'x'):
    //             console.log('cell down-right');
    //             reveal(index + w + 1);
    //         case (x > 0 && y < (h - 1) && y < (h - 1) && picture(index + w - 1) == 'x'):
    //             console.log('cell down-left');
    //             reveal(index + w - 1);
    //         case (x < (w - 1) && y > 0 && y < (h - 1) && picture(index - w + 1) == 'x'):
    //             console.log('cell up-right');
    //             reveal (index - w + 1);
    //     }
    if (board[index] == 0) {
        console.log('you clicked a 0');
        if (x > 0 && picture(index - 1) == 'x') {
            console.log('cell left');
            reveal(index - 1);
        }
        if (x < (w - 1) && picture(index + 1) == 'x') {
            console.log('cell right');
            reveal(index + 1);
        }
        if (y < (h - 1) && picture(index + w) == 'x') {
            console.log('cell down');
            reveal(index + w);
        }
        if (y > 0 && picture(index - w) == 'x') {
            console.log('cell up');
            reveal(index - w);
        }
        if (x > 0 && y > 0 && picture(index - w - 1) == 'x') {
            console.log('cell up-left');
            reveal(index - w - 1);
        }                                                   
        if (x < (w - 1) && y < (h - 1) && picture(index + w + 1) == 'x') {
            console.log('cell down-right');
            reveal(index + w + 1);
        }
        if (x > 0 && y < (h - 1) && y < (h - 1) && picture(index + w - 1) == 'x') {
            console.log('cell down-left');
            reveal(index + w - 1);
        }
        if (x < (w - 1) && y > 0 && y < (h - 1) && picture(index - w + 1) == 'x') {
            console.log('cell up-right');
            reveal (index - w + 1);
        }
    // if (board[index] == 0) {
    //     console.log('you clicked a 0');
    //     if (x > 0) {
    //         console.log('cell left');
    //         reveal(index - 1);
    //     }
    //     if (x < (w - 1)) {
    //         console.log('cell right');
    //         reveal(index + 1);
    //     }
    //     if (y < (h - 1)) {
    //         console.log('cell down');
    //         reveal(index + w);
    //     }
    //     if (y > 0) {
    //         console.log('cell up');
    //         reveal(index - w);
    //     }
    //     if (x > 0 && y > 0) {
    //         console.log('cell up-left');
    //         reveal(index - w - 1);
    //     }                                                   
    //     if (x < (w - 1) && y < (h - 1)) {
    //         console.log('cell down-right');
    //         reveal(index + w + 1);
    //     }
    //     if (x > 0 && y < (h - 1) && y < (h - 1)) {
    //         console.log('cell down-left');
    //         reveal(index + w - 1);
    //     }
    //     if (x < (w - 1) && y > 0 && y < (h - 1)) {
    //         console.log('cell up-right');
    //         reveal (index - w + 1);
    //     }
    }
}