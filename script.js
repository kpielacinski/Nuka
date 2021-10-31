const screens = document.querySelectorAll('.screen')
const game_container = document.getElementById('game-container')
const start_btn = document.getElementById('start-btn')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
const play_again_btn = document.getElementById('play-again-btn')
const score_end = document.getElementById('score-end')
const time_end = document.getElementById('time-end')
let seconds = 0
let score = 0

console.log(screens)

start_btn.addEventListener('click', () => {
    screens[0].classList.add('up')
    setTimeout(createNuka, 100)
    startGame()
})

play_again_btn.addEventListener('click', () => {
    
    screens[0].classList.add('up')
    playAgain()
})

function createNuka() {
    const nuka = document.createElement('div')
    nuka.classList.add('nuka')
    const {x, y} = getRandomLocation()
    nuka.style.top = `${y}px`
    nuka.style.left = `${x}px`
    nuka.innerHTML = `<img src="nuka.png" alt="Nuka" style="transform: rotate(${Math.random() * 360}deg)"/>`

    nuka.addEventListener('click', catchNuka)
    game_container.appendChild(nuka)
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width -200) + 100
    const y = Math.random() * (height -200) + 100
    return {x, y}
}

function catchNuka() {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    createNuka()
    spawnInsects()
}

function catchInsect() {
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    gameEnd()
}

function startGame() {
    seconds = 0
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Czas: ${m}:${s}`
    seconds++
}

function spawnInsects() {
    const insect = document.createElement('div')
    insect.classList.add('insect')
    const { x, y } = getRandomLocation()
    insect.style.top = `${y}px`
    insect.style.left = `${x}px`
    insect.innerHTML = `<img src="http://pngimg.com/uploads/fly/fly_PNG3946.png" alt="Mucha" style="transform: rotate(${Math.random() * 360}deg)" />`

    insect.addEventListener('click', catchInsect)

    game_container.appendChild(insect)
}

function increaseScore() {
    score++

    if(score > 19)
    {
        message.classList.add('visible')
    }
    scoreEl.innerHTML = `Wynik: ${score}`
}

function gameEnd(){
    setTimeout(screens[1].classList.add('up'), 5000)
    score_end.innerHTML = scoreEl.innerHTML
    time_end.innerHTML = timeEl.innerHTML
    score = 0
}

function playAgain(){
    window.location.reload()
}
