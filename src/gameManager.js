import Player from './player'
import Obstacle from './obstacle'
import {
  randomIntFromRange,
  map,
  max
} from './utils'

export default class GameManager {

  constructor(worldBounds) {
    this.worldBounds = worldBounds

    let gravity = {
      x: 0,
      y: 2
    }

    let highestScore = 0

    let floorHeight = 80

    this.floorPoints = []

    let obstacleOffset = 60

    let gameSpeed = 10

    let acceleration = 0.001
    this.config = {
      gravity,
      highestScore,
      floorHeight,
      obstacleOffset,
      gameSpeed,
      acceleration
    }

    window.gameConfig = this.config

    this.keysDown = []
    this.init()
  }

  init() {

    let playerRad = 15
    let playerBounds = {
      x: 100 - playerRad,
      y: -Infinity,
      w: 100 + playerRad,
      h: this.worldBounds.y - this.config.floorHeight
    }

    let playerVel = {
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

    let availableTypes = Obstacle.getTypes()
    let randomIndex = randomIntFromRange(0, availableTypes.length - 1)

    let obstacleBounds = {
      x: this.worldBounds.x,
      y: this.worldBounds.y - this.config.floorHeight
    }

    let obsSpeed = () => this.config.gameSpeed

    let newObstacle = new Obstacle(availableTypes[randomIndex], obstacleBounds, obsSpeed)

    this.obstacles.push(newObstacle)
    this.gameObjects.push(newObstacle)
    this.obstacleDelay = randomIntFromRange(this.config.obstacleOffset - 20, this.config.obstacleOffset + 30)
  }

  drawFloor(ctx) {
    this.floorPoints.forEach((pnt, i) => {
      ctx.beginPath()
      ctx.arc(pnt.x, pnt.y, 2, 0, Math.PI * 2)
      ctx.lineWidth = 1
      ctx.fillStyle = 'gray'
      ctx.strokeStyle = 'gray'
      ctx.stroke()
      ctx.fill()
      pnt.x -= this.config.gameSpeed

    })

    this.floorPoints = this.floorPoints.filter(pt => pt.x > -1)

    if (Math.random() > 0.8) {
      let ptX = map(Math.random(), 0, 1, 0, 40)
      let ptY = map(Math.random(), 0, 1, 0, this.config.floorHeight)

      this.floorPoints.push({
        x: this.worldBounds.x + ptX,
        y: this.worldBounds.y - ptY
      })
    }

    ctx.beginPath()

    ctx.moveTo(0, this.worldBounds.y - this.config.floorHeight - 5)

    ctx.lineTo(this.worldBounds.x, this.worldBounds.y - this.config.floorHeight - 5)
    ctx.stroke()

  }

  draw(ctx) {
    // console.log(ctx)

    this.drawFloor(ctx)

    this.gameObjects.forEach(obj => {
      obj.draw(ctx)
    })

    ctx.fillStyle = 'gray'
    ctx.font = '20px sans-serif'

    let HighScoreText = "" + Math.round(sessionStorage.hScore)
    scoreText = HighScoreText.padStart(9, "0")
    ctx.fillText("HI", this.worldBounds.x - 145, 30)
    ctx.fillText(scoreText, this.worldBounds.x - 120, 30)

    let scoreText = "" + Math.round(this.player.score)
    scoreText = scoreText.padStart(9, "0")
    ctx.fillText(scoreText, this.worldBounds.x - 120, 70)

  }

  handleKeys() {
    if (this.keysDown.includes(" ") || this.keysDown.includes("ArrowUp")) {
      this.player.jump()
    } else {
      this.player.falling = true
    }
  }

  update() {
    if (this.gameOver) return
    this.handleKeys()

    this.gameObjects.forEach(obj => {
      if (!obj.static) {
        obj.applyForce(this.config.gravity)
      }
      obj.update()
    })

    this.obstacles = this.obstacles.filter(obj => obj.pos.x < -obj.sz.x)
    this.gameObjects = this.gameObjects.filter(obj => {
      if (obj instanceof Obstacle) {
        if (obj.pos.x < -obj.sz.x) return false
      }
      return true
    })

    if (this.obstacleDelay <= 0) {
      this.createObstacle()
    }

    this.obstacleDelay -= this.config.gameSpeed / 10

    this.config.gameSpeed += this.config.acceleration
    this.player.score += this.config.gameSpeed * 0.02

    this.updateScore()
  }

  updateScore() {
    if (this.player.score > sessionStorage.hScore) {
      sessionStorage.hScore = this.player.score
      this.highestScore = this.player.score
    }
  }

  keyPressed(e) {
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