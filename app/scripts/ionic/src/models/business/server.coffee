###
* File: server
* User: Dow
* Date: 4/7/2016
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./equipment-model'], (base) ->
  class Server extends base.EquipmentModel
    constructor: (parent, model) ->
      super parent, model

    initialize: (callback) ->
      super callback

      @capacity =
        space: 1
        power: 0.1
        cooling: 0.1
        weight: 10
        ports: 1

    addToRack: (rack, row, callback) ->
      return callback? 'null rack' if not rack or not row? or row < 0

      @model.parent = rack.model.equipment
      @setPropertyValue 'row', row

      @update (err, model) =>
        rack.addServer @ if not err

        callback? err, model

    removeFromRack: (rack, callback) ->
      return callback? 'null rack' if not rack

      # don't use null because of get-changing may ignore null value
      @model.parent = ''
      # server row is -1 by default, use -2 to represent removing
#      @setPropertyValue 'row', -2

      key = @key
      @update (err, model) =>
        rack.removeServer key if not err

        callback? err, model

    loadProperties: (fields, callback, refresh) ->
      super fields, (err, model) =>
        capacity = @capacity ?= {}
        capacity.space = @getPropertyValue 'space', 1
        capacity.power = @getPropertyValue 'power', 0.1
        capacity.cooling = @getPropertyValue 'cooling', 0.1
        capacity.weight = @getPropertyValue 'weight', 10
        capacity.ports = @getPropertyValue 'space', 1

        callback? err, model
      , refresh


  exports =
    Server: Server
