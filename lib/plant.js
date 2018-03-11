import LifeForm from "./lifeform"
import { PlantSettings } from "./config"
import { chance, randomSample } from "./util"

class Plant extends LifeForm {

  constructor(opts) {
    super(opts)
    this.size = 0  // Override superclass; seeds are small
  }


  die() {
    super.die()
    this.world.plantCount--
  }

  makeNew(loc, world) {
    // This should be DRY wrt the initial populate code FixMe
    world.plant++
    return new Plant({location: loc, world: world})
  }
  
  _spawn() {
    // DAGNABBIT JS OOP has defeated me for now. This is duplicated
    // from Herbivore. FixMe
    if (chance() <= this.constructor.spawnChance) {

      let numChildren = this._getNumChildren()

      // Ruhoh. Every so often, this gives an error that cannot read
      // location of undefined. WTF FixMe
      let locs = randomSample(this.location.neighbourhood, numChildren)
      for (let i=0; i<locs.length; i++) {
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
Plant.growthChance = PlantSettings.growthChance
Plant.maxLifeSpan = PlantSettings.maxLifeSpan
Plant.maxSize = PlantSettings.maxSize
Plant.minSpawnSize = PlantSettings.minSpawnSize
Plant.spawnChance = PlantSettings.spawnChance
Plant.spawnOutcomes = PlantSettings.spawnOutcomes
Plant.spawnOutcomes = PlantSettings.spawnOutcomes
Plant.spontaneousDeathChance = PlantSettings.spontaneousDeathChance
Plant.waitAfterSpawnOrGrowth = PlantSettings.waitAfterSpawnOrGrowth


export default Plant
