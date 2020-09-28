###
* File: project
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./items-model', './property'], (base, p) ->
  class Properties extends base.ItemsModel
    constructor: (parent, options) ->
      super parent, options

      @options.id ?= 'equipmentproperties'
      @options.keys ?= ['user', 'project', 'station', 'equipment', 'property']

      @equipment = @parent

    createItem: (model) ->
      item = new p.Property @, model

    getKey: (model) ->
      seperator = @options.keysSeperator || '.'
      m = @equipment.model

      # equipment property instance is from template property
      key = "#{m.user}#{seperator}#{m.project}#{seperator}#{m.station}#{seperator}#{m.equipment}#{seperator}#{model.property}"
      key


  exports =
    Properties: Properties
