###
* File: project
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./view-model', './equipments'], (base, em) ->
  class Station extends base.ViewModel
    constructor: (parent, model) ->
      super parent, model

      # children stations
      @stations = []
      @stationKeys = {}
      @stationIds = [model.station]

      @project = @parent.parent
      @equipments = new em.Equipments @

      @signals = {}
      @events = {}
      @commands = {}

      @statistic =
        alarms: 0
        capacity: 0
        pue: 0
        equipments: 0
        stockItems: 0
        connections: 0

    getIds: ->
      ids = @project.getIds()
      ids.station = @model.station
      ids

    appendStation: (station) ->
      @stations.push station
      @stationKeys[station.model.station] = station
      @stationIds.push station.model.station

    containsStation: (stationId) ->
      return @model.station is stationId or @stationKeys.hasOwnProperty(stationId)

    loadEquipments: (filter = {}, fields, callback, refresh) ->
      filter.user ?= @model.user
      filter.project ?= @model.project
      filter.station ?= @model.station

      @equipments.load filter, fields, (err, model) =>
        if model
          for m in model
            @project.equipments[m.key] = m

        callback? err, model
      , refresh

    loadEquipment: (equipmentId, fields, callback, refresh) ->
      filter =
        equipment: equipmentId
        user: @model.user
        project: @model.project
        station: @model.station

      @equipments.loadOne filter, fields, (err, model) =>
        if model
          @project.equipments[model.key] = model

        callback? err, model
      , refresh

    dispose: ->
      super

      @equipments.dispose()

      for key, signal of @signals
        delete @signals[key]

      for key, event of @events
        delete @events[key]

      for key, command of @commands
        delete @commands[key]


    loadStatisticByEquipmentTypes: (callback, refresh) ->
      #TODO: this may be move to gateway register
#      url = "inventory/statistic-by-equipment-types/:user/:project/:station"
      url = "inventory.statisticByEquipmentTypes"
      filter =
        user: @model.user
        project: @model.project
        station: @model.station
      fields = null

      @engine.query url, filter, fields, (err, model) =>
        callback? err, model
      , refresh

    createEquipment: (model = {}, parentEquipment) ->
      model.user ?= @model.user
      model.project ?= @model.project
      model.station ?= @model.station
      model.enable ?= true
      model.parent ?= parentEquipment?.model.equipment

      @equipment = @equipments.createItem model
      @equipment.parentEquipment = parentEquipment

      @equipment


  exports =
    Station: Station
