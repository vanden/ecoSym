import LifeForm from "./lifeform"
import { HerbivoreSettings } from "./config"
import { chance, randomSample } from "./util"

class Herbivore extends LifeForm {

  constructor(opts) {
    super(opts)
  }


  move() {

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
