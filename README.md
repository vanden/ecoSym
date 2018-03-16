# ecoSym - A 2D cellular ecosystem simulation

Live version: [ecoSym](https://vanden.github.io/ecoSym/)


## Introduction

ecoSym is a two dimension ecosystem simulation. A cellular grid forms
the world and cells can be populated with various plants, herbivores and
obstacles. Cells may also be blank.

Plants and herbivores have various parameters governing their life
cycle, such as growth rate, spawning frequency, and probability of
successful spawning. They are represented by coloured squares, green for
plants and red for herbivores. The squares take on darker shades for
larger (or older) life forms.

The user is able to alter the various parameters of the ecosystem,
restart the world and watch the impact of their changes on how the world
the world unfolds. The hope was that one or more combinations of
parameters will exist that give rise to a long-term stable ecosystem. As
yet, such a combination has not been found. It its way, that is also
instructive.


## Architecture and Technologies

ecoSym is implemented with:
* A Model and View architecture
* The Model is implemenVanilla JavaScript.
* The View is accomplished with HTML and CSS for rendering the playing
field with (mostly) Vanilla JavaScript to effect the CSS updates.
* jQuery is used in a couple of places; this will be eliminated.
* webpack to bundle and serve the various scripts


There are several scripts involved in this project, including:

* `lifeform.js`: Provides BaseClass logic common to Plants and
  Herbivores.
* `plant.js`: Provide a Plant class wherein all Plant-specific
  logic is be defined
* `herbivore.js`: Provides a Herbivore class wherein all Herbivore-specific
  logic is be defined
* `world.js`: Handles creating and updating the two dimensional grid
  world
* `cell.js`: Provide a class for the cells of the grid world. These
  cells will store their co-ordinates, immediate neighbours, and
  contents. Storing the immediate neighbours will allow these
  relationships to be computed a single time and the LifeForms in the
  cell will be able to use that information.


## Future Directions

* Additional parameters and attributes may be added to plants and
herbivores.
* A more interesting, but more involved addition would be carnivores.
* At present, Herbivores need to consume Plants, lest they starve.
Plants could themselves be made dependent upon Herbivores for fertilizer.
