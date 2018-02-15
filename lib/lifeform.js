import { chance } from "./util"


class LifeForm {

  constructor(opts) {
    this.location = opts.location
    this.world = opts.world
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
    this.spawn()
    this.grow()
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
    // Somehow, the World needs to know that there is one less thing.
    // Two choices: update a property here. Or, have the World
    // recompute on each turn. ThinkMore.
    this.location.contents = null
    this.location = null
  }


  spawn() {
    if (this.canSpawn()) {
      this._spawn()
    }
  }


  canSpawn() {
    let type = this.constructor
    return (this.size >= type.minSpawnSize &&
            this.turnsSinceSpawnOrGrowth >= type.waitAfterSpawnOrGrowth)
  }


  _getNumChildren() {

    let candidates = [], choice
    let options = this.constructor.spawnOutcomes
    for (let i=0; i<this.size; i++) {
      choice = options[Math.floor(Math.random() * options.length)]
      candidates.push(options[choice])
    }
    return Math.max(...candidates)
  }


  grow() {
    if (this.canGrow()) {
      this._grow()
    }
  }


  canGrow() {
    // Ultimately, there should be more to this (checking for adequate
    // resources and the like). Right now, MVP.
    return (this.size < this.constructor.maxSize &&
            this.turnsSinceSpawnOrGrowth >= this.constructor.waitAfterSpawnOrGrowth)
  }


  _grow() {
    if (chance() <= this.constructor.growthChance) {
      // Utilimately, there should be more to this (depletion of
      // resources and the like). Right now, MVP.
      this.size++
      this.turnsSinceSpawnOrGrowth = 0
    }
  }
}


export default LifeForm
