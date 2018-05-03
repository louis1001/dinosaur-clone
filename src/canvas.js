// Imports
import GameManager from './gameManager'

let gameVersion = '0.0.0.2'

console.log("Starting dino-clone version: " + gameVersion)

// Initial Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

let maxWidth = 900
let cWidth = innerWidth * 0.95 < maxWidth ? innerWidth * 0.95 : maxWidth

canvas.width = cWidth
canvas.height = (cWidth / 2)

// Variables
const mouse = {
    x: undefined,
    y: undefined
}

let looping = false

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

let keysDown = []

// Event Listeners
addEventListener('mousemove', e => {
    let canvasPos = canvas.getBoundingClientRect()
    mouse.x = e.clientX - canvasPos.x
    mouse.y = e.clientY - canvasPos.y
})

addEventListener('resize', () => {
    // canvas.width = innerWidth
    // canvas.height = innerWidth * 0.5

    // init()
})

addEventListener('mousedown', e => {
    e.preventDefault()
    gm.keyPressed({
        key: ' '
    })
})

addEventListener('mouseup', e => {
    e.preventDefault()
    gm.keyReleased({
        key: ' '
    })
})

addEventListener('keydown', e => {
    gm.keyPressed(e)
})

addEventListener('keyup', e => {
    gm.keyReleased(e)
})

function loop() {
    looping = true
    animate()
}

function noLoop() {
    looping = false
}

// Objects
let gm

// Implementation
function init() {
    looping = true

    let wBounds = {
        x: canvas.width,
        y: canvas.height
    }

    gm = new GameManager(wBounds)

}

// Animation Loop
function animate(_ = false, ignoreLoop = false) {
    if (!(ignoreLoop || looping)) return
    requestAnimationFrame(animate)

    if (!gm.keysDown.includes(" "))
        c.clearRect(0, 0, canvas.width, canvas.height)

    gm.update()
    gm.draw(c)
}

init()
animate(undefined, true)