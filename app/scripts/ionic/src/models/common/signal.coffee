###
* File: project
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../view-model', '../../filters/format-string-filter'], (base, fsf) ->
  class Signal extends base.ViewModel
    constructor: (parent, model) ->
      super parent, model

      @equipment = @parent.parent
      @station = @equipment.station

      @data = {}
      @formatString = fsf.FormatStringFilter()

    getIds: ->
      ids = @equipment.getIds()
      ids.signal = @model.signal
      ids

    setValue: (message) ->
#      change = message.value - message.lastValue

      @data =
        unit: message.unit
        severity: message.severity
        value: message.value
        lastValue: message.lastValue
        formatValue: @formatString message.value, @model.dataType, @model.format
        timestamp: new Date message.timestamp
#        change: change
#        changeIcon: if change > 0 then 'arrow_upward' else if change < 0 then 'arrow_downward' else 'arrow_forward'
#        changeColor: if change > 0 then '#f44336' else if change < 0 then '#4caf50' else '#2196f3'


  exports =
    Signal: Signal
