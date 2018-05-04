import {
  RectCollider
} from './collision'

class Obstacle {

  constructor(type, boundaries, speed = () => 0.0) {
    let typeInfo = Obstacle.types[type]
    this.bounds = boundaries

    this.type = type

    this.getCurrentSpeed = speed

    this.pos = {}
    this.pos.x = this.bounds.x + typeInfo.pos.x
    this.pos.y = this.bounds.y - typeInfo.pos.y

    this.sz = {
      x: typeInfo.width,
      y: typeInfo.height
    }

    this.body = new RectCollider(this)

    this.static = true
  }

  update() {
    let currentSpeed = this.getCurrentSpeed()

    this.pos.x -= currentSpeed
  }

  draw(ctx) {
    // console.log("drawing")
    ctx.beginPath()
    ctx.rect(this.pos.x, this.pos.y, this.sz.x, this.sz.y)
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'gray'
    ctx.lineWidth = 2
    ctx.fill()
    ctx.stroke()

    if (this.type.startsWith("ground")) {
      ctx.beginPath()
      ctx.strokeStyle = 'white'
      ctx.lineWidth = 2
      ctx.moveTo(this.pos.x - 1, this.pos.y + this.sz.y)
      ctx.lineTo(this.pos.x + this.sz.x + 1, this.pos.y + this.sz.y)
      ctx.stroke()
    }

    this.body.draw(ctx)
  }

  static getTypes() {
    let obstacleTypes = Object.keys(Obstacle.types)

    return obstacleTypes
  }
}

Obstacle.types = {
  groundShortNarrow: {
    width: 50,
    height: 50,
    pos: {
      x: 0,
      y: 40
    }
  },
  groundShortWide: {
    width: 100,
    height: 50,
    pos: {
      x: 0,
      y: 40
    }
  },
  groundShortExtraWide: {
    width: 120,
    height: 50,
    pos: {
      x: 0,
      y: 40
    }
  },
  groundTallNarrow: {
    width: 50,
    height: 100,
    pos: {
      x: 0,
      y: 90
    }
  },
  groundTallWide: {
    width: 80,
    height: 100,
    pos: {
      x: 0,
      y: 90
    }
  },
  flyerMiddleShort: {
    width: 50,
    height: 30,
    pos: {
      x: 0,
      y: 70
    }
  },
  flyerMiddleTall: {
    width: 50,
    height: 90,
    pos: {
      x: 0,
      y: 130
    }
  }
}

export default Obstacle