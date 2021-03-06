
// Ultimately, some of the following settings will be filled out from
// the GUI. Hardcoded for now. It probably will end up that the Config
// settings stay in place as defaults on app load.

export const WorldSettings = {
  width: 61,
  height: 61,
  rockPercentage: 7,
  lifePercentage: 40,
  // Don't like the naming. herbivorePercentage and plantPercentage
  // are the percentages each has of the total number of life cells,
  // those dictated by lifePercentage.
  herbivorePercentage: 5,
  plantPercentage: 95
}

export const HerbivoreSettings = {

  growthChance: 30,          // The change of growing in a given turn
  spawnChance: 23,           // The change of spawning in a given turn
  spontaneousDeathChance: 1,
  maxLifeSpan: 60,           // Expected Herbivore life span. (There
                             // is a fudge factor applied to avoid
                             // mass die-offs all at once.

  // Possible numbers of spores to spawn; duplication allows
  // Math.random to be used simply.
  spawnOutcomes: [1,1,1,2,2,2,3],
  minSpawnSize: 3,           // Smallest size of Herbivore that can spawn

  // Delay in turns after growing or spawning before elligible to do so, again
  waitAfterSpawnOrGrowth: 9,
  maxSize: 5,
  startingEnergy: 10,

}

export const PlantSettings = {

  growthChance: 30,          // The change of growing in a given turn
  spawnChance: 25,           // The change of spawning in a given turn
  spontaneousDeathChance: 1,
  maxLifeSpan: 150,          // Expected Herbivore life span. (There
                             // is a fudge factor applied to avoid
                             // mass die-offs all at once.

  // Possible numbers of spores to spawn; duplication allows
  // Math.random to be used simply.
  spawnOutcomes: [1,2,2,2,3,3,4],
  minSpawnSize: 2,           // Smallest size of Plant that can spawn

  // Delay in turns after growing or spawning before elligible to do so, again
  waitAfterSpawnOrGrowth: 5,
  maxSize: 5
}


export const Config = {
  herb: HerbivoreSettings,
  plant: PlantSettings,
  world: WorldSettings
}
