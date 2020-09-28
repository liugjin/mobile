###
* File: project
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../view-model', '../items-model', './equipment-templates', './stations', './equipment-types'
], (base, im, etm, sm, et) ->
  class Project extends base.ViewModel
    constructor: (parent, model) ->
      super parent, model

      @equipmentTemplates = new etm.EquipmentTemplates @
      @stations = new sm.Stations @

      @equipments = {}
      @signals = {}
      @signalTopics = {}
      @statisticTopics = {}
      @events = {}
      @eventTopics = {}
      @commands = {}
      @commandTopics = {}
      @ports = {}

      @loadModels()

    loadModels: ->
      @dictionary = @typeModels = {}
      @createTypeModel 'datatypes', 'type'
      @createTypeModel 'stationtypes', 'type'
      @createTypeModel 'signaltypes', 'type'
      @createTypeModel 'eventtypes', 'type'
      @createTypeModel 'eventseverities', 'severity'
      @createTypeModel 'eventphases', 'phase'
      @createTypeModel 'units', 'unit'
      @createTypeModel 'vendors', 'vendor'
      @createTypeModel 'capacities', 'capacity'
      @createTypeModel 'porttypes', 'type'

      @createTypeModel 'equipmenttypes', 'type', et.EquipmentTypes

    getIds: ->
      ids =
        user: @model.user
        project: @model.project

    createTypeModel: (id, key, ModelType = im.ItemsModel) ->
      model = new ModelType @,
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

      @signals = {}
      @events = {}
      @commands = {}
      @ports = {}

      return

    addEquipment: (equipment) ->
      @equipments[equipment.key] = equipment

    getEquipment: (key) ->
      @equipments[key]

    getEquipmentByIds: (ids) ->
      station = @stations.getItemByIds ids
      return if not station

      equipment = station.equipments.getItemByIds ids

    addSignal: (signal) ->
      # to subscribe signal topic
      model = signal.equipment.model
      topic = "signal-values/#{model.user}/#{model.project}/#{model.station}/#{model.equipment}/#{signal.model.signal}"
      @signalTopics[topic] = signal
      topic2 = "signal-statistics/#{model.user}/#{model.project}/#{model.station}/#{model.equipment}/#{signal.model.signal}"
      @statisticTopics[topic2] = signal
      @signals[signal.key] = signal

      signal

    getSignal: (key) ->
      @signals[key]

    getSignalByTopic: (topic) ->
      @signalTopics[topic]

    getSignalByStatisticTopic: (topic) ->
      @statisticTopics[topic]

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

    addPort: (port) ->
      @ports[port.key] = port

    getPort: (key) ->
      @ports[key]

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
