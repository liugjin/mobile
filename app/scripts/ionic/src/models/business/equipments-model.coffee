###
* File: equipments-model
* User: Dow
* Date: 4/27/2016
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`


define ['../common/equipments'], (base, r) ->
  class EquipmentsModel extends base.Equipments
    constructor: (parent, options) ->
      super parent, options


  exports =
    EquipmentsModel: EquipmentsModel
