import Player from './player'
import Obstacle from './obstacle'
import {
  BodyWorld
} from './collision'

import {
  randomIntFromRange,
  map,
  max
} from './utils'

export default class GameManager {

  constructor(worldBounds) {
    this.worldBounds = worldBounds

    this.initKeyHandlers()
    let gravity = {
      x: 0,
      y: 2
    }
    const acceleration = 0.001

    const obstacleOffset = 60

    const floorHeight = 80

    const debugging = false

    this.config = {
      gravity,
      floorHeight,
      obstacleOffset,
      acceleration,
      debugging
    }

    window.gameConfig = this.config

    this.init()
  }

  initKeyHandlers() {
    this.keysDown = []

    this.keyHandlers = [{
      key: "p",
      callback: e => {
        this.config.paused = !this.config.paused
      }
    }]
  }

  collided() {
    this.init()
  }

  init() {

    this.floorPoints = []

    this.config.gameSpeed = 10

    this.config.paused = false

    this.collisionWorld = new BodyWorld()

    const playerRad = 15
    const playerBounds = {
      x: 100 - playerRad,
      y: -Infinity,
      w: 100 + playerRad,
      h: this.worldBounds.y - this.config.floorHeight
    }

    const playerVel = {
      x: 0,
      y: 0
    }

    this.player = new Player(100, 100, playerVel, playerRad, 'white', playerBounds)

    this.gameObjects = [this.player]
    this.obstacles = []
    this.obstacleDelay = this.config.obstacleOffset

    this.gameOver = false

    this.createObstacle()

    sessionStorage.hScore = sessionStorage.hScore || 0
  }

  createObstacle() {

    const availableTypes = Obstacle.getTypes()
    const randomIndex = randomIntFromRange(0, availableTypes.length - 1)

    const obstacleBounds = {
      x: this.worldBounds.x,
      y: this.worldBounds.y - this.config.floorHeight
    }

    const obsSpeed = () => this.config.gameSpeed

    const newObstacle = new Obstacle(availableTypes[randomIndex], obstacleBounds, obsSpeed)

    this.obstacles.push(newObstacle)
    this.gameObjects.push(newObstacle)
    this.obstacleDelay = randomIntFromRange(this.config.obstacleOffset - 20, this.config.obstacleOffset + 30)

    this.collisionWorld.addCollitionListener(this.player, newObstacle, this.collided.bind(this))
  }

  drawFloor(ctx) {
    this.floorPoints.forEach((pnt, i) => {
      ctx.beginPath()
      ctx.rect(pnt.x, pnt.y, 1, 1)
      ctx.lineWidth = 2
      ctx.fillStyle = 'gray'
      ctx.strokeStyle = 'gray'
      ctx.stroke()
      ctx.fill()
    })

    ctx.beginPath()
    ctx.strokeStyle = 'gray'
    ctx.lineWidth = 1

    ctx.moveTo(0, this.worldBounds.y - this.config.floorHeight - 5)

    ctx.lineTo(this.worldBounds.x, this.worldBounds.y - this.config.floorHeight - 5)
    ctx.stroke()
    ctx.closePath()

  }

  updateFloor() {
    this.floorPoints.forEach(pnt => {
      pnt.x -= this.config.gameSpeed
    })

    this.floorPoints = this.floorPoints.filter(pt => pt.x > -1)

    const numPoints = this.floorPoints.length
    if (numPoints == 0 || this.floorPoints[numPoints - 1].x <= this.worldBounds.x) {
      const ptX = map(Math.random(), 0, 1, 0, 40)
      const ptY = map(Math.random(), 0, 1, 0, this.config.floorHeight)

      this.floorPoints.push({
        x: this.worldBounds.x + ptX,
        y: this.worldBounds.y - ptY
      })
    }
  }

  draw(ctx) {
    // console.log(ctx)

    this.drawFloor(ctx)

    this.gameObjects.forEach(obj => {
      obj.draw(ctx)
    })

    ctx.fillStyle = 'gray'
    ctx.font = '20px sans-serif'

    const highestScore =
      String(Math.round(sessionStorage.hScore))
      .padStart(9, "0")

    ctx.fillText("HI", this.worldBounds.x - 145, 30)
    ctx.fillText(highestScore, this.worldBounds.x - 120, 30)

    const scoreText =
      String(Math.round(this.player.score))
      .padStart(9, "0")

    ctx.fillText(scoreText, this.worldBounds.x - 120, 70)

    if (this.config.paused) {
      ctx.fillStyle = 'darkgray'
      ctx.font = '50px sans-serif'

      const pauseText = "PAUSED"
      ctx.fillText(pauseText, this.worldBounds.x * 0.4, this.worldBounds.y / 2)
    }
  }

  handleKeys() {
    if (this.keysDown.includes(" ") || this.keysDown.includes("ArrowUp")) {
      this.player.jump()
    } else {
      this.player.falling = true
    }
  }

  update() {
    if (this.config.paused || this.gameOver) return
    this.handleKeys()

    this.updateFloor()

    this.gameObjects.forEach(obj => {
      if (!obj.static) {
        obj.applyForce(this.config.gravity)
      }
      obj.update()
    })

    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obs = this.obstacles[i]
      if (obs.pos.x < -obs.sz.x) {
        this.obstacles.splice(i, 1)
        const goIndex = this.gameObjects.indexOf(obs)
        this.gameObjects.splice(goIndex, 1)
      }
    }

    if (this.obstacleDelay <= 0) {
      this.createObstacle()
    }

    this.obstacleDelay -= this.config.gameSpeed / 20

    this.config.gameSpeed += this.config.acceleration

    this.collisionWorld.update()
    this.updateScore()
  }

  updateScore() {
    this.player.score += this.config.gameSpeed * 0.02
    if (this.player.score > sessionStorage.hScore) {
      sessionStorage.hScore = this.player.score
      this.highestScore = this.player.score
    }
  }

  keyPressed(e) {
    this.keyHandlers.forEach(kh => {
      if (kh.key == e.key) {
        kh.callback(e)
      }
    })
    if (!this.keysDown.includes(e.key)) {
      this.keysDown.push(e.key)
    }
  }

  keyReleased(e) {
    if (this.keysDown.includes(e.key)) {
      this.keysDown = this.keysDown.filter(x => x != e.key)
    }
  }

}