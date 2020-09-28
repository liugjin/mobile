###
* File: project
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./items-model', './signal'], (base, sig) ->
  class Signals extends base.ItemsModel
    constructor: (parent, options) ->
      super parent, options

      @options.id ?= 'equipmentsignals'
      @options.keys ?= ['user', 'project', 'station', 'equipment', 'signal']

      @equipment = @parent

    createItem: (model) ->
      item = new sig.Signal @, model

    getKey: (model) ->
      seperator = @options.keysSeperator || '.'
      m = @equipment.model

      # equipment signal instance is from template signal
      key = "#{m.user}#{seperator}#{m.project}#{seperator}#{m.station}#{seperator}#{m.equipment}#{seperator}#{model.signal}"
      key


  exports =
    Signals: Signals
