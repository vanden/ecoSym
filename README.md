# ecoSym - A 2D cellular ecosystem simulation

## Introduction

ecoSym is a two dimension ecosystem simulation. A cellular grid forms
the world and cells can be populated with various entities. The initial
MVP version will have plants, herbivores and obstacles. Cells may also
be blank.

Plants and herbivores will have various parameters governing their life
cycle, such as growth rate, spawning frequency, and probability of
successful spawning. In the initial MVP version, they will be
represented by coloured squares, green for plants and red for
herbivores. The squares will take on darker shades for larger (or older)
life forms.

The user will be able to alter the various parameters of the ecosystem
and the refresh rate and thus be able to watch the world unfold. It is
hoped that one or more combinations of parameters will exist that give
rise to a long-term stable ecosystem.

## Functionality for MVP

All cell types (barrier, plant, and herbivore) will have an initial
percentage of the playing field that they populate randomly.

Cells that are not barriers will have an amount of fertilizer present.
Herbivores, as they move about, will replenish cells with fertilizer.
Plants will consume fertilizer on a cell over time.

Both plants and herbivores will have parameters and attributes such as
* Size
* Age
* Minimum size for spawning
* Probability of a successful spawn
* Number of spores per spawn
* Minimum duration between spawns
* Probability of growth
* Probability of death as a function of age

Plants will be stationary and have parameters and attributes such as
* Distance away that spores spawn
* Sensitivity to crowding
* Requirements for fertilizer


Herbivores will be mobile and have parameters and attributes such as
* Starvation rate
* Fertilizer production rate

To an extent, the parameters that will be included cannot presently be
nailed down; this will require some experimentation to find an
interesting set of parameters.

## Architecture and Technologies

The project will be implemented with:
* Vanilla JavaScript for the game logic
* `HTML5 Canvas` for rendering the play field.
* webpack to bundle and serve the various scripts
* As yet unknown technology will be used to present the controls

There will be several scripts involved in this project:

* `lifeform.js`: Will provide BaseClass logic common to Plants and
  Herbivores
* `plant.js`: Will provide a Plant class wherein all Plant-specific
  logic will be defined
* `herbivore.js`: Will provide a Herbivore class wherein all Herbivore-specific
  logic will be defined  
* `world.js`: Will handle creating and updating the two dimensional grid
  world


## Implementation Timeline

### Weekend 

- [x] Review Canvas Tutorials.
- [x] Review Asteroids project.
- [x] Get a minimal `webpack.config.js` and `package.json` written for the
      build process.
- [ ] Start on writing `lifeforms.js`.      

### Day 1
Write enough of `world.js` to get the ecosystem grid painted to the screen with a `Canvas` element.
### Day 2
Get the ecosystem grid world updating from turn to turn
- [ ] Write enough of `lifeform.js`, `plant.js`, and `herbivore.js` to
      have the various entities able to update from turn to turn.
- [ ] Write enough of `world.js` to administer the world updates and
      paint them to the `Canvas element`.

### Day 3
- [ ] Explore the effects of various settings of the parameters to
     ensure that there is interesting enough behaviour manifest.
- [ ] Add or tweak the various parameters as needed.
- [ ] Research how to implement user controls for the parameters. 
### Day 4
- [ ] Implement user controls for the parameters.

## Bonus features

* Additional parameters and attributes may be added to plants and
herbivores.
* More interesting would be to add carnivores.
* The user could manually seed the ecosystem, choosing the locations of
the various entities in the grid.
