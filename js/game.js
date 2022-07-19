'use strict'

const WALL = '🚧'
const FOOD = '◾'
const EMPTY = ' '
const POWER_FOOD = '🧁'
const CHERRY = '🍒'

var gInterval
var collectedFood = 0
var collectedCherry = 10
var gMaxFood = 56
var cherryInterval

var gGame = {
  score: 0,
  isOn: false,
}
var gBoard

function init() {
  gBoard = buildBoard()
  createPacman(gBoard)
  createGhosts(gBoard)
  cherryInterval = setInterval(addCherry, 5000)

  printMat(gBoard, '.board-container')
  gGame.isOn = true
}
function start() {
  var elAlert = document.querySelector('.modal')
  elAlert.style.display = 'none'
  document.querySelector('h2 span').innerText = collectedFood
  gGame.score = 0
  clearInterval(gInterval)
  clearInterval(gIntervalGhosts)
  clearInterval(cherryInterval)

  init()
}

function buildBoard() {
  const SIZE = 10
  const board = []

  for (var i = 0; i < SIZE; i++) {
    board.push([])

    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD

      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)
      ) {
        board[i][j] = WALL
      }
    }
  }

  board[1][1] =
    board[1][board[0].length - 2] =
    board[board.length - 2][board[0].length - 2] =
    board[board.length - 2][1] =
      POWER_FOOD
  return board
}

function updateScore(diff) {
  gGame.score += diff
  collectedFood = gGame.score

  document.querySelector('h2 span').innerText = collectedFood = gGame.score
}

function gameOver() {
  gGame.isOn = false
  var alertWin = document.querySelector('.modal span')

  if (gMaxFood === 0) {
    alertWin.innerText = 'You won the game! '
  }

  var elAlert = document.querySelector('.modal')
  elAlert.style.display = 'block'

  clearInterval(gIntervalGhosts)
  clearInterval(cherryInterval)
}

function addCherry() {
  const chosenCell = getEmptyCells()
  gBoard[chosenCell.i][chosenCell.j] = CHERRY
  renderCell(chosenCell, CHERRY)
}
