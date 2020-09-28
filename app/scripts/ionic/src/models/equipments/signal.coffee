###
* File: project
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./view-model'], (base) ->
  class Signal extends base.ViewModel
    constructor: (parent, model) ->
      super parent, model

      @equipment = @parent.parent
      @station = @equipment.station

      @data = {}

    getIds: ->
      ids = @equipment.getIds()
      ids.signal = @model.signal
      ids

    setValue: (message) ->
      @data.unit = message.unit
      @data.severity = message.severity
      @data.value = message.value
      @data.formatValue = message.value
      @data.timestamp = message.timestamp

      @data


  exports =
    Signal: Signal
