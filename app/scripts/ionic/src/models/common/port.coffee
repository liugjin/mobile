###
* File: project
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../view-model'], (base) ->
  class Port extends base.ViewModel
    constructor: (parent, model) ->
      super parent, model

      @equipment = @parent.parent
      @station = @equipment.station

      @data = {}

    getIds: ->
      ids = @equipment.getIds()
      ids.port = @model.port
      ids

    setValue: (message) ->
      @data = data = message
      data


  exports =
    Port: Port
