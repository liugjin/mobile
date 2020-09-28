###
* File: project
* User: Dow
* Date: 8/14/2015
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../view-model', './equipments'], (base, em) ->
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
      @ports = {}

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
            @project.addEquipment m

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
          @project.addEquipment model

        callback? err, model
      , refresh

    dispose: ->
      super

      @equipments.dispose()

      @signals = {}
      @events = {}
      @commands = {}
      @ports = {}

      return

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

    getEquipmentsByType: (type) ->
      equipments = (equipment for equipment in @equipments.items when equipment.model.type is type)

    getFirstEquipmentByType: (type) ->
      for equipment in @equipments.items
        return equipment if equipment.model.type is type

      null


  exports =
    Station: Station
