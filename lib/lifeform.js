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
    if (!this.alive) {return}
    this.move()
    // move, then starvation check as maybe moved into resources
    this.checkStarvation()
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
    this.alive = false
    // I have a bug where sometimes a lifeform has a location of null.
    // At the point I am having that, this is the only place where a
    // lifeform location gets set to null. So, it seems likely that I
    // am not actually correctly handling the death logic. FixMe This
    // needs to be investigated. But, not right now. And, I *think*
    // I've resolved it. I wasn't bailing on the turn if the LifeForm
    // was dead. I'm leaving this comment in place b/c I want to wait
    // on declaring the problem solved until I've not seen it pop up
    // for a while. In code not yet committed
    // (Herbivore._getNeighbours which should be moved to LifeForm) I
    // have a debugger that will go off if it is encountered.
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

  // Stub that do nothing but that exist so that some, but not
  // necessarily all,subclasses can override.
  checkStarvation() {}
  move(){}
}
export default LifeForm
