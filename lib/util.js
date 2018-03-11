export const chance = function percentageChance() {
  return Math.floor(Math.random() * 100) + 1
}


export const shuffleValues = function shuffleValues(obj) {
  let tmp, idx, shuffled = Object.values(obj)
  let i = shuffled.length
  
  while (i--) {
    idx = Math.floor((i + 1) * Math.random());
    tmp = shuffled[idx];
    shuffled[idx] = shuffled[i];
    shuffled[i] = tmp;
  }
  return shuffled
}

export const getCoordsAsNumbers = function getCoordsAsNumbers(cords) {
  let x, y
  [x,y] = cords.split(',')
  return [Number(x), Number(y)]
}

export const randomSample = function randomSample(obj, n=null) {
  n = n || obj.length
  let values = shuffleValues(obj)
  return values.slice(0, n)
}


const randomElement = function randomElement(obj) {
  return randomSample(obj, 1)[0]
}

let dx, dy, offsets = []
for (dx=-1; dx<2; dx++) {
  for (dy=-1; dy<2; dy++) {
    if (dx * dy) { offsets.push([dx,dy]) }
  }
}

export const randomDirection = function randomDirection() {
  return randomElement(offsets)
}


export const valPlusMinus = function valPlusMinus(value, range) {
  let i, fudgeFactors = []
  for (i=-range; i<range+1; i++) { fudgeFactors.push(i) }
  return value + randomElement(fudgeFactors)
}
