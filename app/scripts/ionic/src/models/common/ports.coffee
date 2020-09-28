###
* File: project
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../items-model', './port'], (base, evt) ->
  class Ports extends base.ItemsModel
    constructor: (parent, options) ->
      super parent, options

      @options.id ?= 'equipmentports'
      @options.keys ?= ['user', 'project', 'station', 'equipment', 'port']

      @equipment = @parent

    createItem: (model) ->
      item = new evt.Port @, model

    getKey: (model) ->
      seperator = @options.keysSeperator || '.'
      m = @equipment.model

      # equipment port instance is from template port
      key = "#{m.user}#{seperator}#{m.project}#{seperator}#{m.station}#{seperator}#{m.equipment}#{seperator}#{model.port}"
      key


  exports =
    Ports: Ports
