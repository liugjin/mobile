###
* File: project
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./items-model', './equipment'], (base, cm) ->
  class Equipments extends base.ItemsModel
    constructor: (parent, options) ->
      super parent, options

      @options.id ?= 'equipments'
      @options.keys ?= ['user', 'project', 'station', 'equipment']

    createItem: (model) ->
      item = new cm.Equipment @, model



  exports =
    Equipments: Equipments
