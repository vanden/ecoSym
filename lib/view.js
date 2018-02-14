import World from "./world"
import { WorldSettings } from "./config"


class View {

  constructor($el, world) {
    this.$el = $el

    // I can anticipate confusion and thus a need for renaming. At the
    // moment, the object created by setupWorld (namely, $world) is
    // the view and the value of this.world (a World instance) is the
    // model.
    this.view = this.setupWorld()
    this.world = world

    this.tick()

    // Arrow function because binding.
    let refreshID = window.setInterval(() => {this.tick()},  351)

    // Presently here to stop an infinite blink cycle. That is what is
    // wanted in production.
    window.setTimeout(()=>{clearInterval(refreshID)}, 5000)
  }


  setupWorld() {

    const $world = $("<figure>").addClass("world")

    for (let y=0; y<WorldSettings.height; y++) {
      const $row = $("<ul>").addClass("world-row")
      for (let x=0; x<WorldSettings.width; x++) {
        const $cell = $("<li>").addClass("cell").attr(
          "co-ords", [x, y])
        $row.append($cell)
      }
      $world.append($row)
    }

    this.$el.append($world)

  }

  tick() {
    this.world.tick()

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

    $("li[co-ords='18,12']").toggleClass('rock');

  }

}


export default View
