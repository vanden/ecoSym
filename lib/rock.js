class Rock {

  getCSSClass() {
    return 'cell rock'
  }

  // Easier than if-testing for Rock as Cell.contents before calling Cell.tick
  tick(turn) { return [] }
}


export default Rock

