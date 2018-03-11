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
    if (this.contents) { return this.contents.tick(turn) }
    return []
  }
}

export default Cell
