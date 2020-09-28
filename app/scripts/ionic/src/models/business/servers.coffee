###
* File: servers
* User: Dow
* Date: 4/26/2016
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./equipments-model', './server'], (base, s) ->
  class Servers extends base.EquipmentsModel
    constructor: (parent, options) ->
      super parent, options

    createItem: (model) ->
      item = new s.Server @, model


  exports =
    Servers: Servers
