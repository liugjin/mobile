###
* File: project
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./view-model'], (base) ->
  class Event extends base.ViewModel
    constructor: (parent, model) ->
      super parent, model

      @equipment = @parent.parent
      @station = @equipment.station

      @data = {}

    getIds: ->
      ids = @equipment.getIds()
      ids.event = @model.event
      ids

    setValue: (message) ->
#      data = @data
#
#      if message.endTime
#        data.severity = 0
#        data.phase = null
#        data.title = null
#        data.startValue = null
#        data.endValue = null
#        data.startTime = null
#        data.endTime = null
#        data.confirmTime = null
#        data.comment = null
#        data.operator = null
#        data.operatorName = null
#      else
#        data.severity = message.severity
#        data.phase = message.phase
#        data.title = message.title
#        data.startValue = message.startValue
#        data.endValue = message.endValue
#        data.startTime = message.startTime
#        data.endTime = message.endTime
#        data.confirmTime = message.confirmTime
#        data.comment = message.comment
#        data.operator = message.operator
#        data.operatorName = message.operatorName

#      for k, v of message
#        data[k] = v

      # ignore the data which start time is earlier than current event
      return if message.startTime < @data.startTime

      @data = data = message
      data


  exports =
    Event: Event
