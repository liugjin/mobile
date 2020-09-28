###
* File: project
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./items-model', './equipment-template'], (base, cm) ->
  class EquipmentTemplates extends base.ItemsModel
    constructor: (parent, options) ->
      super parent, options

      @options.id ?= 'equipmenttemplates'
      @options.keys ?= ['user', 'project', 'type', 'template']

    createItem: (model) ->
      item = new cm.EquipmentTemplate @, model

    loadEquipmentTemplate: (filter, fields, callback, refresh) ->
      if not refresh
        template = @getItemByIds filter
        return callback? null, template if template

      # load all ancient templates
      @load filter, fields, (err, templates) =>
        template = templates?[0]
        return callback? err, template if not template or template.base or not template.model.base

        # base template id: #{type}.#{template}
        [type2, template2] = template.model.base.split '.'

        baseFilter =
          user: filter.user
          project: filter.project
          type: type2
          template: template2

        base = @getItemByIds baseFilter
        template.base = base

        return callback? null, template if base

        @loadEquipmentTemplate baseFilter, fields, (err, base) =>
          template.base = base
          callback? err, template
        , refresh

      , refresh


  exports =
    EquipmentTemplates: EquipmentTemplates
