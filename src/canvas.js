// Imports
import GameManager from './gameManager'

let gameVersion = '0.0.1.3'

console.log("Starting dino-clone version: " + gameVersion)

// Initial Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const maxWidth = 900
const cWidth = innerWidth * 0.95 < maxWidth ? innerWidth * 0.95 : maxWidth

canvas.width = cWidth
canvas.height = (cWidth / 2)

// Variables
const mouse = {
    x: undefined,
    y: undefined
}

let looping = false

let pastTime = undefined
let _lastFrameRate = 0
const frameRate = function () {
    return _lastFrameRate
}
window.frameRate = frameRate
window.frameCount = 0

// Event Listeners
addEventListener('mousemove', e => {
    const canvasPos = canvas.getBoundingClientRect()
    mouse.x = e.clientX - canvasPos.x
    mouse.y = e.clientY - canvasPos.y
})

// TODO: make the canvas responsive and not restart every time it's rescaled.

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

addEventListener('touchstart', e => {
    e.preventDefault()
    gm.keyPressed({
        key: ' '
    })
})
addEventListener('touchmove', e => {
    e.preventDefault()
})
addEventListener('touchend', e => {
    e.preventDefault()
    gm.keyReleased({
        key: ' '
    })
})

addEventListener('keydown', e => {
    if (e.key == 'r') {
        init()
        return
    }
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

    const wBounds = {
        x: canvas.width,
        y: canvas.height
    }

    gm = new GameManager(wBounds)

}

// Animation Loop
function animate(_ = false, ignoreLoop = false) {
    if (!(ignoreLoop || looping)) return
    requestAnimationFrame(animate)
    const currentTime = performance.now()
    window.frameCount += 1


    _lastFrameRate = 1000 / (currentTime - pastTime)
    pastTime = currentTime

    c.clearRect(0, 0, canvas.width, canvas.height)

    gm.draw(c)
    gm.update()
}

init()
pastTime = performance.now()
animate(undefined, true)