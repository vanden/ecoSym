const Cell = require("./cell")

class World {

  constructor() {

    this.grid = {}
    this.populateGrid()
    
  }

  populateGrid() {
    for (let x=0; x<World.WIDTH; x++) {
      this.grid[x] = {}
      for (let y=0; y<World.HEIGHT; y++) {
        // Given that grid has co-ordinates, it isn't clear a Cell
        // needs them. ThinkMore
        this.grid[x][y] = new Cell({x, y})
      }
    }
  }

}

// These should come from elsewhere, but hardcoded here is fine for now
World.WIDTH = 30
World.HEIGHT = 20


let w = new World()
