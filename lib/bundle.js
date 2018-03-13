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

// Ultimately, some of the following settings will be filled out from
// the GUI. Hardcoded for now. It probably will end up that the Config
// settings stay in place as defaults on app load.

const WorldSettings = {
  width: 52,
  height: 52,
  rockPercentage: 0,
  lifePercentage: 100,
  // Don't like the naming. herbivorePercentage and plantPercentage
  // are the percentages each has of the total number of life cells,
  // those dictated by lifePercentage.
  herbivorePercentage: 3,
  plantPercentage: 97
}
/* harmony export (immutable) */ __webpack_exports__["d"] = WorldSettings;


const HerbivoreSettings = {

  growthChance: 30,          // The change of growing in a given turn
  spawnChance: 23,           // The change of spawning in a given turn
  spontaneousDeathChance: 2,
  maxLifeSpan: 60,           // Expected Herbivore life span. (There
                             // is a fudge factor applied to avoid
                             // mass die-offs all at once.

  // Possible numbers of spores to spawn; duplication allows
  // Math.random to be used simply.
  spawnOutcomes: [1,1,1,2,2,2,3],
  minSpawnSize: 3,           // Smallest size of Herbivore that can spawn

  // Delay in turns after growing or spawning before elligible to do so, again
  waitAfterSpawnOrGrowth: 9,
  maxSize: 5,
  startingEnergy: 10,

}
/* harmony export (immutable) */ __webpack_exports__["b"] = HerbivoreSettings;


const PlantSettings = {

  growthChance: 30,          // The change of growing in a given turn
  spawnChance: 25,           // The change of spawning in a given turn
  spontaneousDeathChance: 1,
  maxLifeSpan: 150,          // Expected Herbivore life span. (There
                             // is a fudge factor applied to avoid
                             // mass die-offs all at once.

  // Possible numbers of spores to spawn; duplication allows
  // Math.random to be used simply.
  spawnOutcomes: [1,2,2,2,3,3,4],
  minSpawnSize: 2,           // Smallest size of Plant that can spawn

  // Delay in turns after growing or spawning before elligible to do so, again
  waitAfterSpawnOrGrowth: 5,
  maxSize: 5
}
/* harmony export (immutable) */ __webpack_exports__["c"] = PlantSettings;



const Config = {
  herb: HerbivoreSettings,
  plant: PlantSettings,
  world: WorldSettings
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Config;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const chance = function percentageChance() {
  return Math.floor(Math.random() * 100) + 1
}
/* harmony export (immutable) */ __webpack_exports__["a"] = chance;



const shuffleValues = function shuffleValues(obj) {
  let tmp, idx, shuffled = Object.values(obj)
  let i = shuffled.length
  
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

let dx, dy, offsets = []
for (dx=-1; dx<2; dx++) {
  for (dy=-1; dy<2; dy++) {
    if (dx * dy) { offsets.push([dx,dy]) }
  }
}

const randomDirection = function randomDirection() {
  return randomElement(offsets)
}
/* harmony export (immutable) */ __webpack_exports__["c"] = randomDirection;



const valPlusMinus = function valPlusMinus(value, range) {
  let i, fudgeFactors = []
  for (i=-range; i<range+1; i++) { fudgeFactors.push(i) }
  return value + randomElement(fudgeFactors)
}
/* harmony export (immutable) */ __webpack_exports__["f"] = valPlusMinus;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cell__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__herbivore__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__plant__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rock__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util__ = __webpack_require__(1);







class World {

  constructor(opts, Config) {
    this.config = Config
    this.width = opts.width
    this.height = opts.height
    this.rockPercentage = this.config.world.rockPercentage
    this.lifePercentage = this.config.world.lifePercentage
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
        this.grid[[x,y]] = new __WEBPACK_IMPORTED_MODULE_0__cell__["a" /* default */]({x, y})
      }
    }
  }


  populateWorld() {
    let cell, cells = Object(__WEBPACK_IMPORTED_MODULE_4__util__["e" /* shuffleValues */])(this.grid)
    const rockCount = Math.floor(
      cells.length * (this.rockPercentage /100 ))

    for (let i=0; i<rockCount; i++) {
      cell = cells.pop()
      this.rockCount++
      cell.contents = __WEBPACK_IMPORTED_MODULE_3__rock__["a" /* default */]
    }

    let livingCellCount = Math.floor(
      Object.values(this.grid).length * this.lifePercentage / 100)

    this.populateWithLife(cells.slice(0, livingCellCount))
  }


  setNeighbourhoods() {

    let cell, cords, dx, dy, x, y, cand, grid = this.grid

    for (cords in grid) {
      [x,y] = Object(__WEBPACK_IMPORTED_MODULE_4__util__["b" /* getCoordsAsNumbers */])(cords)

      cell = grid[cords]
      if (cell.contents == __WEBPACK_IMPORTED_MODULE_3__rock__["a" /* default */]) {
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
          if (cand.contents == __WEBPACK_IMPORTED_MODULE_3__rock__["a" /* default */]) { continue }

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
      cell.contents = new __WEBPACK_IMPORTED_MODULE_1__herbivore__["a" /* default */]({location: cell, last_move: this.turn,
                                     world: this}, this.config)
    }

    while (cells.length) {
      cell = cells.pop()
      this.plantCount++
      cell.contents = new __WEBPACK_IMPORTED_MODULE_2__plant__["a" /* default */]({location: cell, last_move: this.turn,
                                 world:this}, this.config)
      cell.contents.size = 1
    }
  }


  tick() {
    let cell, coords, contents, dirty
    let dirty_cells = []
    this.turn++
    for (coords in this.grid) {
      cell = this.getCell(...Object(__WEBPACK_IMPORTED_MODULE_4__util__["b" /* getCoordsAsNumbers */])(coords))
      let dirty = cell.tick(this.turn)
      if (dirty) { dirty_cells.push(...dirty) }
    }
    return dirty_cells
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);



class LifeForm {

  constructor(opts, Config) {
    this.config = Config
    this.location = opts.location
    this.world = opts.world
    this.age = 0
    this.alive = true
    this.turnsSinceSpawnOrGrowth = 0
    this.size = 1
    this.lifeSpan = Object(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* valPlusMinus */])(this.constructor.maxLifeSpan, 5)
    this.dirty = true   // Don't think needed. Figure Out. FixMe
    this.dirty_cells = []
  }


  getCSSClass() {
    return `cell ${this.constructor.typestring}-${this.size}`
  }


  tick(turn) {
    if (turn == this.last_move) {
      // Occurs when something was spawned or moved into a cell that
      // hasn't yet had its move
      return [this.location]
    }
    this.last_move = turn
    this.dirty_cells = []
    this.dirty = false

    this.turnsSinceSpawnOrGrowth++
    this.age++
    this.checkDeath()
    if (!this.alive) { return this.dirty_cells }
    this.move()    // move, then starvation check; maybe moved into resources
    this.checkStarvation()
    this.spawn()
    this.grow()
    if (this.dirty && !this.dirty_cells.includes(this.location)) {
      this.dirty_cells.push(this.location)
    }
    return this.dirty_cells
  }


  checkDeath() {
    if (this.age > this.lifeSpan) {
      this.alive = false
    } else if (Object(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* chance */])() <
               this.spontaneousDeathChance ) {
      this.alive = false
    }

    if (!this.alive) { this.die() }
  }


  die() {
    this.location.contents = null
    this.dirty_cells.push(this.location)
    this.location = null
    this.alive = false

    // Not really needed as the !this.alive check returns
    // this.dirty_cells bypassing the this.dirty. But, safety vs reorg
    this.dirty = true
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

    let i, choice, candidates = []
    let options = this.constructor.spawnOutcomes
    for (i=0; i<this.size; i++) {
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
    if (Object(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* chance */])() <= this.growthChance) {
      // Utilimately, there should be more to this (depletion of
      // resources and the like). Right now, MVP.
      this.size++
      this.turnsSinceSpawnOrGrowth = 0
      this.dirty = true
    }
  }

  // Stub that do nothing but that exist so that some, but not
  // necessarily all,subclasses can override.
  checkStarvation() {}
  move(){}
}

/* harmony default export */ __webpack_exports__["a"] = (LifeForm);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lifeform__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(1);




class Plant extends __WEBPACK_IMPORTED_MODULE_0__lifeform__["a" /* default */] {

  constructor(opts, Config) {
    super(opts, Config)
    this.size = 0  // Override superclass; seeds are small
    this.lifeSpan = Object(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* valPlusMinus */])(this.config.plant.maxLifeSpan, 5)
    this.growthChance = this.config.plant.growthChance
    this.spawnChance = this.config.plant.spawnChance
    this.spontaneousDeathChance = this.config.plant.spontaneousDeathChance
  }


  die() {
    super.die()
    this.world.plantCount--
  }

  makeNew(loc, world) {
    // This should be DRY wrt the initial populate code FixMe
    world.plant++
    return new Plant({location: loc, world: world}, this.config)
  }

  _spawn() {
    // DAGNABBIT JS OOP has defeated me for now. This is duplicated
    // from Herbivore. FixMe

    if (Object(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* chance */])() <= this.spawnChance) {

      let i, numChildren = this._getNumChildren()
      let locs = Object(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* randomSample */])(this.location.neighbourhood, numChildren)

      for (i=0; i<locs.length; i++) {
        if (!locs[i].contents){
          locs[i].contents = this.makeNew(locs[i], this.world)
          this.dirty_cells.push(locs[i])
        }
      }
      this.size--
      this.turnsSinceSpawnOrGrowth = 0
      this.dirty = true
    }
  }
}



Plant.typestring = "plant"
// These are documented a bit in PlantSettings
Plant.maxLifeSpan = __WEBPACK_IMPORTED_MODULE_1__config__["c" /* PlantSettings */].maxLifeSpan
Plant.maxSize = __WEBPACK_IMPORTED_MODULE_1__config__["c" /* PlantSettings */].maxSize
Plant.minSpawnSize = __WEBPACK_IMPORTED_MODULE_1__config__["c" /* PlantSettings */].minSpawnSize
Plant.spawnOutcomes = __WEBPACK_IMPORTED_MODULE_1__config__["c" /* PlantSettings */].spawnOutcomes
Plant.waitAfterSpawnOrGrowth = __WEBPACK_IMPORTED_MODULE_1__config__["c" /* PlantSettings */].waitAfterSpawnOrGrowth


/* harmony default export */ __webpack_exports__["a"] = (Plant);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(0);






document.addEventListener('DOMContentLoaded', () =>{

  let resetButton = document.getElementById('worldResetter')
  resetButton.addEventListener("click", () => {
    worldMaker(view, __WEBPACK_IMPORTED_MODULE_2__config__["d" /* WorldSettings */], __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */])
  })


  // World Settings Sliders

  // Rock and life percentage are tied together in that they cannot
  // sum to more than 100.
  let RockPercentageSlider = document.getElementById('rock-percentage-slide')
  let RockPercentageOutput = document.getElementById('rock-percentage-output')
  let LifePercentageSlider = document.getElementById('life-percentage-slide')
  let LifePercentageOutput = document.getElementById('life-percentage-output')

  RockPercentageSlider.value = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].world.rockPercentage
  RockPercentageOutput.innerHTML = RockPercentageSlider.value

  RockPercentageSlider.oninput = function () {

    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].world.rockPercentage = Number(this.value)

    let lifePer = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].world.lifePercentage

    if ((lifePer + __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].world.rockPercentage) > 100) {
      LifePercentageSlider.value = (100 - __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].world.rockPercentage)
      LifePercentageOutput.innerHTML = LifePercentageSlider.value
      __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].world.lifePercentage = Number(LifePercentageSlider.value)
    }

    RockPercentageOutput.innerHTML = this.value
  }


  LifePercentageSlider.value = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].world.lifePercentage
  LifePercentageOutput.innerHTML = LifePercentageSlider.value

  LifePercentageSlider.oninput = function () {

    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].world.lifePercentage = Number(this.value)

    let rockPer = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].world.rockPercentage

    if ((rockPer + __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].world.lifePercentage) > 100) {
      RockPercentageSlider.value = (100 - __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].world.lifePercentage)
      RockPercentageOutput.innerHTML = RockPercentageSlider.value
      __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].world.rockPercentage = Number(RockPercentageSlider.value)
    }

    LifePercentageOutput.innerHTML = this.value
  }


  // Herbivore and Plant percentages are tied together in that they must sum to 100. It

  let HerbivorePercentageSlider = document.getElementById('herb-percentage-slide')
  let HerbivorePercentageOutput = document.getElementById('herb-percentage-output')
  let PlantPercentageSlider = document.getElementById('plant-percentage-slide')
  let PlantPercentageOutput = document.getElementById('plant-percentage-output')


  HerbivorePercentageSlider.value = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].world.herbivorePercentage
  HerbivorePercentageOutput.innerHTML = HerbivorePercentageSlider.value

  HerbivorePercentageSlider.oninput = function () {

    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].world.herbivorePercentage = Number(this.value)

    let plantPer = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].world.plantPercentage

    if ((plantPer + __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].world.herbivorePercentage) != 100) {
      PlantPercentageSlider.value = (100 - __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].world.herbivorePercentage)
      PlantPercentageOutput.innerHTML = PlantPercentageSlider.value
      __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].world.plantPercentage = Number(PlantPercentageSlider.value)
    }

    HerbivorePercentageOutput.innerHTML = this.value
  }


  PlantPercentageSlider.value = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].world.plantPercentage
  PlantPercentageOutput.innerHTML = PlantPercentageSlider.value

  PlantPercentageSlider.oninput = function () {

    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].world.plantPercentage = Number(this.value)

    let herbPer = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].world.herbivorePercentage

    if ((herbPer + __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].world.plantPercentage) != 100) {
      HerbivorePercentageSlider.value = (100 - __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].world.plantPercentage)
      HerbivorePercentageOutput.innerHTML = HerbivorePercentageSlider.value
      __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].world.herbivorePercentage = Number(HerbivorePercentageSlider.value)
    }

    PlantPercentageOutput.innerHTML = this.value
  }



  // Herbivore Settings Sliders

  let HerbivoreLifeSpanSlider = document.getElementById('herb-lifespan-slide')
  let HerbivoreLifeSpanOutput = document.getElementById("herb-lifespan-output")
  HerbivoreLifeSpanSlider.value = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].herb.maxLifeSpan
  HerbivoreLifeSpanOutput.innerHTML = HerbivoreLifeSpanSlider.value

  HerbivoreLifeSpanSlider.oninput = function () {
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].herb.maxLifeSpan = Number(this.value)
    HerbivoreLifeSpanOutput.innerHTML = this.value
  }


  let HerbivoreDeathChanceSlider = document.getElementById(
    'herb-deathchance-slide')
  let HerbivoreDeathChanceOutput = document.getElementById(
    "herb-deathchance-output")
  HerbivoreDeathChanceSlider.value = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].herb.spontaneousDeathChance
  HerbivoreDeathChanceOutput.innerHTML = HerbivoreDeathChanceSlider.value

  HerbivoreDeathChanceSlider.oninput = function () {
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].herb.spontaneousDeathChance = Number(this.value)
    HerbivoreDeathChanceOutput.innerHTML = this.value
  }


  let HerbivoreGrowthChanceSlider = document.getElementById(
    'herb-growthchance-slide')
  let HerbivoreGrowthChanceOutput = document.getElementById(
    "herb-growthchance-output")
  HerbivoreGrowthChanceSlider.value = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].herb.growthChance
  HerbivoreGrowthChanceOutput.innerHTML = HerbivoreGrowthChanceSlider.value

  HerbivoreGrowthChanceSlider.oninput = function () {
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].herb.growthChance = Number(this.value)
    HerbivoreGrowthChanceOutput.innerHTML = this.value
  }


  let HerbivoreSpawnChanceSlider = document.getElementById(
    'herb-spawnchance-slide')
  let HerbivoreSpawnChanceOutput = document.getElementById(
    "herb-spawnchance-output")
  HerbivoreSpawnChanceSlider.value = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].herb.spawnChance
  HerbivoreSpawnChanceOutput.innerHTML = HerbivoreSpawnChanceSlider.value

  HerbivoreSpawnChanceSlider.oninput = function () {
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].herb.spawnChance = Number(this.value)
    HerbivoreSpawnChanceOutput.innerHTML = this.value
  }


  let HerbivoreSGDelaySlider = document.getElementById(
    'herb-sgdelay-slide')
  let HerbivoreSGDelayOutput = document.getElementById(
    "herb-sgdelay-output")
  HerbivoreSGDelaySlider.value = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].herb.waitAfterSpawnOrGrowth
  HerbivoreSGDelayOutput.innerHTML = HerbivoreSGDelaySlider.value

  HerbivoreSGDelaySlider.oninput = function () {
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].herb.waitAfterSpawnOrGrowth = Number(this.value)
    HerbivoreSGDelayOutput.innerHTML = this.value
  }



  // Plant Settings Sliders


  let PlantLifeSpanSlider = document.getElementById('plant-lifespan-slide')
  let PlantLifeSpanOutput = document.getElementById("plant-lifespan-output")
  PlantLifeSpanSlider.value = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].plant.maxLifeSpan
  PlantLifeSpanOutput.innerHTML = PlantLifeSpanSlider.value

  PlantLifeSpanSlider.oninput = function () {
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].plant.maxLifeSpan = Number(this.value)
    PlantLifeSpanOutput.innerHTML = this.value
  }


  let PlantDeathChanceSlider = document.getElementById('plant-deathchance-slide')
  let PlantDeathChanceOutput = document.getElementById("plant-deathchance-output")
  PlantDeathChanceSlider.value = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].plant.spontaneousDeathChance
  PlantDeathChanceOutput.innerHTML = PlantDeathChanceSlider.value

  PlantDeathChanceSlider.oninput = function () {
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].plant.spontaneousDeathChance = Number(this.value)
    PlantDeathChanceOutput.innerHTML = this.value
  }


  let PlantGrowthChanceSlider = document.getElementById(
    'plant-growthchance-slide')
  let PlantGrowthChanceOutput = document.getElementById(
    "plant-growthchance-output")
  PlantGrowthChanceSlider.value = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].plant.growthChance
  PlantGrowthChanceOutput.innerHTML = PlantGrowthChanceSlider.value

  PlantGrowthChanceSlider.oninput = function () {
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].plant.growthChance = Number(this.value)
    PlantGrowthChanceOutput.innerHTML = this.value
  }


  let PlantSpawnChanceSlider = document.getElementById(
    'plant-spawnchance-slide')
  let PlantSpawnChanceOutput = document.getElementById(
    "plant-spawnchance-output")
  PlantSpawnChanceSlider.value = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].plant.spawnChance
  PlantSpawnChanceOutput.innerHTML = PlantSpawnChanceSlider.value

  PlantSpawnChanceSlider.oninput = function () {
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].plant.spawnChance = Number(this.value)
    PlantSpawnChanceOutput.innerHTML = this.value
  }


  let PlantSGDelaySlider = document.getElementById(
    'plant-sgdelay-slide')
  let PlantSGDelayOutput = document.getElementById(
    "plant-sgdelay-output")
  PlantSGDelaySlider.value = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].plant.waitAfterSpawnOrGrowth
  PlantSGDelayOutput.innerHTML = PlantSGDelaySlider.value

  PlantSGDelaySlider.oninput = function () {
    __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].plant.waitAfterSpawnOrGrowth = Number(this.value)
    PlantSGDelayOutput.innerHTML = this.value
  }


  let legendModal = document.getElementById('legendModalContainer')
  let legendModalButton = document.getElementById('legendModalBtn')
  let legendCloseSpan = document.getElementById('legendModalClose')

  legendModalButton.onclick = function() {
    legendModal.style.display = "block"
  }

  legendCloseSpan.onclick = function() {legendModal.style.display = "none"}

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == legendModal) {
      legendModal.style.display = "none";
    }
  }


  let world = new __WEBPACK_IMPORTED_MODULE_0__world__["a" /* default */](__WEBPACK_IMPORTED_MODULE_2__config__["d" /* WorldSettings */], __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */])
  const rootEl = $('.ecosym-world')

  let view = new __WEBPACK_IMPORTED_MODULE_1__view__["a" /* default */](rootEl, world)


})


let worldMaker = function worldMaker(view, wSettings, Config) {
  view.inaugurateWorld(new __WEBPACK_IMPORTED_MODULE_0__world__["a" /* default */](wSettings, Config))
}


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


  tick(turn) {
    if (this.contents) { return this.contents.tick(turn) }
    return []
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Cell);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lifeform__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plant__ = __webpack_require__(4);






class Herbivore extends __WEBPACK_IMPORTED_MODULE_0__lifeform__["a" /* default */] {

  constructor(opts, Config) {
    super(opts, Config)
    this.lifeSpan = Object(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* valPlusMinus */])(this.config.herb.maxLifeSpan, 5)
    this.growthChance = this.config.herb.growthChance
    this.spawnChance = this.config.herb.spawnChance
    this.spontaneousDeathChance = this.config.herb.spontaneousDeathChance
    this.starting_energy = __WEBPACK_IMPORTED_MODULE_1__config__["b" /* HerbivoreSettings */].startingEnergy
    this.energy = __WEBPACK_IMPORTED_MODULE_1__config__["b" /* HerbivoreSettings */].startingEnergy
    this.direction = Object(__WEBPACK_IMPORTED_MODULE_2__util__["c" /* randomDirection */])()
  }

  checkStarvation() {
    this.energy--
    if (this.energy < 1 && this.size > 1) {
      this.energy = this.startingEnergy
      this.size--
      this.dirty = true
    }
    if (this.size < 1 && this.energy < -10) { this.die() }
  }


  move() {
    let target = this._pickTarget()
    if (!target) { return }
    if (target.contents) {
      if (target.contents.constructor.typestring === __WEBPACK_IMPORTED_MODULE_3__plant__["a" /* default */].typestring) {
        this.eat(target.contents)
      }
    }
    this.dirty_cells = this.dirty_cells.concat([this.location, target])
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
    let dir, neighbours = []
    let neighbourhood = this.location.neighbourhood

    // Actually, why is this computing as opposed to just yeilding up
    // the neighbours? FixMe
    for (dir in neighbourhood) {
      neighbours.push(neighbourhood[dir])
    }
    return neighbours
  }


  _findPlantNeighbours(neighbours) {
    let idx, neighbour, candidates = []

    for (idx in neighbours) {
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

    let idx, neighbour, candidates = []

    for (idx in neighbours) {
      neighbour = neighbours[idx].contents
      if (neighbour === null || neighbour.size === 0) {
        // Any neighbour of size 0 is too small for the Herbivore to see
        candidates.push(neighbours[idx])
      }
    }
    return candidates
  }


  _pickTarget() {

    let dx, dy, target, neighbours = this._getNeighbours()
    let candidates = this._findPlantNeighbours(neighbours)

    if (candidates.length) {
      // FixMe Should be smarter. Either greatest density direction or
      // largest adjacent Plant should be picked.
      target = Object(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* randomSample */])(candidates, 1)[0]
    } else {
      candidates = this._findVacantNeighbours(neighbours)

      if (!candidates.length) { return null }

      // Build default target off of direction
      [dx, dy] = this.direction
      target = this.world.getCell(this.location.x + dx, this.location.y + dy)

      if (!(target && candidates.includes(target))) {
        target = Object(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* randomSample */])(candidates, 1)[0]
      }
    }
    this.reset_direction(target)

    return target
  }


  reset_direction(target) {
    this.direction = [target.x - this.location.x, target.y - this.location.y ]
  }


  die () {
    super.die()
    this.world.herbivoreCount--
  }


  makeNew(loc, world) {
    // This should be DRY wrt the initial populate code FixMe
    world.herbivoreCount++
    return new Herbivore({location: loc, world: world}, this.config)
  }


  _spawn() {
    // DAGNABBIT JS OOP has defeated me for now. This will be
    // duplicated in Plant. FixMe
    if (Object(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* chance */])() <= this.spawnChance) {

      let i, numChildren = this._getNumChildren()
      let locs = Object(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* randomSample */])(this.location.neighbourhood, numChildren)

      for (i=0; i<locs.length; i++) {
        if (!locs[i].contents){
          this.dirty_cells.push(locs[i])
          locs[i].contents = this.makeNew(locs[i], this.world)
        }
      }
      this.size--
      this.dirty = true
      this.turnsSinceSpawnOrGrowth = 0
    }
  }
}


Herbivore.typestring = "herbivore"


// These are documented a bit in HerbivoreSettings
Herbivore.maxLifeSpan = __WEBPACK_IMPORTED_MODULE_1__config__["b" /* HerbivoreSettings */].maxLifeSpan
Herbivore.maxSize = __WEBPACK_IMPORTED_MODULE_1__config__["b" /* HerbivoreSettings */].maxSize
Herbivore.minSpawnSize = __WEBPACK_IMPORTED_MODULE_1__config__["b" /* HerbivoreSettings */].minSpawnSize
Herbivore.spawnOutcomes = __WEBPACK_IMPORTED_MODULE_1__config__["b" /* HerbivoreSettings */].spawnOutcomes
Herbivore.waitAfterSpawnOrGrowth = __WEBPACK_IMPORTED_MODULE_1__config__["b" /* HerbivoreSettings */].waitAfterSpawnOrGrowth


/* harmony default export */ __webpack_exports__["a"] = (Herbivore);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Rock {

  getCSSClass() {
    return 'cell rock'
  }

  // Easier than if-testing for Rock as Cell.contents before calling Cell.tick
  tick(turn) { return [] }
}

const ROCK = new Rock()

/* harmony default export */ __webpack_exports__["a"] = (ROCK);



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__world__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(1);




class View {

  constructor($el, world) {
    this.$el = $el

    // I can anticipate confusion and thus a need for renaming. At the
    // moment, the object created by setupWorld (namely, $world) is
    // the view and the value of this.world (a World instance) is the
    // model.

    this.inaugurateWorld(world)

//    this.tick()

    // Arrow function because binding.
    let refreshID = window.setInterval(() => {this.tick()},  100)

    // Presently here to stop an infinite blink cycle. That is what is
    // wanted in production.
    window.setTimeout(()=>{clearInterval(refreshID)}, 600810)
  }


  inaugurateWorld(world) {
    this.world = world
    this.setupWorld()
  }

  setupWorld() {
    this.$el.html('')
    const $world = $("<figure>").addClass("world")
    let css_class, x, y

    for (y=0; y<__WEBPACK_IMPORTED_MODULE_1__config__["d" /* WorldSettings */].height; y++) {
      const $row = $("<ul>").addClass("world-row")
      for (x=0; x<__WEBPACK_IMPORTED_MODULE_1__config__["d" /* WorldSettings */].width; x++) {
        css_class = this.world.getCell(x,y).getCSSClass()
        const $cell = $("<li>").addClass(css_class).attr("coords", [x, y])
        $row.append($cell)
      }
      $world.append($row)
    }

    this.$el.append($world)

  }


  tick() {
    let dirty_cells = this.world.tick()
    this.repaint(dirty_cells)
  }


  repaint(dirty_cells) {
    let x, y, cell, world = this.world

    // $(".world li").each(function(i) {
    //   [x,y] = getCoordsAsNumbers($(this).attr('coords'))
    //   cell = world.getCell(x,y)

    //   $(this).removeClass()
    //   $(this).addClass(cell.getCSSClass())
    // })
    let node
    if (!dirty_cells) { return }
    dirty_cells.forEach( (cell) => {
      node = document.querySelector(`[coords="${cell.x},${cell.y}"]`)
      node.removeAttribute("class")
      node.className = cell.getCSSClass()
    })
  }
}


/* harmony default export */ __webpack_exports__["a"] = (View);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map