###
* File: pdu
* User: Dow
* Date: 4/7/2016
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./equipment-model'], (base) ->
  class Pdu extends base.EquipmentModel
    constructor: (parent, model) ->
      super parent, model


  exports =
    Pdu: Pdu
