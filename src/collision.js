import distance from './utils'

class Collider {
  constructor(hitbox, parent) {
    this.hitbox = hitbox
    this.parent = parent
  }
}

class RectCollider extends Collider {
  constructor(parent) {
    let myHitbox = {
      w: parent.sz.x,
      h: parent.sz.y
    }

    super(myHitbox, parent)
  }

  draw(ctx) {
    ctx.beginPath()
    //console.log(this.parent.pos.x + " - " + this.parent.pos.y + " - " + (this.parent.pos.x + this.hitbox.w) + " - " + (this.parent.pos.y + this.hitbox.h))
    ctx.rect(this.parent.pos.x, this.parent.pos.y, this.hitbox.w, this.hitbox.h)
    ctx.fillStyle = '#f001'
    ctx.lineWidth = 1
    ctx.strokeStyle = 'red'
    ctx.fill()
    ctx.stroke()
  }
}

class CircleCollider extends Collider {
  constructor(parent) {
    let myHitbox = {
      r: parent.radius * 0.8
    }

    super(myHitbox, parent)

    window.col = this
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.parent.pos.x, this.parent.pos.y, this.hitbox.r, 0, Math.PI * 2, false)
    // ctx.ellipse(this.parent.pos.x, this.parent.pos.y, this.hitbox.r, this.)
    //ctx.fillStyle = this.color
    ctx.lineWidth = 1
    ctx.strokeStyle = 'green'
    ctx.fillStyle = '#0f01'
    ctx.fill()
    ctx.stroke()
  }
}

function areRectsColliding(rect1, rect2) {
  let A = {
    x1: rect1.parent.pos.x,
    y1: rect1.parent.pos.y,
    x2: rect1.parent.pos.x + rect1.hitbox.w,
    y2: rect1.parent.pos.y + rect1.hitbox.h
  }

  let B = {
    x1: rect2.parent.pos.x,
    y1: rect2.parent.pos.y,
    x2: rect2.parent.pos.x + rect2.hitbox.w,
    y2: rect2.parent.pos.y + rect2.hitbox.h
  }

  return (
    A.x1 < B.x2 &&
    A.x2 > B.x1 &&
    A.y1 < B.y2 &&
    A.y2 > B.y1
  )
}

function areCirclesColliding(circle1, circle2) {
  let hbx1 = circle1.hitbox
  let hbx2 = circle2.hitbox

  let distanceBetweenCircles = distance(
    circle1.parent.pos.x,
    circle1.parent.pos.y,
    circle2.parent.pos.x,
    circle2.parent.pos.y)

  return distanceBetweenCircles < hbx1.radius + hbx2.radius
}

function areRectCircleColliding(rect, circle) {

  let circleParentPos = circle.parent.pos
  let rectParentPos = rect.parent.pos

  let cDistanceX = Math.abs(circleParentPos.x - (rectParentPos.x + rect.hitbox.w / 2))
  let cDistanceY = Math.abs(circleParentPos.y - (rectParentPos.y + rect.hitbox.h / 2))

  if (cDistanceX > (rect.hitbox.w / 2 + circle.hitbox.r) ||
    cDistanceY > (rect.hitbox.h / 2 + circle.hitbox.r)) return false

  if (cDistanceX <= (rect.hitbox.w / 2) ||
    cDistanceY <= (rect.hitbox.h / 2)) return true


  let cornerDistance_sq = (
    Math.pow(cDistanceX - (rect.hitbox.w / 2), 2) +
    Math.pow(cDistanceY - (rect.hitbox.h / 2), 2)
  )

  return cornerDistance_sq <= Math.pow(circle.hitbox.r, 2)
}

class CollitionListener {
  constructor(col1, col2, callback) {

    let body1 = col1 instanceof Collider ? col1 : col1.body
    this.body1 = {
      body: body1,
      type: body1.constructor
    }

    let body2 = col2 instanceof Collider ? col2 : col2.body
    this.body2 = {
      body: body2,
      type: body2.constructor
    }

    this.callback = callback

    this.setCheckingFunction()
  }

  setCheckingFunction() {

    if (this.body1.type === this.body2.type) {
      this.checkFunction =
        this.body1.type === CircleCollider ?
        areCirclesColliding :
        areRectsColliding
    } else {
      this.checkFunction = areRectCircleColliding
      if (this.body1.type === CircleCollider) {
        let temp = this.body1
        this.body1 = this.body2
        this.body2 = temp
      }
    }
  }

  areColliding() {
    return this.checkFunction(this.body1.body, this.body2.body)
  }

  containsObject(go1, go2 = undefined) {
    let body1 = go1 instanceof Collider ? go1 : go1.body

    let contains1 = body1 === this.body1 || body1 === this.body2

    contains2 = true
    if (go2) {
      let body2 = go2 instanceof Collider ? go2 : go2.body

      contains2 = body2 === this.body1 || body2 === this.body2
    }

    return contains1 && contains2
  }

}

class BodyWorld {

  constructor() {
    this.colliders = []
  }

  addCollitionListener(gameObject1, gameObject2, callback) {
    let newColListener = new CollitionListener(gameObject1, gameObject2, callback)
    this.colliders.push(newColListener)
  }

  removeCollitionListener(gameObject1, gameObject2 = undefined) {

    this.colliders = this.colliders.filter(col =>
      !col.containsObject(gameObject1, gameObject2)
    )

  }

  findColliders(gameObject1, gameObject2 = undefined) {
    let cols = this.colliders.filter(col => col.containsObject(gameObject1, gameObject2))

    return cols
  }

  update() {
    this.colliders.forEach(colLis => {
      let thisCollided = colLis.areColliding()
      if (thisCollided) {
        colLis.callback()
      }
    })
  }

}

export {
  CircleCollider,
  RectCollider,
  BodyWorld
}