import World from "./world"
import View from "./view"
import { WorldSettings } from "./config"


document.addEventListener('DOMContentLoaded', () =>{
  let world = new World(WorldSettings)
  const rootEl = $('.ecosym-world')

  new View(rootEl, world)
})
