import LifeForm from "./lifeform"
import { PlantSettings } from "./config"
import { chance, randomSample, valPlusMinus } from "./util"

class Plant extends LifeForm {

  constructor(opts, Config) {
    super(opts, Config)
    this.size = 0  // Override superclass; seeds are small
    this.lifeSpan = valPlusMinus(this.config.plant.maxLifeSpan, 5)
    this.growthChance = this.config.plant.growthChance
    this.spawnChance = this.config.plant.spawnChance
    this.spontaneousDeathChance = this.config.plant.spontaneousDeathChance
  }


  die() {
    super.die()
    this.world.plantCount--
  }

  makeNew(loc, world) {
    // This should be DRY wrt the initial populate code FixMe
    world.plant++
    return new Plant({location: loc, world: world}, this.config)
  }

  _spawn() {
    // DAGNABBIT JS OOP has defeated me for now. This is duplicated
    // from Herbivore. FixMe

    if (chance() <= this.spawnChance) {

      let i, numChildren = this._getNumChildren()
      let locs = randomSample(this.location.neighbourhood, numChildren)

      for (i=0; i<locs.length; i++) {
        if (!locs[i].contents){
          locs[i].contents = this.makeNew(locs[i], this.world)
          this.dirty_cells.push(locs[i])
        }
      }
      this.size--
      this.turnsSinceSpawnOrGrowth = 0
      this.dirty = true
    }
  }
}



Plant.typestring = "plant"
// These are documented a bit in PlantSettings
Plant.maxLifeSpan = PlantSettings.maxLifeSpan
Plant.maxSize = PlantSettings.maxSize
Plant.minSpawnSize = PlantSettings.minSpawnSize
Plant.spawnOutcomes = PlantSettings.spawnOutcomes
Plant.waitAfterSpawnOrGrowth = PlantSettings.waitAfterSpawnOrGrowth


export default Plant
