import { chance } from "./util"


class LifeForm {

  constructor(opts) {

//    this.cell = opts.cell
    this.age = 0
    this.alive = true
    this.turnsSinceSpawnOrGrowth = 0
    this.size = 1
  }


  getCSSClass() {
    return `cell ${this.constructor.typestring}-${this.size}`
  }


  tick() {
    this.turnsSinceSpawnOrGrowth++
    this.age++
    this.checkDeath()
    // this.move()
    // this.spawn()
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


  canGrow() {
    return (this.size < this.constructor.maxSize &&
            this.turnsSinceSpawnOrGrowth >= this.constructor.waitAfterSpawnOrGrowth)
  }


  _grow() {
    if (chance() <= this.constructor.growthChance) {
    }
  }


  checkDeath() {
    if (this.age > this.constructor.maxLifeSpan) {
      this.alive = false
    } else if (chance() <=
               this.constructor.spontaneousDeathChance ) {
      this.alive = false
    }

    if (!this.alive) { this.die() }
  }


  die() {
    // cleanup logic for a dead lifeform, here.
  }
}


export default LifeForm
