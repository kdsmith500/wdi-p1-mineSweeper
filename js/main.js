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
replay.forEach(function (replayHandler) {
    replayHandler.addEventListener('click', replayButton);
});

/*----- functions -----*/

function setBeginner() { /*>>>event handler to set preset beginner board<<<*/
    width.value = '9';
    height.value = '9';
    boardMines.value = '10';
};

function setIntermediate() { /*>>>event handler to set preset intermediate board<<<*/
    width.value = '16';
    height.value = '16';
    boardMines.value = '40';
};

function setExpert() { /*>>>event handler to set preset expert board<<<*/
    width.value = '16';
    height.value = '30';
    boardMines.value = '99';
};

function replayButton() { /*>>>replay button on win/lose condition screens<<<*/
    winCondition.style = 'display: none;';
    loseCondition.style = 'display: none;';
    titlePage.style = 'display: grid;';
    for (let i = 0; i < w*h; i++) { /*>>>this iterates through all appended images in the main that make up the previous game board and deletes them<<<*/
        main.removeChild(main.childNodes[0]);
    }
}

function loseSequence() { /*>>>lose sequence, waits 5 seconds so player can see the board and then switches screens<<<*/
    setTimeout(function () {
        main.style = 'display: none;';
        loseCondition.style = 'display: grid;';
    }, 5000);
}

function check(x1, y1) { /*>>>checks if the cell index it is called on exists in the game board, if it is it returns the value of the index in the board<<<*/
    if ((x1 >= 0) && (y1 >= 0) && (x1 < w) && (y1 < h))
        return board[x1 + y1 * w];
}

function picture(index) { /*>>>this function takes the image src in the cell index, counts back 5 in the src name and returns 1 string, so its returns the file name corresponding to 0-8, mine, flag, ?, cake<<<*/
    return cell[index].src.substr(cell[index].src.length - 5, 1);
}

function createBoard() { /*>>>this in the initialization function that creates the game board<<<*/
    mines = boardMines.value;
    w = boardWidth.value;
    h = boardHeight.value;
    if (mines > w * h) {
        return alert("You must define a board with enough room for your mines!");
    }
    remaining = mines;
    cell = []; /*>>>images are stored in here, index represents cell in area of board<<<*/
    board = []; /*>>>value representing whats hidden in the cell<<<*/
    revealed = []; /*>>>count of cells revealed by player<<<*/
    placed = 0; /*>>>count of mines placed on generation of board<<<*/
    titlePage.style = "display: none;";
    main.style = `display: flex; width: ${w * 34}px;`;
    for (let i = 0; i < w * h; i++) { /*>>>this loops through the area of the board to create images representing each cell<<<*/
        cell[i] = document.createElement('img');
        cell[i].src = "images/x.png";
        cell[i].style = "height: 30px; width: 30px";
        cell[i].addEventListener('mousedown', click);
        cell[i].id = i;
        main.appendChild(cell[i]);
    }
    do {
        i = Math.floor(Math.random() * w * h); /*>>>this creates a random number inside the specified board area and asigns a mine until placed = mines<<<*/
        if (board[i] != 'mine') {
            board[i] = 'mine';
            placed++;
        }
    } while (placed < mines); /*>>>this is a nested for loop that runs as mines are placed and will iterate through every cell in the board<<<*/
    for (let x = 0; x < w; x++)
        for (let y = 0; y < h; y++) {
            if (check(x, y) != 'mine') { /*>>>each mine it encounters will cause it to call the check function on every adjacent cell and decide either 1 or 0 and sum the total, that total then becomes what occupies that cell<<<*/
                board[x + y * w] =
                    ((check(x, y + 1) == 'mine') | 0)
                    + ((check(x - 1, y + 1) == 'mine' && x !== 0) | 0)
                    + ((check(x + 1, y + 1) == 'mine' && x !== w) | 0)
                    + ((check(x, y - 1) == 'mine') | 0)
                    + ((check(x - 1, y - 1) == 'mine' && x !== 0) | 0)
                    + ((check(x + 1, y - 1) == 'mine' && x !== w) | 0)
                    + ((check(x - 1, y) == 'mine' && x !== 0) | 0)
                    + ((check(x + 1, y) == 'mine' && x !== w) | 0);
            }
        }
    // return countMines();
}

// function countMines() {
//     for (let x = 0; x < w; x++) {
//         for (let y = 0; y < h; y++) {
//             if (check(x, y) != 'mine') { /*>>>each mine it encounters will cause it to call the check function on every adjacent cell and decide either 1 or 0 and sum the total, that total then becomes what occupies that cell<<<*/
//                 board[x + y * w] =
//                     ((check(x, y + 1) == 'mine') | 0)
//                     + ((check(x - 1, y + 1) == 'mine' && x !== 0) | 0)
//                     + ((check(x + 1, y + 1) == 'mine' && x !== w) | 0)
//                     + ((check(x, y - 1) == 'mine') | 0)
//                     + ((check(x - 1, y - 1) == 'mine' && x !== 0) | 0)
//                     + ((check(x + 1, y - 1) == 'mine' && x !== w) | 0)
//                     + ((check(x - 1, y) == 'mine' && x !== 0) | 0)
//                     + ((check(x + 1, y) == 'mine' && x !== w) | 0);
//             }
//         }
//     }
// }

function click(event) { /*>>>this event listens for the mouse click on the particular cell clicked<<<*/
    let source = event.target;
    let id = source.id;
    if (event.button === 2) { /*>>>this switch is entered if the mouse event is a right click and cycles through flag, question mark, back to covered cell<<<*/
        switch (picture(id)) {
            case 'x':
                cell[id].src = 'images/f.png';
                remaining--;
                break;
            case 'f':
                cell[id].src = 'images/q.png';
                remaining++;
                break;
            case 'q':
                cell[id].src = 'images/x.png';
                break;
        }
    }
    if (event.button === 0 && picture(id) != 'f' && picture(id) != 'q') { /*>>>if the event is a left click and not on a flag or question mark<<<*/
        if (board[id] == 'mine') { /*>>>if you left click a mine, lose sequence is initiated and a for loop iterates through the entire board revealing all mines and incorrectly palces flags<<<*/
            loseSequence();
            for (i = 0; i < w * h; i++) {
                if (board[i] == 'mine') {
                    cell[i].src = 'images/m.png';
                } else if (board[i] != 'mine' && picture(i) == 'f') {
                    cell[i].src = 'images/e.png';
                }
            }
        } else if (picture(id) == 'x') { /*>>>otherwise pass the index clicked in the reveal function<<<*/
            reveal(id);
        }
    }
    if (revealed == w * h - mines) { /*>>>if the revealed cell count equals the board area minus the mines, win sequence is initiated<<<*/
        main.style = 'display: none;';
        winCondition.style = 'display: grid;';
    }
}

function reveal(index) { /*>>>this checks if the cell is covered and not a mine<<<*/
    if (board[index] != 'mine' && picture(index) == 'x') {
        revealed++;
        cell[index].src = 'images/' + board[index] + '.png'; /*>>>this takes the string in the cell that is to be revealed and concatenates it into the file path for the image to be revealed<<<*/
        if (board[index] == 0) revealAdjacent(index);
    }
}

function revealAdjacent(index) { /*>>>after the cell interacted with is revealed the index is then passed into this function<<<*/
    index = parseInt(index); /*>>>these make sure the grid width, height, and the index selected are all numbers<<<*/
    w = parseInt(w);
    h = parseInt(h);
    let x = index % w; /*>>>these functions will turn any cell index into an x, y coorinate representing its position counting from 0<<<*/
    let y = Math.floor(index / w);
    for (let col = -1; col <= 1; col++) { /*>>>this is a nested for loop that will iterate through all cells adjacent to the cell that triggered the initial event<<<*/
        for (let row = -1; row <= 1; row++) {
            if ((col === 0 && row === 0) /*>>>if any of the postions exits outside of the board, return nothing<<<*/
                || (col === -1 && x === 0)
                || (col === 1 && x === w - 1)
                || (row === -1 && y === 0)
                || (row === 1 && y === h - 1)
            ) {
            } else { /*>>>otherwise pass each unrevealed existing adjacent cell index back into the reveal function<<<*/
                let idx = (y + row) * w + (x + col);
                if (picture(idx) == 'x') reveal(idx);
            }
        }
    }
}