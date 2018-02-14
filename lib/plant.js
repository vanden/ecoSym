import LifeForm from "./lifeform"
import { PlantSettings } from "./config"

class Plant extends LifeForm {

  constructor(opts) {
    super(opts)
    this.size = 0  // Override superclass; seeds are small
  }


  move(){
    // Here just so the superclass can call for Subclasses that can move.
  }


  _spawn() {}

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
