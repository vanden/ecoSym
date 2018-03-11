class Cell {

  constructor(opts) {
    this.x = opts.x
    this.y = opts.y
    this.contents = null
    this.neighbourhood = {}
  }


  getCSSClass() {
    if (this.contents) { return this.contents.getCSSClass() }
    return "cell"
  }


  tick(turn) {
    if (this.contents) { this.contents.tick(turn) }
  }
}

export default Cell
