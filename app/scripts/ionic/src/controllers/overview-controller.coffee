
define [
  './base/feature-base-controller',
  'clc.foundation.angular/filters/format-string-filter',
  'moment',
  'rx'
  'underscore'
], (base, fsf, moment, Rx, _) ->

  class Ctrl extends base.FeatureBaseController
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, @$ionicPopover, @$ionicModal, @commonService) ->
      super $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options
      @init()

#    initialize: ->
#      super
#      @init()


    init: ->
      @equipments = []
#      @formatString = fsf.FormatStringFilter()
#      @initModal()

    dispose: ->
      super
      @modal?.remove()
      @maintasksSubscri?.dispose()

    openModal: ->
      @datacenters = @project.stations.roots
      @datacenters = _.filter @datacenters, (station) => station.model.station.charAt(0) isnt "_"
      @initModal()

    closeModal: () =>
      @modal?.remove()

    initModal: ->
      @$ionicModal.fromTemplateUrl('templates/modals/station.html',
        scope: @$scope
        animation: 'slide-in-up').then (modal) =>
          @modal = modal
          @$scope.vm = @
          @modal.show()

    selectOrder: (order) ->
      @$routeParams.orderId = order.task
      @$routeParams.name = order.name
      @$ionicModal.fromTemplateUrl('templates/order-node.html',
        scope: @$scope
        animation: 'slide-in-up').then (modal) =>
          @emodal = modal
          @$scope.vm = @
          @emodal.show()

    modalSelectStation: (station) ->
      @modal.remove()
      @$timeout () =>
        @selectStation station
      , 10

    initializeStations: () ->
      @datacenters = @project.stations.roots
      @datacenters = _.filter @datacenters, (station) => station.model.station.charAt(0) isnt "_"
      @$routeParams.station = @$rootScope.station.station if not @$routeParams.station  and @$rootScope.station
      ids =
        user: @$routeParams.user
        project: @$routeParams.project
        station: @$routeParams.station
      station = @project.stations.getItemByIds ids
      #      station ?= @project.stations.items[0]
      # data center is the station whose parent is null
      @datacenter = station?.root ? @datacenters[0]
      station = station or @datacenter
      @selectStation station

    selectStation: (station) ->
      return false if not station or @station is station
      @station = station
#      station.loadEquipment "_station_management", null, (err, equipment) =>
#        equipment?.loadSignals() if not err
      # set url without save into navigation history
#      @$location.search 'station', station?.model.station
#        .replace()
      @$rootScope.station = @station.model
      return true

    load: (callback, refresh) ->
      super (err, model) =>
        preference = JSON.parse(localStorage.getItem 'project-preference') ? {}
        preference[@$rootScope.user.user] = @project.model.user+"."+@project.model.project
        localStorage.setItem 'project-preference', JSON.stringify preference
        @allTasks = []
        @startTasks = []
        @endTasks = []
        @queryTaskReport()
        @subscribeTasks()
#        @loadEquipments (err, equipments) =>
#          @equipments = equipments
#          @alarmEquipments = {}
#          @alarmEquipmentsCount = 0
#          @subscribeEvents()
        callback? err, model
      , refresh

    # 查询工单报表
    queryTaskReport: () =>
      @commonService.loadProjectModelByService 'tasks', {}, null, (err, taskModels) =>
        return if err or not taskModels or taskModels.length < 1
        @allTasks = taskModels
        @filterTasks()
      , true

    # 订阅工单
    subscribeTasks: () =>
      user = @$rootScope.user.user
      topic = "tasks/#{user}/#"
      @maintasksSubscri?.dispose()
      @maintasksSubscri = @commonService.configurationLiveSession.subscribe topic, (err, d) =>
        return if not d
        #console.log d
        if d.topic.indexOf("configuration/task/create/") is 0 or d.topic.indexOf("configuration/task/update/") is 0
          index = _.findIndex @allTasks, (task) => task._id is d.message._id
          #console.log index
          if index >=0
            @allTasks.splice(index, 1, d.message)
          else
            @allTasks.push d.message
        if d.topic.indexOf("configuration/task/delete/") is 0
          index = _.findIndex @allTasks, (task) => task._id == d.message._id
          #console.log index
          if index >=0
            @allTasks.splice(index, 1)
        @filterTasks()

    # 对工单进行过滤
    filterTasks: () =>
      @startTasks = []
      @endTasks = []
      _.each @allTasks, (task) =>
        if _.isEmpty(task.phase?.nextManager) && !(task.phase?.progress >= 0)
          console.log("等待处理")
          @startTasks.push task
        else if task.phase?.state is "reject"
          console.log("拒绝")
        else if task.phase?.state is "cancel"
          console.log("取消")
        else if (task.phase?.progress < 1) || !_.isEmpty(task.phase?.nextManager)
          console.log("进行中")
          @startTasks.push task
        else
          console.log("已结束")
          @endTasks.push task

    goBack: (refresh) =>
      @emodal?.remove()

    loadEquipments: (callback) ->
#      return callback?()
      @showStations = @getStations @station
#      @showStations =  @project.stations.items
      _loadStationEquipments = Rx.Observable.fromCallback @loadStationEquipments
      observableBatch = _.map @showStations, (s) -> (_loadStationEquipments s)
      Rx.Observable.forkJoin(observableBatch).subscribe(
        (resArr) ->
          result = []
          _.each resArr, (item) -> result = result.concat item[1]
          callback? null, result
      )

    loadStationEquipments: (station, callback) ->
#      filter = {'type': {"$ne": "_station_management"}}
      filter = null
      fields = 'user project station equipment name template properties type parent'
      #      fields = null
      station.loadEquipments filter, fields, (err, equips) =>
        return callback? err, [] if err
        equips = _.filter equips, (e) -> e.model.type isnt '_station_management' and e.model.equipment.substr(0,1) isnt "_"
        callback? err, equips
      , true
#
#
#    subscribeEvents: () ->
#      filter =
#        user: @project.model.user
#        project: @project.model.project
#        station: @station.model.station
#
#      @eventSubscriptions?.dispose()
#      @eventSubscriptions = @eventLiveSession.subscribeValues filter, (err, d) =>
##        console.log err ? d
#        @processEvent d
#
#    processEvent: (data) ->
#      return if not data
#
#      msg = data.message
#      @alarmEquipments[msg.equipment] ?= {}
#      @alarmEquipments[msg.equipment][msg.event] ?= 0
#      if msg.phase is 'start'
#        @alarmEquipments[msg.equipment][msg.event]++
#      else
#        @alarmEquipments[msg.equipment][msg.event]-- if @alarmEquipments[msg.equipment][msg.event] >= 1
#
#      count = 0
#      for k, v of @alarmEquipments
#        count2 = 0
#        for kk, vv of v
#          count2 += v
#        count++ if count2
#
#      @alarmEquipmentsCount = count

    getStations: (station) ->
      return [] if not station
      stations = [station]
      stations = stations.concat(station.stations) if station.stations and station.stations.length
      for s in station.stations
        stations = stations.concat(s.stations) if s.stations and s.stations.length
      stations

#    getItemHeight: (index, length) ->
#      if index is (length - 1) then '220px' else '100px'

  exports =
    Ctrl: Ctrl
