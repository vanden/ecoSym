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

    $("li[co-ords='23,10']").toggleClass('herbivore-1');
    $("li[co-ords='23,11']").toggleClass('herbivore-2');
    $("li[co-ords='23,12']").toggleClass('herbivore-3');
    $("li[co-ords='23,13']").toggleClass('herbivore-4');
    $("li[co-ords='23,14']").toggleClass('herbivore-5');

    $("li[co-ords='20,9']").toggleClass('plant-0');
    $("li[co-ords='20,10']").toggleClass('plant-1');
    $("li[co-ords='20,11']").toggleClass('plant-2');
    $("li[co-ords='20,12']").toggleClass('plant-3');
    $("li[co-ords='20,13']").toggleClass('plant-4');
    $("li[co-ords='20,14']").toggleClass('plant-5');

  }
}

  
module.exports = View 
