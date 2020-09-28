###
* File: project
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./view-model', './properties', './signals', './events', './commands', 'underscore'
], (base, ps, ss, es, cs, _) ->
  class Equipment extends base.ViewModel
    constructor: (parent, model) ->
      super parent, model

      @station = @parent.parent
      @project = @station.project

      @properties = new ps.Properties @
      @signals = new ss.Signals @
      @events = new es.Events @
      @commands = new cs.Commands @

      @sampleUnits = {}

    getIds: ->
      ids = @station.getIds()
      ids.equipment = @model.equipment
      ids

    loadEquipmentTemplate: (fields, callback, refresh) ->
      if not refresh and @templateLoaded
        return callback? null, @equipmentTemplate

      filter =
        type: @model.type
        template: @model.template

      @project.loadEquipmentTemplate filter, fields, (err, template) =>
        @templateLoaded = true

        @setEquipmentTemplate template
        callback? err, @equipmentTemplate
      , refresh

    setModel: (key, model) ->
      result = super key, model

      # equipment image can inherit from template
      @image = @model.image

      # extensible properties
      properties = {}
      if @model.properties
        for p in @model.properties
          properties[p.id] = p.value
      @propertyValues = properties

      result

    setEquipmentTemplate: (template) ->
      # set equipment image
      if template
        @image = template.getModelValue 'image' if not @model.image

        # set sample units
        @sampleUnits = template.getSampleUnits()
        if @model.sampleUnits
          for su in @model.sampleUnits
            sampleUnit = @sampleUnits[su.id]
            sampleUnit.value = su.value if sampleUnit and su.value?

      @equipmentTemplate = template

    getChanges: (model) ->
      m = super model

      # update properties what has been different from template definition
      properties = []
      for property in @properties.items when property.value?.toString() isnt property.model.value?.toString()
        p =
          id: property.model.property
          value: property.value
        properties.push p
      m.properties = properties

      # note: is it better to keep sample unit value as null if it's equal to template definition?
      sampleUnits = _.map @sampleUnits, (su) ->
        result =
          id: su.id
          value: su.value
      m.sampleUnits = sampleUnits

      m

    loadProperties: (fields, callback, refresh) ->
      if not refresh and @propertiesLoaded
        return callback? null, @properties.items

      @loadEquipmentTemplate null, (err, template) =>
        @propertiesLoaded = true

        return callback? err if not template

        template.loadProperties fields, (err, properties) =>
          return callback? err if not properties

          result = @addProperties properties

          callback? err, result
        , refresh
      , refresh

    addProperties: (properties) ->
      models = (property.model for property in properties)
      items = @properties.addItems models

      # assign equipment instance property values to template properties
      properties = @propertyValues
      if properties
        for item in items
          item.setValue properties[item.model.property]

      items
      
    loadSignals: (fields, callback, refresh) ->
      if not refresh and @signalsLoaded
        return callback? null, @signals.items

      @loadEquipmentTemplate null, (err, template) =>
        @signalsLoaded = true

        return callback? err if not template

        template.loadSignals fields, (err, signals) =>
          return callback? err if not signals

          result = @addSignals signals

          callback? err, result
        , refresh
      , refresh

    addSignals: (signals) ->
      models = (signal.model for signal in signals)
      items = @signals.addItems models

      # cache signals in station and project
      for item in items
        @station.signals[item.key] = item

        # to subscribe signal values
        @project.addSignal item

      items

    loadEvents: (fields, callback, refresh) ->
      if not refresh and @eventsLoaded
        return callback? null, @events.items

      @loadEquipmentTemplate null, (err, template) =>
        @eventsLoaded = true

        return callback? err if not template

        template.loadEvents fields, (err, events) =>
          return callback? err if not events

          result = @addEvents events

          callback? err, result
        , refresh
      , refresh

    addEvents: (events) ->
      models = (event.model for event in events)
      items = @events.addItems models

      # cache events in station and project
      for item in items
        @station.events[item.key] = item

        # to subscribe event values
        @project.addEvent item

      items

    loadCommands: (fields, callback, refresh) ->
      if not refresh and @commandsLoaded
        return callback? null, @commands.items

      @loadEquipmentTemplate null, (err, template) =>
        @commandsLoaded = true

        return callback? err if not template

        template.loadCommands fields, (err, commands) =>
          return callback? err if not commands

          result = @addCommands commands

          callback? err, result
        , refresh
      , refresh

    addCommands: (commands) ->
      models = (command.model for command in commands)
      items = @commands.addItems models

      # cache commands in station and project
      for item in items
        @station.commands[item.key] = item

        # to subscribe command values
        @project.addCommand item

      items

    dispose: ->
      super

      @signals.dispose()
      @events.dispose()
      @commands.dispose()


  exports =
    Equipment: Equipment
