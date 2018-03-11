import World from "./world"
import { WorldSettings } from "./config"
import { getCoordsAsNumbers } from "./util"

class View {

  constructor($el, world) {
    this.$el = $el

    // I can anticipate confusion and thus a need for renaming. At the
    // moment, the object created by setupWorld (namely, $world) is
    // the view and the value of this.world (a World instance) is the
    // model.

    this.inaugurateWorld(world)

    this.tick()

    // Arrow function because binding.
    let refreshID = window.setInterval(() => {this.tick()},  551)

    // Presently here to stop an infinite blink cycle. That is what is
    // wanted in production.
    window.setTimeout(()=>{clearInterval(refreshID)}, 550000)
  }


  inaugurateWorld(world) {
    this.view = this.setupWorld()
    this.world = world
  }

  setupWorld() {
    this.$el.html('')
    const $world = $("<figure>").addClass("world")

    for (let y=0; y<WorldSettings.height; y++) {
      const $row = $("<ul>").addClass("world-row")
      for (let x=0; x<WorldSettings.width; x++) {
        const $cell = $("<li>").addClass("cell").attr("coords", [x, y])
        $row.append($cell)
      }
      $world.append($row)
    }

    this.$el.append($world)

  }


  tick() {
    this.world.tick()

    this.repaint()
  }


  repaint() {

    // Do the stupid thing which is also the simplest thing that could
    // possibly work. Various optimizations are possible. Presently,
    // optimizing for programmer time.

    // The most likely big optimization win would be for the World to
    // maintain a list of cells that changed in a round and then to
    // set classes only for those cells.
    let x, y
    let world = this.world
    $(".world li").each(function(i) {
      [x,y] = getCoordsAsNumbers($(this).attr('coords'))
      let cell = world.getCell(x,y)

      // Here is one possible optimization. As it stands, with this
      // code, we will often remove one or more classes just to put
      // them back on. It isn't clear if the testing before change
      // would be quicker. Probably not worth testing as my other main
      // optimization idea would make this moot.
      $(this).removeClass()
      $(this).addClass(cell.getCSSClass())
    })
  }
}


export default View
