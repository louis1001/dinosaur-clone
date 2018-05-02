// Utility Functions
function constrain(val, lowB, uppB) {
  if (val < lowB) return lowB
  if (val > uppB) return uppB

  return val
}

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

function map(val, og_a, og_b, tg_a, tg_b, as_int = false) {
  let og_range = og_b - og_a
  let constraint_val = val - og_a
  let percentage = constraint_val / og_range

  let tg_range = tg_b - tg_a
  let constraint_tg_val = percentage * tg_range

  let mapped = constraint_tg_val + tg_a

  if (as_int) {
    mapped = Math.floor(mapped)
  }

  return mapped
}

function max(a, b) {
  let result = 0
  if (Number(a) > Number(b) && Number(a) != undefined) result = Number(a)
  if (b != undefined) result = Number(b)

  return result
}

function min(a, b) {
  if (a < b) return a
  return b
}

export {
  constrain,
  randomIntFromRange,
  randomColor,
  distance,
  map,
  max,
  min
}