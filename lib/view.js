const Config = require("./config")
const World = require("./world")


class View {

  constructor($el) {
    this.$el = $el
    this.setupWorld()

    this.world = new World(Config.WORLDWIDTH, Config.WORLDHEIGHT)
  }


  setupWorld() {

    const $world = $("<figure>").addClass("world")

    for (let y=0; y<Config.WORLDHEIGHT; y++) {
      const $row = $("<ul>").addClass("world-row")
      for (let x=0; x<Config.WORLDWIDTH; x++) {
        const $cell = $("<li>").addClass("cell").attr(
          "co-ords", [x, y])
        $row.append($cell)
      }
      $world.append($row)
    }

    this.$el.append($world)
  }
}

  
module.exports = View 
