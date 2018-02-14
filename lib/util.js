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

