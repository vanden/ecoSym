const Config = require("./config")
const World = require("./world")
const View = require("./view")


$(function () {
  const rootEl = $('.ecosym-world')
  new View(rootEl)
})
