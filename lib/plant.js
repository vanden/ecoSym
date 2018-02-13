const LifeForm = require("./lifeform")
const PlantSettings = require("./plant_settings")


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
Plant.spawnOutcomes = PlantSettings.spawnOutcomes
Plant.growthChance = PlantSettings.growthChance
Plant.spawnChance = PlantSettings.spawnChance
Plant.maxLifeSpan = PlantSettings.maxLifeSpan
Plant.spontaneousDeathChance = PlantSettings.spontaneousDeathChance
Plant.spawnOutcomes = PlantSettings.spawnOutcomes
Plant.minSpawnSize = PlantSettings.minSpawnSize
Plant.waitAfterSpawnOrGrowth = PlantSettings.waitAfterSpawnOrGrowth



module.exports = Plant
