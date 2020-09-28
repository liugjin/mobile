###
* File: feature-base-controller
* User: Dow
* Date: 12/6/2015
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./live-controller', 'underscore'], (base, _) ->
  class FeatureBaseController extends base.LiveController
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options) ->
      super $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options

      # order by display index
      @predicate = 'model.index'
      @reverse = false

    getRandomInt: (min = 0, max = 100) ->
      Math.floor(Math.random() * (max - min)) + min

    setTimeout: (callback, period) ->
      timer = @$timeout =>
        callback()
      , period

      @addHandler =>
        @$timeout.cancel timer

    setInterval: (callback, period) ->
      timer = @$interval =>
        callback()
      , period

      @addHandler =>
        @$interval.cancel timer

    load: (callback, refresh) ->
# all sub-controller should load project and station list
      @loadProject (err, project) =>
        if err
          @display err
          callback? err, project
          return

        @loadStations (err, stations) =>
          @initializeStations()

          callback? err, stations
        , true

      , refresh

    loadStations: (callback, refresh) ->
# load full stations
#      fields = "_id user project station name parent type image longitude latitude desc map"
      fields = null
      @project.loadStations fields, (err, stations) =>
        callback? err, stations
      , refresh

    initializeStations: () ->
      @datacenters = @project.stations.roots

      ids =
        user: @$routeParams.user
        project: @$routeParams.project
        station: @$routeParams.station
      station = @project.stations.getItemByIds ids
      station ?= @project.stations.items[0]

      # data center is the station whose parent is null
      @datacenter = station?.root ? @datacenters[0]
      @selectStation station

    loadUsers: () ->
      @users = @project.model.starUsers

    loadEquipmentTemplates: (callback, refresh) ->
      fields = 'user project type vendor template name base index image'
      @project?.loadEquipmentTemplates {}, fields, (err, model) =>
        @equipmentTemplates = model
        callback? err, model
      , refresh

    filterEquipmentTemplate: ->
      (template) =>
        return false if not @equipment

        model = @equipment.model
        return template.model.type is model.type and template.model.vendor is model.vendor

    loadEquipment: (equipmentId, callback, refresh) ->
      return callback? 'null equipment' if not equipmentId?

      @station?.loadEquipment equipmentId, null, (err, model) =>
        @equipment = model
        return callback? err, model if err or not model

        @loadProperties (err, ps) =>
          callback? err, @equipment
        , refresh

      , refresh

    loadProperties: (callback, refresh) ->
      fields = null
      @equipment?.loadProperties fields, (err, model) =>
        @properties = model

        callback? err, model
      , refresh

    createStation: (parent) ->
      @station = @project.createStation parent

    selectDatacenter: (datacenter) ->
      return false if @datacenter is datacenter
      @datacenter = datacenter

      @selectStation datacenter

      return true

    selectStation: (station) ->
      return false if not station or @station is station
      @station = station

      # set url without save into navigation history
      @$location.search 'station', station?.model.station
        .replace()

      @publishEventBus 'select-station', station

      return true

    selectEquipmentType: (type) ->
      return false if @equipmentType and @equipmentType is type
      @equipmentType = type

      # set url without save into navigation history
      #      @$location.search 'type', type?.model.type
      #      .replace()

      return true

    filterEquipmentByType: () ->
      (item) =>
        return true if not @equipmentType

        item.model.type is @equipmentType.model.type

    selectEquipment: (equipment) ->
      return false if @equipment and @equipment is equipment
      @equipment = equipment

      type = @project.typeModels.equipmenttypes.getItemByIds type: equipment.model.type
      @selectEquipmentType type

      # set url without save into navigation history
      @$location.search 'equipment', equipment?.model.equipment
        .replace()

      return true

    saveProject: (callback) ->
      @project.save callback

    saveStation: (callback) ->
      @station.save callback

    removeStation: (callback) ->
      title = "删除机房确认: #{@datacenter.model.name}/#{@station.model.name}"
      message = "请确认是否删除机房: #{@datacenter.model.name}/#{@station.model.name}？删除后机房包括下属机房和设备将从系统中移除不可恢复！"
      @prompt title, message, (ok) =>
        return if not ok

        @station.remove (err, model) =>
# select datacenter
          @selectStation @datacenter

          # close the model after station has been removed
          $('#station-modal').modal('close')

          callback? err, model

    saveEquipment: (callback, equipment = @equipment) ->
      equipment.save (err, model) =>
        if not err and model?.equipment
          @$location.search 'equipment', model.equipment
            .replace()

          @$rootScope.reloadEquipment = true

        callback? err, model

    removeEquipment: (callback) ->
      title = "删除设备确认: #{@datacenter.model.name}/#{@station.model.name}/#{@equipment.model.name}"
      message = "请确认是否删除设备: #{@datacenter.model.name}/#{@station.model.name}/#{@equipment.model.name}？删除后设备和数据将从系统中移除不可恢复！"
      @prompt title, message, (ok) =>
        return if not ok

        @equipment.remove (err, model) =>

# switch to other equipment
          @selectEquipment @station.getFirstEquipmentByType @equipment.model.type

          @$rootScope.reloadEquipment = true

          # close the model after equipment has been removed
          $('#equipment-modal').modal('close')

          callback? err, model

    getNextName: (name, defaultName) ->
# find the last number in the name and increase 1
      return defaultName if not name

      name2 = name.replace /(\d*$)/, (m, p1) ->
        num = if p1 then parseInt(p1) + 1 else '-0'

    confirmActiveEvent2: (event, comment, forceToEnd) ->
# one active event only
      data =
        _id: event._id
        user: event.user
        project: event.project
        station: event.station
        equipment: event.equipment
        event: event.event

      @confirmData data, comment, forceToEnd

      if forceToEnd
        @eventLiveSession.forceEndEvent data
      else
        @eventLiveSession.confirmEvent data

    confirmData: (data, comment, forceToEnd) ->
      data.operator = @$rootScope.user.user
      data.operatorName = @$rootScope.user.name
      data.confirmTime = new Date
      data.comment = comment
      data.forceToEnd = forceToEnd

      data

    confirmActiveEvents2: (comment, forceToEnd) ->
# all active events belong to current project
      data =
        user: @project.model.user
        project: @project.model.project

      @confirmData data, comment, forceToEnd

      @eventLiveSession.confirmAllEvents data

    confirmEquipmentEvent2: (event, comment, forceToEnd) ->
# this may end 0...* active events belongs to this event
      data = event.getIds()

      @confirmData data, comment, forceToEnd

      # event may have multiple active events so that use confirm all event command
      @eventLiveSession.confirmAllEvents data

    confirmEquipmentEvents2: (equipment, comment, forceToEnd) ->
# this may end 0...* active events belongs to this event
      data = equipment.getIds()

      @confirmData data, comment, forceToEnd

      # event may have multiple active events so that use confirm all event command
      @eventLiveSession.confirmAllEvents data

    confirmStationEvents2: (station, comment, forceToEnd) ->
# match events belong to this station and its children station
      data = station.getIds()
      data.stations = station.stationIds

      #      console.log data
      @confirmData data, comment, forceToEnd

      # event may have multiple active events so that use confirm all event command
      @eventLiveSession.confirmAllEvents data

    confirmActiveEvents: (forceToEnd) ->
      action = if forceToEnd then "强制结束" else "确认"
      title = "#{action}所有活动告警"
      message = "请输入备注信息："

      @prompt title, message, (ok, comment) =>
        return if not ok

        @confirmActiveEvents2 comment, forceToEnd
      , true

    confirmActiveEvent: (event, forceToEnd) ->
      return if not event

      action = if forceToEnd then "强制结束" else "确认"
      title = "#{action}活动告警: #{event.stationName} / #{event.equipmentName} / #{event.name}"
      message = "请输入备注信息："

      @prompt title, message, (ok, comment) =>
        return if not ok

        @confirmActiveEvent2 event, comment, forceToEnd
      , true, event.comment

    confirmStationEvents: (station, forceToEnd) ->
      action = if forceToEnd then "强制结束" else "确认"
      title = "#{action}机房及其子机房下属所有告警: #{station.model.name}"
      message = "请输入备注信息："

      @prompt title, message, (ok, comment) =>
        return if not ok

        @confirmStationEvents2 station, comment, forceToEnd
      , true

    confirmEquipmentEvents: (equipment, forceToEnd) ->
      action = if forceToEnd then "强制结束" else "确认"
      title = "#{action}设备所有告警: #{equipment.station.model.name} / #{equipment.model.name}"
      message = "请输入备注信息："

      @prompt title, message, (ok, comment) =>
        return if not ok

        @confirmEquipmentEvents2 equipment, comment, forceToEnd
      , true

    confirmEquipmentEvent: (event, forceToEnd) ->
      return if not event

      action = if forceToEnd then "强制结束" else "确认"
      title = "#{action}设备告警: #{event.station.model.name} / #{event.equipment.model.name} / #{event.model.name}"
      message = "请输入备注信息："

      @prompt title, message, (ok, comment) =>
        return if not ok

        @confirmEquipmentEvent2 event, comment, forceToEnd
      , true, event.data.comment

    executeCommand2: (command, comment) ->
      model = command.model

      #      parameters = []
      #      for p in model.parameters
      #        parameters.push
      #          key: p.key
      #          value: p.value

      parameters = command.getParameterValues()

      data = command.getIds()
      #      data._id = model._id
      data.priority = model.priority
      data.phase = 'executing'
      data.parameters = parameters
      data.startTime = new Date
      data.endTime = null
      data.result = null
      data.trigger = 'user'
      data.operator = @$rootScope.user.user
      data.operatorName = @$rootScope.user.name
      data.comment = comment ? model.comment

      @commandLiveSession.executeCommand data

    cancelCommand2: (command, comment) ->
      return if not command._data

      data = {}
      for k, v of command._data
        data[k] = v

      data.phase = 'cancel'
      data.trigger = 'user'
      data.endTime = new Date
      data.operator = @$rootScope.user.user
      data.operatorName = @$rootScope.user.name
      data.comment = comment ? command.model.comment

      @commandLiveSession.executeCommand data

    executeCommand: (command, cancelCallback) ->
      return if not command

      title = "确认执行控制命令: #{command.station.model.name} / #{command.equipment.model.name} / #{command.model.name}"
      message = "请输入备注信息："

      @prompt title, message, (ok, comment) =>
        return cancelCallback?() if not ok

        @executeCommand2 command, comment
      , true, command.model.comment

    cancelCommand: (command, cancelCallback) ->
      return if not command

      title = "确认取消控制命令: #{command.station.model.name} / #{command.equipment.model.name} / #{command.model.name}"
      message = "请输入备注信息："

      @prompt title, message, (ok, comment) =>
        return cancelCallback?() if not ok

        @cancelCommand2 command, comment
      , true, command.model.comment

    dispose: ->
      super

      # make sure close all modals before routing to other page
#      $('.modal').each ->
#        $(this).modal('close')

#      @disposePopovers()

      #      $('#mobile-tooltip').webuiPopover('hide')

#      $('.side-nav').sideNav 'destroy'

      return

    disposePopovers: ->
# dispose all popovers but qrcode
#      $('.webui-popover:not(:has(#qrcode))').each ->
#        $(this).webuiPopover 'destroy'

      $('[popover]').each ->
        $(this).webuiPopover 'destroy'

# hide all popovers
#      WebuiPopovers.hideAll()

    selectGroup: (group) ->
      @group = group

    getDBKeyValues:(key, cb)->
      kvSrv = @modelManager.getService "keyvalues"
      await kvSrv.query {user:@project.model.user, project:@project.model.project, key: key}, null, defer err, @$scope.setting
      cb @$scope.setting?.value

    saveDBKeyValues:(key, value)->
      kvSrv = @modelManager.getService "keyvalues"
      if _.isEmpty @$scope.setting
        @$scope.setting =
          user: @project.model.user
          project: @project.model.project
          key: key
      @$scope.setting.value = value
      kvSrv.save @$scope.setting, (err, model) =>
        if err
          @prompt "温馨提示：",err


  exports =
    FeatureBaseController: FeatureBaseController
