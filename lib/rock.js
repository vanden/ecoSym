class Rock {

  getCSSClass() {
    return 'cell rock'
  }

  
  tick() {
    // A non-op method is easier than checking if a cell's content is
    // a rock before ticking the cell.
  }
}


export default Rock

