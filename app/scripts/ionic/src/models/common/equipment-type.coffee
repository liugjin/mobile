###
* File: equipment-type
* User: Dow
* Date: 11/8/2016
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../view-model'], (base) ->
  class EquipmentType extends base.ViewModel
    constructor: (parent, model) ->
      super parent, model


  exports =
    EquipmentType: EquipmentType
