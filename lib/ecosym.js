import World from "./world"
import View from "./view"
import { WorldSettings } from "./config"
import { PlantSettings } from "./config"
import { Config } from "./config"

document.addEventListener('DOMContentLoaded', () =>{

  let resetButton = document.getElementById('worldResetter')
  resetButton.addEventListener("click", () => {
    worldMaker(view, WorldSettings, Config)
  })


  // World Settings Sliders

  // Rock and life percentage are tied together in that they cannot
  // sum to more than 100.
  let RockPercentageSlider = document.getElementById('rock-percentage-slide')
  let RockPercentageOutput = document.getElementById('rock-percentage-output')
  let LifePercentageSlider = document.getElementById('life-percentage-slide')
  let LifePercentageOutput = document.getElementById('life-percentage-output')

  RockPercentageSlider.value = Config.world.rockPercentage
  RockPercentageOutput.innerHTML = RockPercentageSlider.value

  RockPercentageSlider.oninput = function () {

    Config.world.rockPercentage = Number(this.value)

    let lifePer = Config.world.lifePercentage

    if ((lifePer + Config.world.rockPercentage) > 100) {
      LifePercentageSlider.value = (100 - Config.world.rockPercentage)
      LifePercentageOutput.innerHTML = LifePercentageSlider.value
      Config.world.lifePercentage = Number(LifePercentageSlider.value)
    }

    RockPercentageOutput.innerHTML = this.value
  }


  LifePercentageSlider.value = Config.world.lifePercentage
  LifePercentageOutput.innerHTML = LifePercentageSlider.value

  LifePercentageSlider.oninput = function () {

    Config.world.lifePercentage = Number(this.value)

    let rockPer = Config.world.rockPercentage

    if ((rockPer + Config.world.lifePercentage) > 100) {
      RockPercentageSlider.value = (100 - Config.world.lifePercentage)
      RockPercentageOutput.innerHTML = RockPercentageSlider.value
      Config.world.rockPercentage = Number(RockPercentageSlider.value)
    }

    LifePercentageOutput.innerHTML = this.value
  }


  // Herbivore and Plant percentages are tied together in that they must sum to 100. It

  let HerbivorePercentageSlider = document.getElementById('herb-percentage-slide')
  let HerbivorePercentageOutput = document.getElementById('herb-percentage-output')
  let PlantPercentageSlider = document.getElementById('plant-percentage-slide')
  let PlantPercentageOutput = document.getElementById('plant-percentage-output')


  HerbivorePercentageSlider.value = Config.world.herbivorePercentage
  HerbivorePercentageOutput.innerHTML = HerbivorePercentageSlider.value

  HerbivorePercentageSlider.oninput = function () {

    Config.world.herbivorePercentage = Number(this.value)

    let plantPer = Config.world.plantPercentage

    if ((plantPer + Config.world.herbivorePercentage) != 100) {
      PlantPercentageSlider.value = (100 - Config.world.herbivorePercentage)
      PlantPercentageOutput.innerHTML = PlantPercentageSlider.value
      Config.world.plantPercentage = Number(PlantPercentageSlider.value)
    }

    HerbivorePercentageOutput.innerHTML = this.value
  }


  PlantPercentageSlider.value = Config.world.plantPercentage
  PlantPercentageOutput.innerHTML = PlantPercentageSlider.value

  PlantPercentageSlider.oninput = function () {

    Config.world.plantPercentage = Number(this.value)

    let herbPer = Config.world.herbivorePercentage

    if ((herbPer + Config.world.plantPercentage) != 100) {
      HerbivorePercentageSlider.value = (100 - Config.world.plantPercentage)
      HerbivorePercentageOutput.innerHTML = HerbivorePercentageSlider.value
      Config.world.herbivorePercentage = Number(HerbivorePercentageSlider.value)
    }

    PlantPercentageOutput.innerHTML = this.value
  }



  // Herbivore Settings Sliders

  let HerbivoreLifeSpanSlider = document.getElementById('herb-lifespan-slide')
  let HerbivoreLifeSpanOutput = document.getElementById("herb-lifespan-output")
  HerbivoreLifeSpanSlider.value = Config.herb.maxLifeSpan
  HerbivoreLifeSpanOutput.innerHTML = HerbivoreLifeSpanSlider.value

  HerbivoreLifeSpanSlider.oninput = function () {
    Config.herb.maxLifeSpan = Number(this.value)
    HerbivoreLifeSpanOutput.innerHTML = this.value
  }


  let HerbivoreDeathChanceSlider = document.getElementById(
    'herb-deathchance-slide')
  let HerbivoreDeathChanceOutput = document.getElementById(
    "herb-deathchance-output")
  HerbivoreDeathChanceSlider.value = Config.herb.spontaneousDeathChance
  HerbivoreDeathChanceOutput.innerHTML = HerbivoreDeathChanceSlider.value

  HerbivoreDeathChanceSlider.oninput = function () {
    Config.herb.spontaneousDeathChance = Number(this.value)
    HerbivoreDeathChanceOutput.innerHTML = this.value
  }


  let HerbivoreGrowthChanceSlider = document.getElementById(
    'herb-growthchance-slide')
  let HerbivoreGrowthChanceOutput = document.getElementById(
    "herb-growthchance-output")
  HerbivoreGrowthChanceSlider.value = Config.herb.growthChance
  HerbivoreGrowthChanceOutput.innerHTML = HerbivoreGrowthChanceSlider.value

  HerbivoreGrowthChanceSlider.oninput = function () {
    Config.herb.growthChance = Number(this.value)
    HerbivoreGrowthChanceOutput.innerHTML = this.value
  }


  let HerbivoreSpawnChanceSlider = document.getElementById(
    'herb-spawnchance-slide')
  let HerbivoreSpawnChanceOutput = document.getElementById(
    "herb-spawnchance-output")
  HerbivoreSpawnChanceSlider.value = Config.herb.spawnChance
  HerbivoreSpawnChanceOutput.innerHTML = HerbivoreSpawnChanceSlider.value

  HerbivoreSpawnChanceSlider.oninput = function () {
    Config.herb.spawnChance = Number(this.value)
    HerbivoreSpawnChanceOutput.innerHTML = this.value
  }


  let HerbivoreSGDelaySlider = document.getElementById(
    'herb-sgdelay-slide')
  let HerbivoreSGDelayOutput = document.getElementById(
    "herb-sgdelay-output")
  HerbivoreSGDelaySlider.value = Config.herb.waitAfterSpawnOrGrowth
  HerbivoreSGDelayOutput.innerHTML = HerbivoreSGDelaySlider.value

  HerbivoreSGDelaySlider.oninput = function () {
    Config.herb.waitAfterSpawnOrGrowth = Number(this.value)
    HerbivoreSGDelayOutput.innerHTML = this.value
  }



  // Plant Settings Sliders


  let PlantLifeSpanSlider = document.getElementById('plant-lifespan-slide')
  let PlantLifeSpanOutput = document.getElementById("plant-lifespan-output")
  PlantLifeSpanSlider.value = Config.plant.maxLifeSpan
  PlantLifeSpanOutput.innerHTML = PlantLifeSpanSlider.value

  PlantLifeSpanSlider.oninput = function () {
    Config.plant.maxLifeSpan = Number(this.value)
    PlantLifeSpanOutput.innerHTML = this.value
  }


  let PlantDeathChanceSlider = document.getElementById('plant-deathchance-slide')
  let PlantDeathChanceOutput = document.getElementById("plant-deathchance-output")
  PlantDeathChanceSlider.value = Config.plant.spontaneousDeathChance
  PlantDeathChanceOutput.innerHTML = PlantDeathChanceSlider.value

  PlantDeathChanceSlider.oninput = function () {
    Config.plant.spontaneousDeathChance = Number(this.value)
    PlantDeathChanceOutput.innerHTML = this.value
  }


  let PlantGrowthChanceSlider = document.getElementById(
    'plant-growthchance-slide')
  let PlantGrowthChanceOutput = document.getElementById(
    "plant-growthchance-output")
  PlantGrowthChanceSlider.value = Config.plant.growthChance
  PlantGrowthChanceOutput.innerHTML = PlantGrowthChanceSlider.value

  PlantGrowthChanceSlider.oninput = function () {
    Config.plant.growthChance = Number(this.value)
    PlantGrowthChanceOutput.innerHTML = this.value
  }


  let PlantSpawnChanceSlider = document.getElementById(
    'plant-spawnchance-slide')
  let PlantSpawnChanceOutput = document.getElementById(
    "plant-spawnchance-output")
  PlantSpawnChanceSlider.value = Config.plant.spawnChance
  PlantSpawnChanceOutput.innerHTML = PlantSpawnChanceSlider.value

  PlantSpawnChanceSlider.oninput = function () {
    Config.plant.spawnChance = Number(this.value)
    PlantSpawnChanceOutput.innerHTML = this.value
  }


  let PlantSGDelaySlider = document.getElementById(
    'plant-sgdelay-slide')
  let PlantSGDelayOutput = document.getElementById(
    "plant-sgdelay-output")
  PlantSGDelaySlider.value = Config.plant.waitAfterSpawnOrGrowth
  PlantSGDelayOutput.innerHTML = PlantSGDelaySlider.value

  PlantSGDelaySlider.oninput = function () {
    Config.plant.waitAfterSpawnOrGrowth = Number(this.value)
    PlantSGDelayOutput.innerHTML = this.value
  }





  let world = new World(WorldSettings, Config)
  const rootEl = $('.ecosym-world')

  let view = new View(rootEl, world)


})


let worldMaker = function worldMaker(view, wSettings, Config) {
  view.inaugurateWorld(new World(wSettings, Config))
}
