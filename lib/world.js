import Cell from "./cell"
import Herbivore from "./herbivore"
import Plant from "./plant"
import ROCK from "./rock"

import { shuffleValues, getCoordsAsNumbers } from "./util"

class World {

  constructor(opts, Config) {
    this.config = Config
    this.width = opts.width
    this.height = opts.height
    this.rockPercentage = opts.rockPercentage
    this.lifePercentage = opts.lifePercentage
    this.herbivorePercentage = opts.herbivorePercentage
    this.plantPercentage = opts.plantPercentage

    this.plantCount = 0
    this.rockCount = 0
    this.herbivoreCount = 0
    this.turn = 0

    this.grid = {}

    this.populateGrid()
    this.populateWorld()
    this.setNeighbourhoods()
//    this.tick()
  }

  populateGrid() {
    for (let x=0; x<this.width; x++) {
      for (let y=0; y<this.height; y++) {
        this.grid[[x,y]] = new Cell({x, y})
      }
    }
  }


  populateWorld() {
    let cell, cells = shuffleValues(this.grid)
    const rockCount = Math.floor(
      cells.length * (this.rockPercentage /100 ))

    for (let i=0; i<rockCount; i++) {
      cell = cells.pop()
      this.rockCount++
      cell.contents = ROCK
    }

    let livingCellCount = Math.floor(
      Object.values(this.grid).length * this.lifePercentage / 100)

    this.populateWithLife(cells.slice(0, livingCellCount))
  }


  setNeighbourhoods() {

    let cell, cords, dx, dy, x, y, cand, grid = this.grid

    for (cords in grid) {
      [x,y] = getCoordsAsNumbers(cords)

      cell = grid[cords]
      if (cell.contents == ROCK) {
        // There is no need for Rock Cells to know their neighbours
        continue
      }
      for (dx=-1; dx<2; dx++) {
        for (dy=-1; dy<2; dy++) {

          // No cell is its own neighbour
          if (!(dx || dy))  { continue }

          cand = grid[[x + dx, y + dy]]

          // Check that cand is in bounds of the world.
          if (!cand) { continue }

          // While Rock containing Cells *are* neighbours, they cannot
          // be moved into so we optimize by not including them
          if (cand.contents == ROCK) { continue }

          cell.neighbourhood[[dx, dy]] = cand
        }
      }
    }
  }


  populateWithLife(cells) {
    let cell
    let lifeCount = cells.length

    // clumsy. FixMe
    while (cells.length > (lifeCount  * (this.plantPercentage / 100))) {
      cell = cells.pop()
      this.herbivoreCount++
      cell.contents = new Herbivore({location: cell, last_move: this.turn,
                                     world: this}, this.config)
    }

    while (cells.length) {
      cell = cells.pop()
      this.plantCount++
      cell.contents = new Plant({location: cell, world:this,
                                 last_move: this.turn})
      cell.contents.size = 1
    }
  }


  tick() {
    let cell, coords, contents, dirty
    let dirty_cells = []
    this.turn++
    for (coords in this.grid) {
      cell = this.getCell(...getCoordsAsNumbers(coords))
      let dirty = cell.tick(this.turn)
      if (dirty) { dirty_cells.push(...dirty) }
    }
    return dirty_cells
  }


  getCell(x, y) {
    return this.grid[[x, y]]
  }
}


export default World
