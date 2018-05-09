import {
  constrain,
  distance,
  map
} from './utils'

import {
  CircleCollider
} from './collision'

export default class Ball {

  constructor(x, y, vel, radius, color, boundaries = {
    x: 0,
    y: 0,
    w: 1,
    h: 1
  }) {
    this.pos = {
      x,
      y
    }
    this.vel = vel

    this.jumpForce = {
      x: 0,
      y: -30
    }

    this.maxJumpHeight = 60

    this.falling = false

    this.bounds = boundaries


    this.score = 0

    this.acc = {
      x: 0,
      y: 0
    }

    this.static = false

    this.radius = radius
    this.color = color

    this.maxSpeed = 15
    this.currentSpeed = distance(0, 0, this.vel.x, this.vel.y)

    this.bounce = 0.00
    this.body = new CircleCollider(this)
  }

  applyForce(f) {
    this.acc.x += f.x
    this.acc.y += f.y
  }

  jump() {
    if (!this.falling)
      this.applyForce(this.jumpForce)
  }

  update() {
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y

    this.vel.x += this.acc.x
    this.vel.y += this.acc.y

    if (this.pos.x + this.radius > this.bounds.w && this.vel.x > 0)
      this.vel.x = -this.vel.x * this.bounce
    if (this.pos.x - this.radius < this.bounds.x && this.vel.x < 0)
      this.vel.x = -this.vel.x * this.bounce
    if (this.pos.y + this.radius > this.bounds.h && this.vel.y > 0) {
      this.vel.y = -this.vel.y * this.bounce
      this.falling = false
    }

    if (this.pos.y < this.bounds.h - this.maxJumpHeight) this.falling = true

    this.pos.x = constrain(this.pos.x, this.bounds.x + this.radius, this.bounds.w - this.radius)
    this.pos.y = constrain(this.pos.y, this.bounds.y + this.radius, this.bounds.h - this.radius)

    const currentSpeed = distance(0, 0, this.vel.x, this.vel.y)
    if (currentSpeed > this.maxSpeed) {
      let ratioSpeed = this.maxSpeed / currentSpeed

      this.vel.x *= ratioSpeed
      this.vel.y *= ratioSpeed
    }

    this.currentSpeed = distance(0, 0, this.vel.x, this.vel.y)

    this.acc = {
      x: 0,
      y: 0
    }
  }

  draw(ctx) {

    const distFromBottom = this.bounds.h - this.radius - this.pos.y
    const threshold = 60
    if (distFromBottom < threshold) {
      const elSize = map(distFromBottom, 0, threshold, this.radius * 1.5, this.radius * 2.4)
      // console.log(elSize)

      ctx.beginPath()
      ctx.ellipse(this.pos.x, this.bounds.h + 3, elSize, elSize * 0.2, 0, 0, 2 * Math.PI)
      const col = map(distFromBottom, 0, threshold, 90, 255)
      ctx.fillStyle = "rgba(" + col + ", " + col + ", " + col + ")"

      ctx.fill()
      // console.log(elSize)
    }

    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.arc(this.pos.x, this.pos.y, this.radius + 2, 0, Math.PI * 2, false)
    ctx.strokeStyle = 'white'
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.lineWidth = 1
    ctx.strokeStyle = 'black'
    ctx.fill()
    ctx.stroke()

    ctx.closePath()

    ctx.beginPath()
    const arcStart = this.score % (Math.PI * 2)

    ctx.arc(this.pos.x, this.pos.y, this.radius * 0.75, arcStart, arcStart + Math.PI / 2, false)
    ctx.lineWidth = 3
    ctx.strokeStyle = 'gray'
    ctx.stroke()

    ctx.beginPath()

    if (window.gameConfig.debugging)
      this.body.draw(ctx)
  }

}