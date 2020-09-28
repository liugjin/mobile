###
* File: project
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./view-model', './items-model', './equipment-templates', './stations'], (base, im, etm, sm) ->
  class Project extends base.ViewModel
    constructor: (parent, model) ->
      super parent, model

      @typeModels = {}
      @createTypeModel 'datatypes', 'type'
      @createTypeModel 'signaltypes', 'type'
      @createTypeModel 'eventtypes', 'type'
      @createTypeModel 'eventseverities', 'severity'
      @createTypeModel 'units', 'unit'
      @createTypeModel 'vendors', 'vendor'
      @createTypeModel 'equipmenttypes', 'type'

      @equipmentTemplates = new etm.EquipmentTemplates @
      @stations = new sm.Stations @

      @equipments = {}
      @signals = {}
      @signalTopics = {}
      @events = {}
      @eventTopics = {}
      @commands = {}
      @commandTopics = {}

    getIds: ->
      ids =
        user: @model.user
        project: @model.project

    createTypeModel: (id, key) ->
      model = new im.ItemsModel @,
        id: id
        keys: [key]

      @typeModels[id] = model
      model

    loadTypeModel: (type, fields, callback, refresh) ->
      model = @typeModels[type]

      if not model
        callback? "unknown type: #{type}"
        return

      filter =
        user: @model.user
        project: @model.project

      model.load filter, fields, callback, refresh

    loadTypeModels: (callback, refresh) ->
      filter =
        user: @model.user
        project: @model.project

      for id, model of @typeModels
        model.load filter, null, callback, refresh

      return

    getTypeProperty: (type, key, property) ->
      @typeModels[type]?.getItem(key)?.model[property]

    loadStations: (fields, callback, refresh) ->
      filter =
        user: @model.user
        project: @model.project

      @stations.load filter, fields, callback, refresh

    loadEquipmentTemplates: (filter = {}, fields, callback, refresh) ->
      filter.user ?= @model.user
      filter.project ?= @model.project

      @equipmentTemplates.load filter, fields, callback, refresh

    loadEquipmentTemplate: (filter = {}, fields, callback, refresh) ->
      filter.user ?= @model.user
      filter.project ?= @model.project

      @equipmentTemplates.loadEquipmentTemplate filter, fields, callback, refresh

    dispose: ->
      super

      for id, type of @typeModels
        type.dispose()

      @equipmentTemplates.dispose()
      @stations.dispose()

      for key, signal of @signals
        delete @signals[key]
        
      for key, event of @events
        delete @events[key]

      for key, command of @commands
        delete @commands[key]

    addSignal: (signal) ->
      # to subscribe signal topic
      model = signal.equipment.model
      topic = "signal-values/#{model.user}/#{model.project}/#{model.station}/#{model.equipment}/#{signal.model.signal}"
      @signalTopics[topic] = signal
      @signals[signal.key] = signal

      signal

    getSignal: (key) ->
      @signals[key]

    getSignalByTopic: (topic) ->
      @signalTopics[topic]

    addEvent: (event) ->
      # to subscribe event topic
      model = event.equipment.model
      topic = "event-values/#{model.user}/#{model.project}/#{model.station}/#{model.equipment}/#{event.model.event}"
      @eventTopics[topic] = event
      @events[event.key] = event

      event

    getEvent: (key) ->
      @events[key]

    getEventByTopic: (topic) ->
      @eventTopics[topic]

    addCommand: (command) ->
      # to subscribe command topic
      model = command.equipment.model
      topic = "command-values/#{model.user}/#{model.project}/#{model.station}/#{model.equipment}/#{command.model.command}"
      @commandTopics[topic] = command
      @commands[command.key] = command

      command

    getCommand: (key) ->
      @commands[key]

    getCommandByTopic: (topic) ->
      @commandTopics[topic]

    createStation: (parentStation) ->
      model =
        user: @model.user
        project: @model.project
        parent: parentStation?.model.station

      @station = @stations.createItem model
      @station.parentStation = parentStation
      @station.root = @

      @station


  exports =
    Project: Project
