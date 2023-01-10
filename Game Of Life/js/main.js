"use strict";

//TODO: RENDER THE BOARD IN TABLE
//TODO: ADD CLASS 'occupied
//TODO: ADD TOGGLE GAME BTN
//TODO: CLICK ON A TD WITH LIFE UPGRADE TO SUPER_LIFE AND NEVER DIES

const GAME_FREQ = 1000;
const LIFE = "🐺";
const SUPER_LIFE = "🦊";

//The Model:
var gBoard;
var gGameInterval;
var gRows = 10
var gCells = 10

// once page is loaded:
// 1. the gBoard glbal variable = createBoard()
// 2. render the board inside oninit functiion

function onInit() {
  gBoard = createBoard(gRows, gCells);
  renderBoard(gBoard);
}
//TODO:CLICK ON LIFE BLOWS UP THE NEGS AROUND- blowUpNegs()
function onCellClicked(elCell, cellI, cellJ) {
  if (gBoard[cellI][cellJ] === LIFE) {
    gBoard[cellI][cellJ] = SUPER_LIFE;
    elCell.innerText = gBoard[cellI][cellJ];
    blowUpNegs(cellI, cellJ);
  }
}

function blowUpNegs(cellI, cellJ) {
  for (let i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue;
    for (let j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= gBoard[0].length) continue;
      if (i === cellI && j === cellJ) continue;
      var currCell = gBoard[i][j];
      console.log(currCell);
      if (currCell === LIFE) {
        gBoard[i][j] = "";
        var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
        elCell.innerText = "";
        elCell.classList.remove('occupied')
      }
    }
  }
  console.table(gBoard);
}

function onToggleGame(elBtn) {
  console.log(elBtn);
  //forst click gInterval is undefined and so we wiill

  if (gGameInterval) {
    clearInterval(gGameInterval, GAME_FREQ);
    gGameInterval = null;
    elBtn.innerText = "Start";
  } else {
    gGameInterval = setInterval(play, GAME_FREQ);
    elBtn.innerText = "Stop";
  }
}

function play() {
  // gBooard is now NEW board so we use function runBooard
  gBoard = runGeneration(gBoard);
  // render the new gBoard to the console
  renderBoard(gBoard);
}


// Neibhors Loop :
function runGeneration(board) {
  var newBoard = copyMat(board);
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      var numOfNegs = countNegs(i, j, board);
      if (numOfNegs > 2 && numOfNegs < 6) {
        if (board[i][j] === "") newBoard[i][j] = LIFE;
      } else if (board[i][j] === LIFE) newBoard[i][j] = "";
    }
  }
  return newBoard;
}

function countNegs(cellI, cellJ, board) {
  var neihborsCount = 0;

  for (let i = cellI - 1; i <= cellI + 1; i++) {
    //protect edges
    if (i < 0 || i >= board.length) continue;
    for (let j = cellJ - 1; j <= cellJ + 1; j++) {
      //protect edges
      if (j < 0 || j >= board[i].length) continue;
      // skip the cell we check his neibhors
      if (i === cellI && j === cellJ) continue;
      if (board[i][j] === LIFE || board[i][j] === SUPER_LIFE) neihborsCount++;
    }
  }
  return neihborsCount;
}



// 50% of cells put good and 50% empty strings
// board[i][j] = Math.random() > 0.5 ? LIFE : "";

//rendering the board is simply using console.table
// MOST IMPORTANT FUNCTION
function renderBoard(board) {
  console.table(board);
  var strHTML = "";

  for (let i = 0; i < board.length; i++) {
    strHTML += `<tr>\n`;
    for (let j = 0; j < board[0].length; j++) {
      var currCell = board[i][j];
      var className = currCell ? 'occupied' : '';
      strHTML += `<td class="${className}"
      data-i="${i}" data-j="${j}"
      onclick="onCellClicked(this,${i},${j})">
      ${currCell}</td>`;
    }
    strHTML += `</tr>\n`;

    var elBoard = document.querySelector(".board");
    elBoard.innerHTML = strHTML;
  }
}

function createBoard(rows, cells) {
  var board = [];
  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < cells; j++) {
      board[i][j] = Math.random() > 0.5 ? LIFE : "";
    }
  }
  return board;
}