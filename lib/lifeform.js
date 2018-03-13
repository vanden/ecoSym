import { chance, valPlusMinus } from "./util"


class LifeForm {

  constructor(opts, Config) {
    this.config = Config
    this.location = opts.location
    this.world = opts.world
    this.age = 0
    this.alive = true
    this.turnsSinceSpawnOrGrowth = 0
    this.size = 1
    this.lifeSpan = valPlusMinus(this.constructor.maxLifeSpan, 5)
    this.dirty = true   // Don't think needed. Figure Out. FixMe
    this.dirty_cells = []
  }


  getCSSClass() {
    return `cell ${this.constructor.typestring}-${this.size}`
  }


  tick(turn) {
    if (turn == this.last_move) {
      // Occurs when something was spawned or moved into a cell that
      // hasn't yet had its move
      return [this.location]
    }
    this.last_move = turn
    this.dirty_cells = []
    this.dirty = false

    this.turnsSinceSpawnOrGrowth++
    this.age++
    this.checkDeath()
    this.move()    // move, then starvation check; maybe moved into resources
    this.checkStarvation()
    if (!this.alive) { return this.dirty_cells }
    this.spawn()
    this.grow()
    if (this.dirty && !this.dirty_cells.includes(this.location)) {
      this.dirty_cells.push(this.location)
    }
    return this.dirty_cells
  }


  checkDeath() {
    if (this.age > this.lifeSpan) {
      this.alive = false
    } else if (chance() <
               this.spontaneousDeathChance ) {
      this.alive = false
    }

    if (!this.alive) { this.die() }
  }


  die() {
    this.location.contents = null
    this.dirty_cells.push(this.location)
    this.location = null
    this.alive = false

    // Not really needed as the !this.alive check returns
    // this.dirty_cells bypassing the this.dirty. But, safety vs reorg
    this.dirty = true
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

    let i, choice, candidates = []
    let options = this.constructor.spawnOutcomes
    for (i=0; i<this.size; i++) {
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
    if (chance() <= this.growthChance) {
      // Utilimately, there should be more to this (depletion of
      // resources and the like). Right now, MVP.
      this.size++
      this.turnsSinceSpawnOrGrowth = 0
      this.dirty = true
    }
  }

  // Stub that do nothing but that exist so that some, but not
  // necessarily all,subclasses can override.
  checkStarvation() {}
  move(){}
}

export default LifeForm
