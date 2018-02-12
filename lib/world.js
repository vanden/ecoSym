const Cell = require("./cell")

class World {

  constructor() {

    this.grid = {}
    this.populateGrid()
    this.setNeighbourhoods()
  }

  populateGrid() {
    for (let x=0; x<World.WIDTH; x++) {
      for (let y=0; y<World.HEIGHT; y++) {
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
}


// These should come from elsewhere, but hardcoded here is fine for now
World.WIDTH = 4
World.HEIGHT = 4


let w = new World()
