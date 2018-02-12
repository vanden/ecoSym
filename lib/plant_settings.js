// Ultimately, some of these will be filled out from the GUI. Hardcoded for now.

let PlantSettings = {

  growthChance: 30,          // The change of growing in a given turn
  spawnChance: 25,           // The change of spawning in a given turn
  maxLifeSpan: 50,           // Longest number of rounds a Plant can live
  spontaneousDeathChange: 1,

  // Possible numbers of spores to spawn; duplication allows
  // Math.random to be used simply.
  spawnOutcomes: [1,2,2,2,3,3,4],
  minSpawnSize: 2,           // Smallest size of Plant that can spawn

  // Delay in turns after growing or spawning before elligible to do so, again
  waitAfterSpawnOrGrowth: 5  
  
  
}


module.exports = PlantSettings
