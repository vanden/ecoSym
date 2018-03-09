/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const chance = function percentageChance() {
  return Math.floor(Math.random() * 100)
}
/* harmony export (immutable) */ __webpack_exports__["a"] = chance;



const shuffleValues = function shuffleValues(obj) {
  let shuffled = Object.values(obj)
  let i = shuffled.length
  let tmp, idx
  
  while (i--) {
    idx = Math.floor((i + 1) * Math.random());
    tmp = shuffled[idx];
    shuffled[idx] = shuffled[i];
    shuffled[i] = tmp;
  }
  return shuffled
}
/* harmony export (immutable) */ __webpack_exports__["e"] = shuffleValues;


const getCoordsAsNumbers = function getCoordsAsNumbers(cords) {
  let x, y
  [x,y] = cords.split(',')
  return [Number(x), Number(y)]
}
/* harmony export (immutable) */ __webpack_exports__["b"] = getCoordsAsNumbers;


const randomSample = function randomSample(obj, n=null) {
  n = n || obj.length
  let values = shuffleValues(obj)
  return values.slice(0, n)
}
/* harmony export (immutable) */ __webpack_exports__["d"] = randomSample;



const randomElement = function randomElement(obj) {
  return randomSample(obj, 1)[0]
}

let offsets = []
for (let dx=-1; dx<2; dx++) {
  for (let dy=-1; dy<2; dy++) {
    if (dx * dy) { offsets.push([dx,dy]) }
  }
}

const randomDirection = function randomDirection() {
  return randomElement(offsets)
}
/* harmony export (immutable) */ __webpack_exports__["c"] = randomDirection;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// Ultimately, some of the following settings will be filled out from
// the GUI. Hardcoded for now. It probably will end up that the Config
// settings stay in place as defaults on app load.

const WorldSettings = {
  width: 50,
  height: 50,
  rockPercentage: 10,
  lifePercentage: 35,
  // Don't like the naming. herbivorePercentage and plantPercentage
  // are the percentages each has of the total number of life cells,
  // those dictated by lifePercentage.
  herbivorePercentage: 15,
  plantPercentage: 85
}
/* harmony export (immutable) */ __webpack_exports__["c"] = WorldSettings;


const HerbivoreSettings = {

  growthChance: 30,          // The change of growing in a given turn
  spawnChance: 20,           // The change of spawning in a given turn
  maxLifeSpan: 50,           // Longest number of rounds a Herbivore can live
  spontaneousDeathChance: 1,

  // Possible numbers of spores to spawn; duplication allows
  // Math.random to be used simply.
  spawnOutcomes: [1,1,1,2,2,2,3],
  minSpawnSize: 3,           // Smallest size of Herbivore that can spawn

  // Delay in turns after growing or spawning before elligible to do so, again
  waitAfterSpawnOrGrowth: 10,
  maxSize: 5,
  startingEnergy: 10,

}
/* harmony export (immutable) */ __webpack_exports__["a"] = HerbivoreSettings;


const PlantSettings = {

  growthChance: 30,          // The change of growing in a given turn
  spawnChance: 25,           // The change of spawning in a given turn
  maxLifeSpan: 150,           // Longest number of rounds a Plant can live
  spontaneousDeathChange: 1,

  // Possible numbers of spores to spawn; duplication allows
  // Math.random to be used simply.
  spawnOutcomes: [1,2,2,2,3,3,4],
  minSpawnSize: 2,           // Smallest size of Plant that can spawn

  // Delay in turns after growing or spawning before elligible to do so, again
  waitAfterSpawnOrGrowth: 5,
  maxSize: 5
}
/* harmony export (immutable) */ __webpack_exports__["b"] = PlantSettings;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cell__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__herbivore__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__plant__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rock__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util__ = __webpack_require__(0);







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
    this.turn = 0

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

        this.grid[[x,y]] = new __WEBPACK_IMPORTED_MODULE_0__cell__["a" /* default */]({x, y})
      }
    }
  }


  setNeighbourhoods() {

    let grid = this.grid
    let cell, cords, dx, dy, x, y, cand

    for (cords in grid) {
      [x,y] = Object(__WEBPACK_IMPORTED_MODULE_4__util__["b" /* getCoordsAsNumbers */])(cords)

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
    let cells = Object(__WEBPACK_IMPORTED_MODULE_4__util__["e" /* shuffleValues */])(this.grid), cell

    // Since they never change, might as well use the same one
    const ROCK = new __WEBPACK_IMPORTED_MODULE_3__rock__["a" /* default */]()

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
  }


  populateWithLife(cells) {
    let cell
    let lifeCount = cells.length

    // clumsy. FixMe
    while (cells.length > (lifeCount  * (this.plantPercentage / 100))) {
      cell = cells.pop()
      this.herbivoreCount++
      cell.contents = new __WEBPACK_IMPORTED_MODULE_1__herbivore__["a" /* default */]({location: cell, world: this})
    }

    while (cells.length) {
      cell = cells.pop()
      this.plantCount++
      cell.contents = new __WEBPACK_IMPORTED_MODULE_2__plant__["a" /* default */]({location: cell, world:this,
                                 startingEnergy: __WEBPACK_IMPORTED_MODULE_1__herbivore__["a" /* default */].startingEnergy})
    }
  }


  tick() {
    let cell, coords, contents
    let moved = new Set()
    this.turn++
    for (coords in this.grid) {
      cell = this.getCell(...Object(__WEBPACK_IMPORTED_MODULE_4__util__["b" /* getCoordsAsNumbers */])(coords))
      contents = cell.contents
      if (moved.has(contents)) { continue }
      moved.add(contents)
      cell.tick()
    }
  }


  getCell(x, y) {
    return this.grid[[x, y]]
  }
}


/* harmony default export */ __webpack_exports__["a"] = (World);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);



class LifeForm {

  constructor(opts) {
    this.location = opts.location
    this.world = opts.world
    this.age = 0
    this.alive = true
    this.turnsSinceSpawnOrGrowth = 0
    this.size = 1
  }


  getCSSClass() {
    return `cell ${this.constructor.typestring}-${this.size}`
  }


  tick() {
    this.turnsSinceSpawnOrGrowth++
    this.age++
    this.checkDeath()
    if (!this.alive) {return}
    this.move()
    // move, then starvation check as maybe moved into resources
    this.checkStarvation()
    this.spawn()
    this.grow()
  }


  checkStarvation() {
    // Stub that does nothing so that some, but not necessarily all,
    // subclasses can override.
  }


  checkDeath() {
    if (this.age > this.constructor.maxLifeSpan) {
      this.alive = false
    } else if (Object(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* chance */])() <=
               this.constructor.spontaneousDeathChance ) {
      this.alive = false
    }

    if (!this.alive) { this.die() }
  }


  die() {
    // Somehow, the World needs to know that there is one less thing.
    // Two choices: update a property here. Or, have the World
    // recompute on each turn. ThinkMore.
    this.location.contents = null
    this.location = null
    this.alive = false
    // I have a bug where sometimes a lifeform has a location of null.
    // At the point I am having that, this is the only place where a
    // lifeform location gets set to null. So, it seems likely that I
    // am not actually correctly handling the death logic. FixMe This
    // needs to be investigated. But, not right now. And, I *think*
    // I've resolved it. I wasn't bailing on the turn if the LifeForm
    // was dead. I'm leaving this comment in place b/c I want to wait
    // on declaring the problem solved until I've not seen it pop up
    // for a while. In code not yet committed
    // (Herbivore._getNeighbours which should be moved to LifeForm) I
    // have a debugger that will go off if it is encountered.
  }


  spawn() {
    if (this.canSpawn()) {
      this._spawn()
    }
  }


  canSpawn() {
    let type = this.constructor
    return (this.size >= type.minSpawnSize &&
            this.turnsSinceSpawnOrGrowth >= type.waitAfterSpawnOrGrowth)
  }


  _getNumChildren() {

    let candidates = [], choice
    let options = this.constructor.spawnOutcomes
    for (let i=0; i<this.size; i++) {
      choice = options[Math.floor(Math.random() * options.length)]
      candidates.push(options[choice])
    }
    return Math.max(...candidates)
  }


  grow() {
    if (this.canGrow()) {
      this._grow()
    }
  }


  canGrow() {
    // Ultimately, there should be more to this (checking for adequate
    // resources and the like). Right now, MVP.
    return (this.size < this.constructor.maxSize &&
            this.turnsSinceSpawnOrGrowth >= this.constructor.waitAfterSpawnOrGrowth)
  }


  _grow() {
    if (Object(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* chance */])() <= this.constructor.growthChance) {
      // Utilimately, there should be more to this (depletion of
      // resources and the like). Right now, MVP.
      this.size++
      this.turnsSinceSpawnOrGrowth = 0
    }
  }
}


/* harmony default export */ __webpack_exports__["a"] = (LifeForm);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lifeform__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(0);




class Plant extends __WEBPACK_IMPORTED_MODULE_0__lifeform__["a" /* default */] {

  constructor(opts) {
    super(opts)
    this.size = 0  // Override superclass; seeds are small
  }


  move(){
    // Here just so the superclass can call for Subclasses that can move.
  }


  die() {
    super.die()
    this.world.plantCount--
  }

  makeNew(loc, world) {
    // This should be DRY wrt the initial populate code FixMe
    world.plant++
    return new Plant({location: loc, world: world})
  }
  
  _spawn() {
    // DAGNABBIT JS OOP has defeated me for now. This is duplicated
    // from Herbivore. FixMe
    if (Object(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* chance */])() <= this.constructor.spawnChance) {

      let numChildren = this._getNumChildren()

      // Ruhoh. Every so often, this gives an error that cannot read
      // location of undefined. WTF FixMe
      let locs = Object(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* randomSample */])(this.location.neighbourhood, numChildren)
      for (let i=0; i<locs.length; i++) {
        if (!locs[i].contents){
          locs[i].contents = this.makeNew(locs[i], this.world)
        }
      }
      this.size--
      this.turnsSinceSpawnOrGrowth = 0
    }
  }
}



Plant.typestring = "plant"
// These are documented a bit in PlantSettings
Plant.growthChance = __WEBPACK_IMPORTED_MODULE_1__config__["b" /* PlantSettings */].growthChance
Plant.maxLifeSpan = __WEBPACK_IMPORTED_MODULE_1__config__["b" /* PlantSettings */].maxLifeSpan
Plant.maxSize = __WEBPACK_IMPORTED_MODULE_1__config__["b" /* PlantSettings */].maxSize
Plant.minSpawnSize = __WEBPACK_IMPORTED_MODULE_1__config__["b" /* PlantSettings */].minSpawnSize
Plant.spawnChance = __WEBPACK_IMPORTED_MODULE_1__config__["b" /* PlantSettings */].spawnChance
Plant.spawnOutcomes = __WEBPACK_IMPORTED_MODULE_1__config__["b" /* PlantSettings */].spawnOutcomes
Plant.spawnOutcomes = __WEBPACK_IMPORTED_MODULE_1__config__["b" /* PlantSettings */].spawnOutcomes
Plant.spontaneousDeathChance = __WEBPACK_IMPORTED_MODULE_1__config__["b" /* PlantSettings */].spontaneousDeathChance
Plant.waitAfterSpawnOrGrowth = __WEBPACK_IMPORTED_MODULE_1__config__["b" /* PlantSettings */].waitAfterSpawnOrGrowth


/* harmony default export */ __webpack_exports__["a"] = (Plant);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(1);





document.addEventListener('DOMContentLoaded', () =>{
  let world = new __WEBPACK_IMPORTED_MODULE_0__world__["a" /* default */](__WEBPACK_IMPORTED_MODULE_2__config__["c" /* WorldSettings */])
  const rootEl = $('.ecosym-world')

  new __WEBPACK_IMPORTED_MODULE_1__view__["a" /* default */](rootEl, world)
})


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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


  tick() {
    if (this.contents) {
      this.contents.tick()
    }
  }
}


/* harmony default export */ __webpack_exports__["a"] = (Cell);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lifeform__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plant__ = __webpack_require__(4);




// Needed chiefly so that a Herbivore instance can recognize a Plant
// instance when it sees one.


class Herbivore extends __WEBPACK_IMPORTED_MODULE_0__lifeform__["a" /* default */] {

  constructor(opts) {
    super(opts)
    this.starting_energy = opts.startingEnergy
    this.energy = opts.startingEnergy
    this.direction = Object(__WEBPACK_IMPORTED_MODULE_2__util__["c" /* randomDirection */])()
  }


  checkStarvation() {
    this.energy--
    if (this.energy < 1) {
      this.energy = this.startingEnergy
      this.size--
    }
    if (this.size < 1) { this.die() }
  }

  move() {
    let target = this._pickTarget()
    if (!target) { return }
    if (target.contents) {
      if (target.contents.constructor.typestring === __WEBPACK_IMPORTED_MODULE_3__plant__["a" /* default */].typestring) {
        this.eat(target.contents)
      }
    }
    this.location.contents = null
    this.location = target
    this.location.contents = this
  }


  eat(prey) {
    this.energy += prey.size
    prey.die()
  }


  _getNeighbours() {
    // This should really be in LifeForm and used in spawning. FixMe
    let neighbours = []
    let neighbourhood = this.location.neighbourhood

    for (let dir in neighbourhood) {
      neighbours.push(neighbourhood[dir])
    }
    return neighbours
  }


  _findPlantNeighbours(neighbours) {
    let candidates = []
    let neighbour

    for (let idx in neighbours) {
      neighbour = neighbours[idx].contents
      if (neighbour && neighbour.constructor.typestring === __WEBPACK_IMPORTED_MODULE_3__plant__["a" /* default */].typestring) {
        // Plants of size 0 are mere spores and too small for Herbivores to see
        if (neighbour.size > 0) {
          candidates.push(neighbour.location)
        }
      }
    }
    return candidates
  }


  _findVacantNeighbours(neighbours) {
    // Method name is a lie. A cell with a Plant of size === 0 is
    // vacant, so far as the Herbivore can tell. FixMe? Naming

    // Also, obviously needs to be DRYed up wrt _findPlantNeighbours

    let candidates = []
    let neighbour
    for (let idx in neighbours) {
      neighbour = neighbours[idx].contents
      if (neighbour === null || neighbour.size === 0) {
        // Any neighbour of size 0 is too small for the Herbivore to see
        candidates.push(neighbours[idx])
      }
    }
    return candidates
  }


  _pickTarget() {

    let target
    let neighbours = this._getNeighbours()
    let candidates = this._findPlantNeighbours(neighbours)

    if (candidates.length) {
      // FixMe Should be smarter. Either greatest density direction or
      // largest adjacent Plant should be picked.
      target = Object(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* randomSample */])(candidates, 1)[0]
    } else {
      candidates = this._findVacantNeighbours(neighbours)

      if (!candidates.length) { return null }

      // Build default target off of direction
      let [dx, dy] = this.direction
      target = this.world.getCell(this.location.x + dx, this.location.y + dy)

      if (!(target && candidates.includes(target))) {
//        debugger
        target = Object(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* randomSample */])(candidates, 1)[0]
      }
    }
    this.reset_direction(target)

    return target
  }


  reset_direction(target) {
    this.direction = [target.x - this.location.x, target.y - this.location.y ]
//    debugger
  }


  die () {
    super.die()
    this.world.herbivoreCount--
  }


  makeNew(loc, world) {
    // This should be DRY wrt the initial populate code FixMe
    world.herbivoreCount++
    return new Herbivore({location: loc, world: world})
  }


  _spawn() {
    // DAGNABBIT JS OOP has defeated me for now. This will be
    // duplicated in Plant. FixMe
    if (Object(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* chance */])() <= this.constructor.spawnChance) {

      let numChildren = this._getNumChildren()

      // Ruhoh. Every so often, this gives an error that cannot read
      // location of undefined. WTF FixMe
      let locs = Object(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* randomSample */])(this.location.neighbourhood, numChildren)
      for (let i=0; i<locs.length; i++) {
        if (!locs[i].contents){
          locs[i].contents = this.makeNew(locs[i], this.world)
        }
      }
      this.size--
      this.turnsSinceSpawnOrGrowth = 0
    }
  }
}


Herbivore.typestring = "herbivore"


// These are documented a bit in HerbivoreSettings
Herbivore.growthChance = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* HerbivoreSettings */].growthChance
Herbivore.maxLifeSpan = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* HerbivoreSettings */].maxLifeSpan
Herbivore.maxSize = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* HerbivoreSettings */].maxSize
Herbivore.minSpawnSize = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* HerbivoreSettings */].minSpawnSize
Herbivore.spawnChance = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* HerbivoreSettings */].spawnChance
Herbivore.spawnOutcomes = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* HerbivoreSettings */].spawnOutcomes
Herbivore.spontaneousDeathChance = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* HerbivoreSettings */].spontaneousDeathChance
Herbivore.waitAfterSpawnOrGrowth = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* HerbivoreSettings */].waitAfterSpawnOrGrowth


/* harmony default export */ __webpack_exports__["a"] = (Herbivore);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Rock {

  getCSSClass() {
    return 'cell rock'
  }

  
  tick() {
    // A non-op method is easier than checking if a cell's content is
    // a rock before ticking the cell.
  }
}


/* harmony default export */ __webpack_exports__["a"] = (Rock);



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(0);




class View {

  constructor($el, world) {
    this.$el = $el

    // I can anticipate confusion and thus a need for renaming. At the
    // moment, the object created by setupWorld (namely, $world) is
    // the view and the value of this.world (a World instance) is the
    // model.
    this.view = this.setupWorld()
    this.world = world

    this.tick()

    // Arrow function because binding.
    let refreshID = window.setInterval(() => {this.tick()},  551)

    // Presently here to stop an infinite blink cycle. That is what is
    // wanted in production.
    window.setTimeout(()=>{clearInterval(refreshID)}, 550000)
  }


  setupWorld() {

    const $world = $("<figure>").addClass("world")

    for (let y=0; y<__WEBPACK_IMPORTED_MODULE_1__config__["c" /* WorldSettings */].height; y++) {
      const $row = $("<ul>").addClass("world-row")
      for (let x=0; x<__WEBPACK_IMPORTED_MODULE_1__config__["c" /* WorldSettings */].width; x++) {
        const $cell = $("<li>").addClass("cell").attr("coords", [x, y])
        $row.append($cell)
      }
      $world.append($row)
    }

    this.$el.append($world)

  }


  tick() {
    // Worried about the async, here. May have to make some promises.
    this.world.tick()

    this.repaint()
  }


  repaint() {

    // Do the stupid thing which is also the simplest thing that could
    // possibly work. Various optimizations are possible. Presently,
    // optimizing for programmer time.

    // The most likely big optimization win would be for the World to
    // maintain a list of cells that changed in a round and then to
    // set classes only for those cells.
    let x, y
    let world = this.world
    $(".world li").each(function(i) {
      [x,y] = Object(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* getCoordsAsNumbers */])($(this).attr('coords'))
      let cell = world.getCell(x,y)

      // Here is one possible optimization. As it stands, with this
      // code, we will often remove one or more classes just to put
      // them back on. It isn't clear if the testing before change
      // would be quicker. Probably not worth testing as my other main
      // optimization idea would make this moot.
      $(this).removeClass()
      $(this).addClass(cell.getCSSClass())
    })
  }
}


/* harmony default export */ __webpack_exports__["a"] = (View);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map