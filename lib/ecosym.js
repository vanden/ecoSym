const Config = require("./config")
const World = require("./world")
const View = require("./view")


$(function () {
  let world = new World(Config.WORLDWIDTH, Config.WORLDHEIGHT)
  const rootEl = $('.ecosym-world')
  new View(rootEl, world)
})
