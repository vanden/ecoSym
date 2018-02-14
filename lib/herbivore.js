import LifeForm from "./lifeform"
import { HerbivoreSettings } from "./config"
import { chance } from "./util"

class Herbivore extends LifeForm {

  constructor(opts) {
    super(opts)
  }


  move() {

  }


  // canSpawn() {
  //   return (this.size >= Herbivore.minSpawnSize &&
  //           this.turnsSinceSpawnOrGrowth >= Herbivore.waitAfterSpawnOrGrowth)
  //   }
  //
  // Pretty sure the superclass canSpawn with this.constructor will
  // work, but leaving here until I've enough in place to confirm


  _spawn() {
    if (chance() <= Herbivore.spawnChance) {

      let choice = Math.floor(Math.random() * Herbivore.spawnOutcomes.length)
      let numChildren = Herbivore.spawnOutcomes[choice]
      // Haven't figured out how to place the progeny, yet. In
      // particular, don't know if I want the location as part of the
      // constructor. ThinkMore.

      let children = []
      for (let i=0; i<numChildren; i++) {
        // The intent
        // children.push(new Herbivore())
      }
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
