'use strict'
const PACMAN = '😷';

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {
    if (!gGame.isOn) return;
    var nextLocation = getNextLocation(ev)
    if (!nextLocation) return;
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (gPacman.isSuper && nextCell === POWERFOOD) return
    if (nextCell === FOOD) {
        updateScore(1);
    } else if (nextCell === CHERRY) {
        updateScore(10);
    }
    else if (nextCell === GHOST) {
        if (gPacman.isSuper === true) {
            deleteGhost(nextLocation);
        } else {
            gameOver();
            renderCell(gPacman.location, EMPTY)
            return;
        }
    }
    if (nextCell === POWERFOOD) {
        gPacman.isSuper = true
        updateScore(1);
        setTimeout(() => {
            gPacman.isSuper = false;
            gGhosts = gGhosts.concat(gDeadGhosts);
            gDeadGhosts = [];
        }, 5000);
    }
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    renderCell(gPacman.location, EMPTY);
    gPacman.location = nextLocation;
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    renderCell(gPacman.location, PACMAN);
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}