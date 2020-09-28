###
* File: project
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../view-model'], (base) ->
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
    setModel: (model, key) ->
      return false if not super model, key

      @value = @parseValue @model.value

#      console.log "#{model.property}: #{@value}"

      return true

    parseValue: (value) ->
      if typeof value isnt 'string'
        return value

      switch @model.dataType
        when 'int'
          result = parseInt value
        when 'float'
          result = parseFloat value
#        when 'json'
#          result = JSON.parse value
        when 'date'
          result = new Date value
        else
          result = value

      result

    isChanged: ->
      # save always on instantiation mode
      return true if @model.instantiation

      @value?.toString() isnt @model.value?.toString()


  exports =
    Property: Property
