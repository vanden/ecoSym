

class Cell {

  constructor(opts) {
    this.x = opts.x
    this.y = opts.y
    this.contents = null
    this.neighbourhood = {}
  }

  draw() {
    if (this.contents) {
      // Obviously, a placeholder. This will have to ask the contents
      // to draw themselves. But, it will have to do so by passing
      // down co-ordinates. Or, game Objects could maintain a location
      // property, so they would know where they are. I'm a bit
      // worried about the circular references, though. (A like issue
      // as with the Cell.neighbourhood containing Cell objects as
      // values.) ThinkMore
      console.log(this)
    }
  }
}


module.exports = Cell

