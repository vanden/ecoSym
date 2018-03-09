import World from "./world"
import View from "./view"
import { WorldSettings } from "./config"


document.addEventListener('DOMContentLoaded', () =>{
  let world = new World(WorldSettings)
  const rootEl = $('.ecosym-world')

  let view = new View(rootEl, world)

  let resetButton = document.getElementById('worldResetter')
  resetButton.addEventListener("click", () => {worldMaker(view, WorldSettings)})
})


let worldMaker = function worldMaker(view, wSettings) {
  view.inaugurateWorld(new World(wSettings))
}
