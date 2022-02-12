const container = document.querySelector(".container")
const gameMode = document.getElementsByName('mode')
const startBtn = document.querySelector('.startBtn')
const time = document.querySelector('.info-time')
const displayScore = document.querySelector('.info-score')
const form = document.querySelector('.form')
let size = 5
let score = 0
let timeLeft = 30
let targetSquareId
let targetTime = 1000
let mode = easy
let hardModeOn = false
let timer
let timerColor
let countDownTimer

function makeGrid(size) {
  container.style.setProperty('--grid-rows', size)
  container.style.setProperty('--grid-cols', size)
  for (i = 0; i < (size * size); i++) {
    let cell = document.createElement("div")
    cell.setAttribute('id', i+1)
    container.appendChild(cell).className = "grid-cell"
  }
}
makeGrid(size)
const squares = document.querySelectorAll(".grid-cell")

startBtn.addEventListener('click', startBoard)
//checking if someone clicked on target
squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id === targetSquareId){
      score++
      displayScore.textContent = score
    }
  })
})

gameMode.forEach( radio => {
  radio.addEventListener('click', (e) => {
    mode = e.target.value
    console.log(mode)
  })
})


function startBoard(){
  if(mode === 'easy'){
    targetTime = 800
    hardModeOn = false
  } else if (mode === 'medium') {
    targetTime = 650
    hardModeOn = false
  } else if (mode === 'hard') {
    targetTime = 500
    hardModeOn = true
  }
  score = 0
  displayScore.textContent = score
  timeLeft = 30
  time.textContent = timeLeft
  resetInterval()
  squares.forEach(square => {
    square.style.backgroundColor = '#ffffff'
  })
  if(hardModeOn){
    setTimeout(() => {
      timerColor = setInterval(randomColor, targetTime)
    }, 200)
  }
  setTimeout(changeCell, 200)
}

function changeCell(){
  timer = setInterval(randomCell, targetTime)
  countDownTimer = setInterval(countDown, 1000)
}

function randomCell(){
  squares.forEach(square => {
    square.classList.remove('target')
  })
  randomTarget = getRandomTarget()
  randomTarget.classList.add('target')
  targetSquareId = randomTarget.id
}


function countDown(){
  timeLeft --
  time.textContent = timeLeft
  if (timeLeft === 0){
    resetInterval()
    squares.forEach(cell => {
      cell.classList.remove('target')
    })
  }
}

const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

function randomColor() {
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += hex[getRandomNumber(hex)];
  }
  let fakeTarget = getRandomTarget()
  fakeTarget.style.backgroundColor = hexColor;
}

function getRandomNumber(arr) {
  return Math.floor(Math.random() * arr.length);
}
function getRandomTarget(){
  return squares[Math.floor(Math.random()*squares.length)]
}
function resetInterval(){
  clearInterval(countDownTimer)
  clearInterval(timer)
  clearInterval(timerColor)
}
