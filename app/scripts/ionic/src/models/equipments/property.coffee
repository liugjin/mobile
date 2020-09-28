###
* File: project
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./view-model'], (base) ->
  class Property extends base.ViewModel
    constructor: (parent, model) ->
      super parent, model

      @equipment = @parent.parent
      @station = @equipment.station

    getIds: ->
      ids = @equipment.getIds()
      ids.property = @model.property
      ids

    setValue: (value) ->
      @value = @parseValue value if value?

    getValue: ->
      return @value if @value

      @model.value

    # override
    setModel: (key, model) ->
      result = super key, model
      @value = @parseValue model.value

#      console.log "#{model.property}: #{@value}"

      result

    parseValue: (value) ->
      if typeof value isnt 'string'
        return value

      switch @model.dataType
        when 'int'
          result = parseInt value
        when 'float'
          result = parseFloat value
        else
          result = value

      result




  exports =
    Property: Property
