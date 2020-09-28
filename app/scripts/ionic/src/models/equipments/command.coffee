###
* File: project
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./view-model'], (base) ->
  class Command extends base.ViewModel
    constructor: (parent, model) ->
      super parent, model

      @equipment = @parent.parent
      @station = @equipment.station

      @data = {}

    setModel: (key, model) ->
      m = super key, model

      # parse definition
      if m.parameters
        for parameter in m.parameters
          if parameter.type is 'enum' and parameter.definition
            enums = []
            kvs = parameter.definition.split ';'
            for kv in kvs
              ps = kv.split ':'
              enums.push
                key: "#{ps[0]} (#{ps[1]})"
                value: ps[1]

            parameter.enums = enums

      m

    getIds: ->
      ids = @equipment.getIds()
      ids.command = @model.command
      ids

    setValue: (message) ->
      data = {}
      for k, v of message
        data[k] = v

      parameters = {}
      parameters3 = ''
      if data.parameters
        for p in data.parameters
          parameters[p.key] = p.value
          parameters3 += "#{p.key}=#{p.value}; "
#      data.parameters = parameters
      data.parameters3 = parameters3

      if data.trigger is 'user'
        data.triggerName = data.operatorName
      else
        data.triggerName = data.trigger

      # keep the origin message
      @_data = message
      @data = data


  exports =
    Command: Command
