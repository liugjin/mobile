###
* File: project
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../view-model', './properties', './signals', './events', './commands', './ports', 'underscore', 'rx'
], (base, ps, ss, es, cs, ps2, _, Rx) ->
  class Equipment extends base.ViewModel
    constructor: (parent, model) ->
      super parent, model

      @station = @parent.parent
      @project = @station.project

      @properties = new ps.Properties @
      @signals = new ss.Signals @
      @events = new es.Events @
      @commands = new cs.Commands @
      @ports = new ps2.Ports @

      @sampleUnits = {}
      @propertyValues = {}

      @subject = new Rx.Subject

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

    setModel: (model, key) ->
      return false if not super model, key

      # equipment image can inherit from template
      @setImage()

      # extensible properties
#      properties = {}
#      if @model.properties
#        for p in @model.properties
#          properties[p.id] = p.value
#      @propertyValues = properties

      @updatePropertyValues()

      return true

    updatePropertyValues: ->
      # the property has not been set if it is the same value as template property definition
      pv = {}
      for p in @properties.items
        pv[p.model.property] = p.getValue()

      if @model.properties
        for p in @model.properties
          pv[p.id] = p.value

#      @propertyValues = {}
      for k, v of pv
        @setPropertyValue k, v

      @propertyValues

    setImage: ->
      @image = @model.image ? @equipmentTemplate?.getModelValue 'image'

    setEquipmentTemplate: (template) ->
      # set equipment image
      if template
        @setImage()

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
      for property in @properties.items when property.isChanged()
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

      units = @project.typeModels.units
      # override base template property definition
      for item in items
        @setPropertyValue item.model.property, item.getValue() if not properties[item.model.property]?

        # assign unit abbr
        item.unit = units.getItem(item.model.unit)?.model

      items

    getPropertyValue: (key, defaultValue) ->
      @propertyValues[key] ? defaultValue

    setPropertyValue: (key, value) ->
      property = @properties.getItemByIds property: key
#      return value if not property

      if property
        value = property.setValue value

      oldValue = @propertyValues[key]
      return value if value is oldValue

      @propertyValues[key] = value
      @subject.onNext
        type: 'property'
        key: key
        value: value
        oldValue: oldValue

      value

    subscribePropertyValue: (key, callback, initializedValue, throttle) ->
      if initializedValue
        data =
          type: 'property'
          key: key
          value: @propertyValues[key]

        callback? data

      subject = @subject
      subject = subject.where((d) -> d.type is 'property' and d.key is key)
      subject = subject.throttle throttle if throttle

      handler = subject.subscribe callback
      @addHandler handler
      handler

    subscribePropertiesValue: (keys, callback, throttle) ->
      subject = @subject
      subject = subject.throttle throttle if throttle

      handler = subject.where(d -> d.type is 'property' and keys.indexOf(d.key) >= 0).subscribe callback
      @addHandler handler
      handler

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

    loadPorts: (fields, callback, refresh) ->
      if not refresh and @portsLoaded
        return callback? null, @ports.items

      @loadEquipmentTemplate null, (err, template) =>
        @portsLoaded = true

        return callback? err if not template

        template.loadPorts fields, (err, ports) =>
          return callback? err if not ports

          result = @addPorts ports

          callback? err, result
        , refresh
      , refresh

    addPorts: (ports) ->
      models = (port.model for port in ports)
      items = @ports.addItems models

      # cache ports in station and project
      for item in items
        @station.ports[item.key] = item

        # to subscribe port values
        @project.addPort item

      items

    dispose: (disposing) ->
      super disposing

      if not disposing
        @subject.dispose()

      @signals.dispose disposing
      @events.dispose disposing
      @commands.dispose disposing
      @ports.dispose disposing

    getTemplateValue2: (key, template) ->
      return if not template

      val = template.model[key]
      return val if val?

      @getTemplateValue2 key, template.base

    getTemplateValue: (key) ->
      val = @model[key]
      return val if val?

      @getTemplateValue2 key, @equipmentTemplate

    updateSignals: (signals, callback) ->
      @updateSignalsService ?= @engine.modelManager.getService 'updateSignals'
      url = @updateSignalsService.getUrl @model, true

      data = signals: signals
      @updateSignalsService.postData url, data, (err, model) =>
        @setModel model if model

        @display err, "更新信号实例成功！"
        callback? err, model

    updateEvents: (events, callback) ->
      @updateEventsService ?= @engine.modelManager.getService 'updateEvents'
      url = @updateEventsService.getUrl @model, true

      data = events: events
      @updateEventsService.postData url, data, (err, model) =>
        @setModel model if model

        @display err, "更新事件实例成功！"
        callback? err, model
        
    updateCommands: (commands, callback) ->
      @updateCommandsService ?= @engine.modelManager.getService 'updateCommands'
      url = @updateCommandsService.getUrl @model, true

      data = commands: commands
      @updateCommandsService.postData url, data, (err, model) =>
        @setModel model if model

        @display err, "更新控制实例成功！"
        callback? err, model


  exports =
    Equipment: Equipment
