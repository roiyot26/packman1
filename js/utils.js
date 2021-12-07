function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



function findEmptyCells() {
  var res = [];
  for (var i = 1; i < gBoard.length - 1; i++) {
    for (var j = 0; j < gBoard[0].length - 1; j++) {
      if (gBoard[i][j] === EMPTY) {
        res.push({ i, j });
      }
    }
  }
  var randomIdx = getRandomIntInt(0, res.length)
  var randomEmptyCell = res[randomIdx];
  return randomEmptyCell
}


function getRandomIntInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}




