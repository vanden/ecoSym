const Util = require("./util")


class LifeForm {

  constructor(opts) {

//    this.cell = opts.cell
    this.age = 0
    this.alive = true
    this.turnsSinceSpawnOrGrowth = 0
    this.size = 1
  }

  getCSSClass() {
    return `${this.constructor.typestring}-${this.size}`
  }

  takeTurn() {
    this.turnsSinceSpawnOrGrowth++
    this.didDie()
    this.move()
    this.spawn()
    this.grow()
  }

  spawn() {
    if (this.canSpawn) {
      this._spawn()
    }
  }

  canSpawn() {
    return (this.size >= this.constructor.minSpawnSize &&
            this.turnsSinceSpawnOrGrowth >= this.constructor.waitAfterSpawnOrGrowth)
  }

  grow() {
    if (this.canGrow) {
      this._grow()
    }
  }
}


module.exports = LifeForm
