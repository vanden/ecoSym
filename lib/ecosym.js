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

  // let myRangeSlider = document.getElementById('myRange')
  // let myRangeOutput = document.getElementById("demoOutput")
  // console.log(Config)
  // myRangeSlider.value = Config.test
  // myRangeOutput.innerHTML = myRangeSlider.value

  // myRangeSlider.oninput = function() {
  //   Config.test = this.value
  //   myRangeOutput.innerHTML = this.value;
  // }

  let HerbivoreLifeSpanSlider = document.getElementById('herb-lifespan-slide')
  let HerbivoreLifeSpanOutput = document.getElementById("herb-lifespan-output")
  HerbivoreLifeSpanSlider.value = Config.herb.maxLifeSpan
  HerbivoreLifeSpanOutput.innerHTML = HerbivoreLifeSpanSlider.value

  HerbivoreLifeSpanSlider.oninput = function () {
    Config.herb.maxLifeSpan = Number(this.value)
    HerbivoreLifeSpanOutput.innerHTML = this.value
  }

  let PlantLifeSpanSlider = document.getElementById('plant-lifespan-slide')
  let PlantLifeSpanOutput = document.getElementById("plant-lifespan-output")
  PlantLifeSpanSlider.value = Config.plant.maxLifeSpan
  PlantLifeSpanOutput.innerHTML = PlantLifeSpanSlider.value

  PlantLifeSpanSlider.oninput = function () {
    Config.plant.maxLifeSpan = Number(this.value)
    PlantLifeSpanOutput.innerHTML = this.value
  }


  let world = new World(WorldSettings, Config)
  const rootEl = $('.ecosym-world')

  let view = new View(rootEl, world)


})


let worldMaker = function worldMaker(view, wSettings, Config) {
  view.inaugurateWorld(new World(wSettings, Config))
}
