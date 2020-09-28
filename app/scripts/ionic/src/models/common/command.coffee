###
* File: project
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../view-model'], (base) ->
  class Command extends base.ViewModel
    constructor: (parent, model) ->
      super parent, model

      @equipment = @parent.parent
      @station = @equipment.station

      @data = {}

    setModel: (model, key) ->
      return false if not super model, key

      # parse definition
      if @model.parameters
        for parameter in @model.parameters
          if parameter.type is 'enum' and parameter.definition
            enums = []
            kvs = parameter.definition.split ','
            for kv in kvs
              ps = kv.split ':'

              # makes sure val is number
              val = ps[0]
              val = if isNaN val then val else Number(val)

              enums.push
                key: "#{ps[1]} (#{val})"
                value: val

            parameter.enums = enums

      return true

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

          parameters3 += ", " if parameters3
          parameters3 += "#{p.key}=#{p.value}"
#      data.parameters = parameters
      data.parameters3 = parameters3

      if data.trigger is 'user'
        data.triggerName = data.operatorName
      else
        data.triggerName = data.trigger

      # keep the origin message
      @_data = message
      @data = data

    getParameterValue: (parameter) ->
      val = parameter.value

      switch parameter.type
        when 'float'
          val = parseFloat val
        when 'int'
          val = parseInt val
        when 'bool'
          val = Bool val
        when 'enum'
          val = Number val if not isNaN val

      val

    getParameterValues: ->
      parameters = []
      for p in @model.parameters
        parameters.push
          key: p.key
          value: @getParameterValue p

      parameters


  exports =
    Command: Command
