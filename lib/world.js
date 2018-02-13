import Cell from "./cell"
import Herbivore from "./herbivore"
import Plant from "./plant"


// h = new Herbivore()
// h.takeTurn()
// console.log(h.getCSSClass())

// p = new Plant()
// p.takeTurn()
// console.log(p.getCSSClass())


class World {

  constructor(opts) {

    this.width = opts.width
    this.height = opts.height
    this.grid = {}
    this.populateGrid()
    this.setNeighbourhoods()
  }

  populateGrid() {
    for (let x=0; x<this.width; x++) {
      for (let y=0; y<this.height; y++) {
        // Given that grid has co-ordinates, it isn't clear a Cell
        // needs them. ThinkMore

        this.grid[[x,y]] = new Cell({x, y})
      }
    }
  }

  getCoordinatesAsNumbers(cords) {
    let x, y
    [x,y] = cords.split(',')
    return [Number(x), Number(y)]
  }

  setNeighbourhoods() {

    let grid = this.grid
    let cell, cords, dx, dy, x, y, cand

    for (cords in grid) {
      [x,y] = this.getCoordinatesAsNumbers(cords)

      cell = grid[cords]
      for (dx=-1; dx<2; dx++) {
        for (dy=-1; dy<2; dy++) {
          // No cell is its own neighbour
          if (dx || dy)  {
            cand = [x + dx, y + dy]

            // Check that cand is in bounds of the world.
            if (grid[cand]) {
              // Is this infinite circular descent a problem? Not in
              // python, but js?
              cell.neighbourhood[[dx, dy]] = this.grid[cand]
            }
          }
        }
      }
    }
  }

  tick() {

  }
}

export default World
