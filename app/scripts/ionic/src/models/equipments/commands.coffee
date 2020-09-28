###
* File: project
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./items-model', './command'], (base, cmd) ->
  class Commands extends base.ItemsModel
    constructor: (parent, options) ->
      super parent, options

      @options.id ?= 'equipmentcommands'
      @options.keys ?= ['user', 'project', 'station', 'equipment', 'command']

      @equipment = @parent

    createItem: (model) ->
      item = new cmd.Command @, model

    getKey: (model) ->
      seperator = @options.keysSeperator || '.'
      m = @equipment.model

      # equipment command instance is from template command
      key = "#{m.user}#{seperator}#{m.project}#{seperator}#{m.station}#{seperator}#{m.equipment}#{seperator}#{model.command}"
      key


  exports =
    Commands: Commands
