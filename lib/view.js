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

//    this.tick()

  }


  inaugurateWorld(world) {
    this.world = world
    this.setupWorld()
        // Arrow function because binding.
    let refreshID = window.setInterval(() => {this.tick()}, 175)

    // Presently here to stop an infinite blink cycle. That is what is
    // wanted in production.
    window.setTimeout(()=>{clearInterval(refreshID)}, 100610)


    // Should have pause and resume. See here for an idea as to how: https://stackoverflow.com/questions/3969475/javascript-pause-settimeout

  }

  setupWorld() {
    this.$el.html('')
    const $world = $("<figure>").addClass("world")
    let css_class, x, y

    for (y=0; y<WorldSettings.height; y++) {
      const $row = $("<ul>").addClass("world-row")
      for (x=0; x<WorldSettings.width; x++) {
        css_class = this.world.getCell(x,y).getCSSClass()
        const $cell = $("<li>").addClass(css_class).attr("coords", [x, y])
        $row.append($cell)
      }
      $world.append($row)
    }

    this.$el.append($world)

  }


  tick() {
    let dirty_cells = this.world.tick()
    this.repaint(dirty_cells)
  }


  repaint(dirty_cells) {
    let x, y, cell, world = this.world

    // $(".world li").each(function(i) {
    //   [x,y] = getCoordsAsNumbers($(this).attr('coords'))
    //   cell = world.getCell(x,y)

    //   $(this).removeClass()
    //   $(this).addClass(cell.getCSSClass())
    // })
    let node
    if (!dirty_cells) { return }
    dirty_cells.forEach( (cell) => {
      node = document.querySelector(`[coords="${cell.x},${cell.y}"]`)
      node.className = cell.getCSSClass()
    })
  }
}


export default View
