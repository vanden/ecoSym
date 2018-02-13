import World from "./world"
import View from "./view"
import { WorldSettings } from "./config"

$(function () {
  let world = new World(WorldSettings)
  const rootEl = $('.ecosym-world')
  new View(rootEl, world)
})
