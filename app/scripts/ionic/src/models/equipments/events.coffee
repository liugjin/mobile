###
* File: project
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./items-model', './event'], (base, evt) ->
  class Events extends base.ItemsModel
    constructor: (parent, options) ->
      super parent, options

      @options.id ?= 'equipmentevents'
      @options.keys ?= ['user', 'project', 'station', 'equipment', 'event']

      @equipment = @parent

    createItem: (model) ->
      item = new evt.Event @, model

    getKey: (model) ->
      seperator = @options.keysSeperator || '.'
      m = @equipment.model

      # equipment event instance is from template event
      key = "#{m.user}#{seperator}#{m.project}#{seperator}#{m.station}#{seperator}#{m.equipment}#{seperator}#{model.event}"
      key


  exports =
    Events: Events
