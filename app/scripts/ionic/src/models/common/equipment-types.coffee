###
* File: equipment-types
* User: Dow
* Date: 11/8/2016
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../items-model', './equipment-type'], (base, et) ->
  class EquipmentTypes extends base.ItemsModel
    constructor: (parent, options) ->
      super parent, options

      @options.id ?= 'equipmenttypes'
      @options.keys ?= ['user', 'project', 'type']

    createItem: (model) ->
      item = new et.EquipmentType @, model

    addItems: (models) ->
      items = super models

      @buildCategoryTree items

      items

    buildCategoryTree: (categories, parent) =>
      if parent
        parent.categories = []

        for category in categories when category.model.base is parent.model.type
          parent.categories.push category

          @buildCategoryTree categories, category
      else
        @categories = []

        for category in categories when not category.model.base
          @categories.push category

          @buildCategoryTree categories, category

      @categories


  exports =
    EquipmentTypes: EquipmentTypes
