const LifeForm = require("./lifeform")
const HerbivoreSettings = require("./herbivore_settings")
const Util = require("./util")

class Herbivore extends LifeForm {

  constructor(opts) {
    super(opts)
    this.size = 1 
  }

  move() {
    console.log("I'm moving")
  }

  // canSpawn() {
  //   return (this.size >= Herbivore.minSpawnSize &&
  //           this.turnsSinceSpawnOrGrowth >= Herbivore.waitAfterSpawnOrGrowth)
  //   }
  //
  // Pretty sure the superclass canSpawn with this.constructor will
  // work, but leaving here until I've enough in place to confirm

  _spawn() {
    if (Util.chance() <= Herbivore.spawnChance) {

      let choice = Math.floor(Math.random() * Herbivore.spawnOutcomes.length)
      let numChildren = Herbivore.spawnOutcomes[choice]
      // Haven't figured out how to place the progeny, yet. In
      // particular, don't know if I want the location as part of the
      // constructor. ThinkMore.

      let children = []
      for (i=0; i<numChildren; i++) {
        // The intent
        // children.push(new Herbivore())
      }
      this.turnsSinceSpawnOrGrowth = 0
    }
  }

  canGrow() {
    return (this.size < Herbivore.maxSize &&
            this.turnsSinceSpawnOrGrowth >= Herbivore.waitAfterSpawnOrGrowth)
  }
}

Herbivore.typestring = "herbivore"

// These are documented a bit in HerbivoreSettings
Herbivore.spawnOutcomes = HerbivoreSettings.spawnOutcomes
Herbivore.maxSize = HerbivoreSettings.maxSize
Herbivore.growthChance = HerbivoreSettings.growthChance
Herbivore.spawnChance = HerbivoreSettings.spawnChance
Herbivore.maxLifeSpan = HerbivoreSettings.maxLifeSpan
Herbivore.spontaneousDeathChance = HerbivoreSettings.spontaneousDeathChance
Herbivore.minSpawnSize = HerbivoreSettings.minSpawnSize
Herbivore.waitAfterSpawnOrGrowth = HerbivoreSettings.waitAfterSpawnOrGrowth
  
module.exports = Herbivore
