import LifeForm from "./lifeform"
import { HerbivoreSettings } from "./config"
import { chance, randomSample, randomDirection, valPlusMinus } from "./util"
import Plant from "./plant"


class Herbivore extends LifeForm {

  constructor(opts, Config) {
    super(opts, Config)
    this.config = Config
    this.lifeSpan = valPlusMinus(this.config.herb.maxLifeSpan, 5)
    this.starting_energy = HerbivoreSettings.startingEnergy
    this.energy = HerbivoreSettings.startingEnergy
    this.direction = randomDirection()
  }


  checkStarvation() {
    this.energy--
    if (this.energy < 1 && this.size > 1) {
      this.energy = this.startingEnergy
      this.size--
      this.dirty = true
    }
    if (this.size < 1 && this.energy < -10) { this.die() }
  }


  move() {
    let target = this._pickTarget()
    if (!target) { return }
    if (target.contents) {
      if (target.contents.constructor.typestring === Plant.typestring) {
        this.eat(target.contents)
      }
    }
    this.dirty_cells = this.dirty_cells.concat([this.location, target])
    this.location.contents = null
    this.location = target
    this.location.contents = this
  }


  eat(prey) {
    this.energy += prey.size
    prey.die()
  }


  _getNeighbours() {
    // This should really be in LifeForm and used in spawning. FixMe
    let dir, neighbours = []
    let neighbourhood = this.location.neighbourhood

    // Actually, why is this computing as opposed to just yeilding up
    // the neighbours? FixMe
    for (dir in neighbourhood) {
      neighbours.push(neighbourhood[dir])
    }
    return neighbours
  }


  _findPlantNeighbours(neighbours) {
    let idx, neighbour, candidates = []

    for (idx in neighbours) {
      neighbour = neighbours[idx].contents
      if (neighbour && neighbour.constructor.typestring === Plant.typestring) {
        // Plants of size 0 are mere spores and too small for Herbivores to see
        if (neighbour.size > 0) {
          candidates.push(neighbour.location)
        }
      }
    }
    return candidates
  }


  _findVacantNeighbours(neighbours) {
    // Method name is a lie. A cell with a Plant of size === 0 is
    // vacant, so far as the Herbivore can tell. FixMe? Naming

    // Also, obviously needs to be DRYed up wrt _findPlantNeighbours

    let idx, neighbour, candidates = []

    for (idx in neighbours) {
      neighbour = neighbours[idx].contents
      if (neighbour === null || neighbour.size === 0) {
        // Any neighbour of size 0 is too small for the Herbivore to see
        candidates.push(neighbours[idx])
      }
    }
    return candidates
  }


  _pickTarget() {

    let dx, dy, target, neighbours = this._getNeighbours()
    let candidates = this._findPlantNeighbours(neighbours)

    if (candidates.length) {
      // FixMe Should be smarter. Either greatest density direction or
      // largest adjacent Plant should be picked.
      target = randomSample(candidates, 1)[0]
    } else {
      candidates = this._findVacantNeighbours(neighbours)

      if (!candidates.length) { return null }

      // Build default target off of direction
      [dx, dy] = this.direction
      target = this.world.getCell(this.location.x + dx, this.location.y + dy)

      if (!(target && candidates.includes(target))) {
        target = randomSample(candidates, 1)[0]
      }
    }
    this.reset_direction(target)

    return target
  }


  reset_direction(target) {
    this.direction = [target.x - this.location.x, target.y - this.location.y ]
  }


  die () {
    super.die()
    this.world.herbivoreCount--
  }


  makeNew(loc, world) {
    // This should be DRY wrt the initial populate code FixMe
    world.herbivoreCount++
    return new Herbivore({location: loc, world: world}, this.config)
  }


  _spawn() {
    // DAGNABBIT JS OOP has defeated me for now. This will be
    // duplicated in Plant. FixMe
    if (chance() <= this.constructor.spawnChance) {

      let i, numChildren = this._getNumChildren()
      let locs = randomSample(this.location.neighbourhood, numChildren)

      for (i=0; i<locs.length; i++) {
        if (!locs[i].contents){
          this.dirty_cells.push(locs[i])
          locs[i].contents = this.makeNew(locs[i], this.world)
        }
      }
      this.size--
      this.dirty = true
      this.turnsSinceSpawnOrGrowth = 0
    }
  }
}


Herbivore.typestring = "herbivore"


// These are documented a bit in HerbivoreSettings
Herbivore.growthChance = HerbivoreSettings.growthChance
Herbivore.maxLifeSpan = HerbivoreSettings.maxLifeSpan
Herbivore.maxSize = HerbivoreSettings.maxSize
Herbivore.minSpawnSize = HerbivoreSettings.minSpawnSize
Herbivore.spawnChance = HerbivoreSettings.spawnChance
Herbivore.spawnOutcomes = HerbivoreSettings.spawnOutcomes
Herbivore.spontaneousDeathChance = HerbivoreSettings.spontaneousDeathChance
Herbivore.waitAfterSpawnOrGrowth = HerbivoreSettings.waitAfterSpawnOrGrowth


export default Herbivore
