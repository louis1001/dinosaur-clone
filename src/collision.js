class Collider {
  constructor(hitbox, parent) {
    this.hitbox = hitbox
    this.parent = parent
  }

}

Collider.types = [
  "Rect",
  "Circle"
]

class RectCollider extends Collider {
  constructor(parent) {
    let myHitbox = {
      x: parent.pos.x,
      y: parent.pos.y,
      w: parent.sz.x,
      h: parent.sz.y
    }

    super(hitbox, parent)
  }
}