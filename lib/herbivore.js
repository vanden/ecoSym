import LifeForm from "./lifeform"
import { HerbivoreSettings } from "./config"
import { chance, randomSample } from "./util"

// Needed chiefly so that a Herbivore instance can recognize a Plant
// instance when it sees one.
import Plant from "./plant"

class Herbivore extends LifeForm {

  constructor(opts) {
    super(opts)
    this.starting_energy = opts.startingEnergy
    this.energy = opts.startingEnergy
  }


  checkStarvation() {
    this.energy--
    if (this.energy < 1) {
      this.energy = this.startingEnergy
      this.size--
    }
    if (this.size < 1) { this.die() }
  }

  move() {
    let target = this._pickDirection()
    if (!target) { return }
    if (target.contents) {
      if (target.contents.constructor.typestring === Plant.typestring) {
        this.eat(target.contents)
      }
    }
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
    let neighbours = []
    let neighbourhood = this.location.neighbourhood

    for (let dir in neighbourhood) {
      neighbours.push(neighbourhood[dir])
    }
    return neighbours
  }


  _findPlantNeighbours(neighbours) {
    let candidates = []
    let neighbour

    for (let idx in neighbours) {
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

    let candidates = []
    let neighbour
    for (let idx in neighbours) {
      neighbour = neighbours[idx].contents
      if (neighbour === null || neighbour.size === 0) {
        // Any neighbour of size 0 is too small for the Herbivore to see
        candidates.push(neighbours[idx])
      }
    }
    return candidates
  }


  _pickDirection() {

    let neighbours = this._getNeighbours()
    let candidates = this._findPlantNeighbours(neighbours)
    if (!candidates.length) {
      candidates = this._findVacantNeighbours(neighbours)
    }
    if (!candidates.length) { return null }

    // Nothing smart, here. Future: pick based on plant size or plant
    // density (and, once Carnivores, by safest flight path)
    let a = randomSample(candidates, 1)[0]
    return randomSample(candidates, 1)[0]
  }


  die () {
    super.die()
    this.world.herbivoreCount--
  }


  makeNew(loc, world) {
    // This should be DRY wrt the initial populate code FixMe
    world.herbivoreCount++
    return new Herbivore({location: loc, world: world})
  }


  _spawn() {
    // DAGNABBIT JS OOP has defeated me for now. This will be
    // duplicated in Plant. FixMe
    if (chance() <= this.constructor.spawnChance) {

      let numChildren = this._getNumChildren()

      // Ruhoh. Every so often, this gives an error that cannot read
      // location of undefined. WTF FixMe
      let locs = randomSample(this.location.neighbourhood, numChildren)
      for (let i=0; i<locs.length; i++) {
        if (!locs[i].contents){
          locs[i].contents = this.makeNew(locs[i], this.world)
        }
      }
      this.size--
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
