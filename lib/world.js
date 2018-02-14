import Cell from "./cell"
import Herbivore from "./herbivore"
import Plant from "./plant"
import Rock from "./rock"

import { shuffleValues, getCoordsAsNumbers } from "./util"

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
    this.rockPercentage = opts.rockPercentage
    this.lifePercentage = opts.lifePercentage
    this.herbivorePercentage = opts.herbivorePercentage
    this.plantPercentage = opts.plantPercentage

    this.plantCount = 0
    this.rockCount = 0
    this.herbivoreCount = 0

    this.grid = {}

    this.populateGrid()
    this.setNeighbourhoods()
    this.populateWorld()
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


  setNeighbourhoods() {

    let grid = this.grid
    let cell, cords, dx, dy, x, y, cand

    for (cords in grid) {
      [x,y] = getCoordsAsNumbers(cords)

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


  populateWorld() {
    let cells = shuffleValues(this.grid), cell

    // Since they never change, might as well use the same one
    const ROCK = new Rock()

    const rockCount = Math.floor(
      cells.length * (this.rockPercentage /100 ))

    for (let i = 0; i< rockCount; i++) {
      cell = cells.pop()
      this.rockCount++
      cell.contents = ROCK
    }

    let livingCellCount = Math.floor(
      Object.values(this.grid).length * this.lifePercentage / 100)

    this.populateWithLife(cells.slice(0, livingCellCount))

    // Proof it works, but it needs to catch up. I don't fully grok
    // the async nature
    setTimeout(()=>{
      console.log(this.grid)}, 1000)
  }


  populateWithLife(cells) {
    let cell
    let lifeCount = cells.length

    // clumsy. FixMe
    while (cells.length > (lifeCount  * (this.plantPercentage / 100))) {
      cell = cells.pop()
      this.herbivoreCount++
      cell.contents = new Herbivore()
    }

    while (cells.length) {
      cell = cells.pop()
      this.plantCount++
      cell.contents = new Plant()
    }
  }

  tick() {

  }
}


export default World
