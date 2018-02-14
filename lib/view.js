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
          "coords", [x, y])
        $row.append($cell)
      }
      $world.append($row)
    }

    this.$el.append($world)

  }

  tick() {

    // Worried about the async, here. May have to make some promises.
    this.world.tick()

  }

}


export default View
