'use strict'
const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
const POWERFOOD = '🍄';
const CHERRY = '🍒';

var gCherryInterval = null;

var foodCount = 0;

var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    // console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    gCherryInterval = setInterval(addCherry, 10000)
    document.querySelector('h2 span').innerText = gGame.score
    gGame.score = 0;


}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
        }
    }
    board[1][board[0].length - 2] = POWERFOOD;
    board[1][1] = POWERFOOD;
    board[board[0].length - 2][board[0].length - 2] = POWERFOOD;
    board[board.length - 2][1] = POWERFOOD;
    return board;
}

function addCherry(randomEmptyCell = findEmptyCells()) {
    gBoard[randomEmptyCell.i][randomEmptyCell.j] = CHERRY;
    renderCell(randomEmptyCell, CHERRY);
}

function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
    if (gGame.score >= 60) {
        victory();
    }
}

function gameOver() {
    // console.log('Game Over');
    var elModalH2 = document.querySelector('.modal h2');
    elModalH2.innerText = 'GAME OVER!!'
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'block';
    var elBtn = document.querySelector('.btn-container')
    elBtn.style.display = 'block';
    document.querySelector('h2 span').innerText = gGame.score

    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryInterval);
}

function victory() {
    console.log('victory!!');
    var elModalH2 = document.querySelector('.modal h2');
    elModalH2.innerText = 'victory!!'
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'block';
    var elBtn = document.querySelector('.btn-container')
    elBtn.style.display = 'block';
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
}

function playAgain() {
    init();
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
}

