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

    let debugging = false

    let paused = false
    this.config = {
      gravity,
      highestScore,
      floorHeight,
      obstacleOffset,
      gameSpeed,
      acceleration,
      paused,
      debugging
    }

    window.gameConfig = this.config

    this.collisionWorld = new BodyWorld()

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

    this.collisionWorld.addCollitionListener(this.player, newObstacle, this.collided.bind(this))
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

    let numPoints = this.floorPoints.length
    if (numPoints == 0 || this.floorPoints[numPoints - 1].x <= this.worldBounds.x) {
      let ptX = map(Math.random(), 0, 1, 0, 40)
      let ptY = map(Math.random(), 0, 1, 0, this.config.floorHeight)

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

    let HighScoreText = "" + Math.round(sessionStorage.hScore)
    scoreText = HighScoreText.padStart(9, "0")
    ctx.fillText("HI", this.worldBounds.x - 145, 30)
    ctx.fillText(scoreText, this.worldBounds.x - 120, 30)

    let scoreText = "" + Math.round(this.player.score)
    scoreText = scoreText.padStart(9, "0")
    ctx.fillText(scoreText, this.worldBounds.x - 120, 70)

    if (this.config.paused) {
      ctx.fillStyle = 'darkgray'
      ctx.font = '50px sans-serif'

      let pauseText = "PAUSED"
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

    //this.obstacles = this.obstacles.filter(obj => obj.pos.x < -obj.sz.x)
    // this.gameObjects = this.gameObjects.filter(obj => {
    //   if (obj instanceof Obstacle) {
    //     if (obj.pos.x < -obj.sz.x) return false
    //   }
    //   return true
    // })

    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      let obs = this.obstacles[i]
      if (obs.pos.x < -obs.sz.x) {
        this.obstacles.splice(i, 1)
        let goIndex = this.gameObjects.indexOf(obs)
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