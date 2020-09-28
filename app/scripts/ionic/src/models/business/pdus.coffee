###
* File: servers
* User: Dow
* Date: 4/26/2016
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./equipments-model', './pdu'], (base, p) ->
  class Pdus extends base.EquipmentsModel
    constructor: (parent, options) ->
      super parent, options

    createItem: (model) ->
      item = new p.Pdu @, model


  exports =
    Pdus: Pdus
