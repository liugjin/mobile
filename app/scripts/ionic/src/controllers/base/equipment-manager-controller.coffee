###
* File: equipment-manager-controller
* User: Dow
* Date: 04/06/2016
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./graphic-base-controller', 'moment', 'underscore'], (base, moment, _) ->
  class EquipmentManagerController extends base.GraphicBaseController
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options) ->
      super $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options

    load: (callback, refresh) ->
      super (err, model) =>
        # for create/update equipment
        @loadEquipmentTemplates null, refresh

        callback? err, model
      , refresh

    dispose: ->
      super

      @clearEquipment()

    loadEquipmentsByType: (types, callback, refresh) ->
      return callback? 'null type' if not types

      # load all equipments whose type belongs to category
      if types instanceof Array
        filter =
          type:
            $in: types
      else
        filter =
          type: types

      fields = null
      @station.loadEquipments filter, fields, (err, model) =>
        @equipments = model
        callback? err, model
      , refresh

    loadEquipments: (callback, refresh) ->
      fields = 'user project station equipment name type image index group vendor'
      filter =
        type:
#          $elemMatch:
          $regex: '^[^_]'
          $options: 'i'
      @station?.loadEquipments filter, fields, (err, model) =>
        @equipments = model
        for equipment in @equipments
          equipment.model.typeName = (_.find @project.dictionary.equipmenttypes.items, (type)->type.key is equipment.model.type)?.model.name
          equipment.model.templateName = (_.find @equipmentTemplates, (template)->template.model.type is equipment.model.type and template.model.template is equipment.model.template)?.model.name
          equipment.model.vendorName = (_.find @project.dictionary.vendors.items, (vendor)->vendor.key is equipment.model.vendor)?.model.name
          equipment.model.stationName = (_.find @project.stations.items, (station)->station.model.station is equipment.model.station)?.model.name
          equipment.model.image ?= (_.find @equipmentTemplates, (tmp)->tmp.model.template is equipment.model.template)?.model.image
        callback? err, model
      , refresh

    getEquipmentsByType: (type) ->
      return [] if not @equipments

      (equipment for equipment in @equipments when equipment.model.type is type)

    createEquipment: (type, parent) ->
      type ?= @type?.type ? @equipmentType?.model.type
      model =
        type: type
        enable: true

      # copy from last equipment
      last = @equipment
      last ?= @equipments[@equipments.length - 1] if angular.isArray @equipments
      if last
        model.equipment = @getNextName last.model.equipment
        model.name = @getNextName last.model.name
        model.type ?= last.model.type
        model.vendor = last.model.vendor
        model.template = last.model.template
        model.owner = last.model.owner
        model.image = last.model.image
        model.desc = last.model.desc

      @clearEquipment()
      @equipment = @station.createEquipment model, parent  ? last?.parentElement
      @equipment

    saveEquipment: (callback) ->
      super (err, model) =>
        # load template for extensible property and sample units edit
        @equipment.loadEquipmentTemplate null, =>
          @loadProperties null

        callback? err, model

    selectEquipment: (equipment, callback, refresh) ->
      return false if not refresh and @equipment is equipment

      @clearEquipment()
      @loadEquipment equipment?.model.equipment, (err, model) =>
        # make sure equipment type is as same as equipment's
        type = @project.typeModels.equipmenttypes.getItemByIds type: @equipment?.model.type
        @selectEquipmentType type

        # set url without save into navigation history
        @$location.search 'equipment', @equipment?.model.equipment
        .replace()

        callback? err, model
      , refresh

      return true

    clearEquipment: ->
      # make sure all popover has been closed
      @disposePopovers()

    parseEquipmentId: (id) ->
      return id if id?

      # don't get route equipment parameter if station model has been changed
      if @station.model.station is @$routeParams.station
        id = @$routeParams.equipment ? @equipments?[0]?.model.equipment
      else
        id = @equipments?[0]?.model.equipment

      id

    loadEquipment: (equipmentId, callback, refresh) ->
      return callback? 'null station' if not @station

      equipmentId = @parseEquipmentId equipmentId
      return callback? 'null equipment' if not equipmentId?

      @station?.loadEquipment equipmentId, null, (err, model) =>
        @equipment = model
        return callback? err, model if not model

        @loadProperties =>
          callback? err, model
        , refresh
      , refresh

    loadProperties: (callback, refresh) ->
#      return callback? null, @properties if not refresh and @properties

      fields = null
      @equipment?.loadProperties fields, (err, model) =>
        @properties = model

        callback? err, model
      , refresh

    loadSignals: (callback, refresh, equipment = @equipment) ->
#      return callback? null, @signals if not refresh and @signals

      return callback 'null equipment' if not equipment

      # initialize event instance definition
      instances = {}
      signals = equipment.model.signals
      if signals
        for sgl in signals
          instances[sgl.id] = sgl.signal
      equipment.signalInstances = instances

      fields = null
      equipment.loadSignals fields, (err, model) =>
        @signals = model

        if model
          for signal in model
            @initializeSignal signal, equipment

        callback? err, model
      , refresh

    initializeSignal: (signal, equipment = @equipment) ->
      # initialize signal instance
      instance = equipment.signalInstances[signal.model.signal] ? {}
      instance.name ?= signal.model.name
      instance.enable ?= signal.model.enable

      signal.instance = instance

      # binding unit
      signal.unit = @project.typeModels.signaltypes.getItem(signal.model.unit)?.model

    loadEvents: (callback, refresh, equipment = @equipment) ->
#      return callback? null, @events if not refresh and @events
      return callback 'null equipment' if not equipment

      # initialize event instance definition
      instances = {}
      events = equipment.model.events
      if events
        for evt in events
          instances[evt.id] = evt.event
      equipment.eventInstances = instances

      # load template events
      fields = null
      equipment.loadEvents fields, (err, model) =>
        @events = model

        # initialize event instance
        if model
          for event in model
            @initializeEvent event, equipment

        callback? err, model
      , refresh

    initializeEvent: (event, equipment = @equipment) ->
        instance = equipment.eventInstances[event.model.event] ? {}
        instance.name ?= event.model.name
        instance.enable ?= event.model.enable

        event.instance = instance

    loadCommands: (callback, refresh, equipment = @equipment) ->
#      return callback? null, @commands if not refresh and @commands
      return callback 'null equipment' if not equipment

      # initialize command instance definition
      instances = {}
      commands = equipment.model.commands
      if commands
        for cmd in commands
          instances[cmd.id] = cmd.command
      equipment.commandInstances = instances

      # load commands
      fields = null
      equipment.loadCommands fields, (err, model) =>
        @commands = model

        # initialize event instance
        if model
          for command in model
            @initializeCommand command, equipment

        callback? err, model
      , refresh

    initializeCommand: (command, equipment = @equipment) ->
      instance = equipment.commandInstances[command.model.command] ? {}
      instance.name ?= command.model.name
      instance.enable ?= command.model.enable

      command.instance = instance


    loadPorts: (callback, refresh, equipment = @equipment) ->
#      return callback? null, @ports if not refresh and @ports
      return callback 'null equipment' if not equipment

      # initialize port instance definition
      instances = {}
      ports = equipment.model.ports
      if ports
        for port in ports
          instances[port.id] = port
      equipment.portInstances = instances

      # load ports
      fields = null
      equipment.loadPorts fields, (err, model) =>
        @ports = model

        # initialize port instance
        if model
          for port in model
            @initializePort port, equipment

        callback? err, model
      , refresh

    initializePort: (port, equipment = @equipment) ->
      instance = equipment.portInstances[port.model.port] ? {}
      instance.name ?= port.model.name
      instance.enable ?= port.model.enable

      ids =
        user: port.model.user
        project: port.model.project
        type: port.model.portType
      type = @project.typeModels.porttypes.getItemByIds ids

      # deep copy
      if type
        instance.definition = angular.copy type.model

        # override property value of instance
        properties = instance.port?.properties
        if properties and instance.definition.properties
          for p in instance.definition.properties
            val = properties[p.property]
            p.value = val if val?

      port.instance = instance

    getPortPropertyValues: (port) ->
      properties = port.instance.definition?.properties
      return if not properties

      ids =
        user: port.model.user
        project: port.model.project
        type: port.model.portType
      type = @project.typeModels.porttypes.getItemByIds ids
      return if not type

      properties0 = type.model?.properties
      return if not properties0

      values0 = {}
      for p in properties0
        values0[p.property] = p.value


      values = {}
      for p in properties
        values[p.property] = p.value if values0[p.property] isnt p.value

      values

    initializeLifeCycle: (equipment = @equipment) ->
      return if not equipment

      productionTime = equipment.getPropertyValue 'production-time', equipment.model.createtime
      createTime = new Date productionTime

      life = equipment.getPropertyValue 'life', 36 # month

      periods = equipment.getPropertyValue 'periods'
      periods = if periods then JSON.parse periods else []

      @lifecycleOptions =
        createTime: createTime
        life: life
        periods: periods

      # percentage
      used = moment().diff createTime, 'months'
      @life = used / life * 100

    saveEventInstance: (event, callback) ->
      # do nothing if instance definition is same as template
      model = event.model
      instance = event.instance
      return if instance.name is model.name and instance.enable is model.enable

      # update equipment events instance definition
      events = @equipment.model.events
      events ?= []
      @equipment.model.events = events

      id = model.event
      data = null
      for evt in events
        if evt.id is id
          data = evt
          break

      if data
        data.event ?= {}
        data.event.name = instance.name if instance.name isnt model.name
        data.event.enable = instance.enable if instance.enable isnt model.enable

      else
        data =
          id: id
          event: {}

        data.event.name = instance.name if instance.name isnt model.name
        data.event.enable = instance.enable if instance.enable isnt model.enable

        events.push data

      @saveEquipment callback

    saveCommandInstance: (command, callback) ->
      # do nothing if instance definition is same as template
      model = command.model
      instance = command.instance
      return if instance.name is model.name and instance.enable is model.enable

      # update equipment commands instance definition
      commands = @equipment.model.commands
      commands ?= []
      @equipment.model.commands = commands

      id = model.command
      data = null
      for evt in commands
        if evt.id is id
          data = evt
          break

      if data
        data.command ?= {}
        data.command.name = instance.name if instance.name isnt model.name
        data.command.enable = instance.enable if instance.enable isnt model.enable

      else
        data =
          id: id
          command: {}

        data.command.name = instance.name if instance.name isnt model.name
        data.command.enable = instance.enable if instance.enable isnt model.enable

        commands.push data

      @saveEquipment callback

    saveSignalInstance: (signal, callback) ->
      # do nothing if instance definition is same as template
      model = signal.model
      instance = signal.instance
#      return if instance.name is model.name and instance.enable is model.enable

      # update equipment signals instance definition
      signals = @equipment.model.signals
      signals ?= []
      @equipment.model.signals = signals

      id = model.signal
      data = null
      for evt in signals
        if evt.id is id
          data = evt
          break

      if data
        data.signal ?= {}
        data.signal.name = instance.name if instance.name isnt model.name
        data.signal.enable = instance.enable if instance.enable isnt model.enable

      else
        data =
          id: id
          signal: {}

        data.signal.name = instance.name if instance.name isnt model.name
        data.signal.enable = instance.enable if instance.enable isnt model.enable

        signals.push data

      @saveEquipment callback

    savePortInstance: (port, callback) ->
      # do nothing if instance definition is same as template
      model = port.model
      instance = port.instance
      return if instance.name is model.name and instance.enable is model.enable

      # update equipment ports instance definition
      ports = @equipment.model.ports
      ports ?= []
      @equipment.model.ports = ports

      id = model.port
      data = null
      for evt in ports
        if evt.id is id
          data = evt
          break

      if data
        data.port ?= {}
        data.port.name = instance.name if instance.name isnt model.name
        data.port.enable = instance.enable if instance.enable isnt model.enable

      else
        data =
          id: id
          port: {}

        data.port.name = instance.name if instance.name isnt model.name
        data.port.enable = instance.enable if instance.enable isnt model.enable

        ports.push data

      @saveEquipment callback

    selectEquipmentByIds: (ids) ->
      model = @equipment.model ? {}
      return if model.station is ids.station and model.equipment is ids.equipment

      ids.user ?= @$routeParams.user
      ids.project ?= @$routeParams.project

      @$routeParams.station = ids.station
      @$routeParams.equipment = ids.equipment

      if model.station is ids.station
        equipment = @station.equipments.getItemByIds ids
        @selectEquipment equipment
      else
        @initializeStations()

        if @station
          @loadEquipments () =>
            equipment = @station.equipments.getItemByIds ids
            @selectEquipment equipment

    refreshEquipment: (equipment = @equipment) ->
      @selectEquipment equipment, null, true

    selectPrevious: ->
      return if not @equipments.length

      index = @equipments.indexOf(@equipment) + 1
      return if index >= @equipments.length

      @selectEquipment @equipments[index]

    selectNext: ->
      return if not @equipments.length

      index = @equipments.indexOf(@equipment) - 1
      return if index < 0

      @selectEquipment @equipments[index]

    # add by cz, 20170317
    filterProperties: (filter, isNot=false) ->
      properties = _.filter @properties, (p) ->
        if isNot then not (~p.model.property.indexOf filter) else ~p.model.property.indexOf filter
      @properties = {}
      for p in properties
        @properties[p.model.property] = p

    # add by cz, 20170317
    filterEvents: (events, filter) ->
      es = _.filter events, (e) ->
        ~e.key.indexOf filter
      events = {}
      for e in es
        events[e.model.event] = e


  exports =
    EquipmentManagerController: EquipmentManagerController
