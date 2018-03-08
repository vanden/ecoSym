export const chance = function percentageChance() {
  return Math.floor(Math.random() * 100)
}


export const shuffleValues = function shuffleValues(obj) {
  let shuffled = Object.values(obj)
  let i = shuffled.length
  let tmp, idx
  
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
