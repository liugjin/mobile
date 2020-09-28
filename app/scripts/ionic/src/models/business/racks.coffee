###
* File: racks
* User: Dow
* Date: 4/26/2016
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./equipments-model', './rack'], (base, r) ->
  class Racks extends base.EquipmentsModel
    constructor: (parent, options) ->
      super parent, options

    createItem: (model) ->
      item = new r.Rack @, model


  exports =
    Racks: Racks
