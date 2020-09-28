
define [
  './base/graphic-base-controller',
  'clc.foundation.angular/filters/format-string-filter',
  'moment',
  'rx'
  'underscore'
], (base, fsf, moment, Rx, _) ->

  class Ctrl extends base.GraphicBaseController
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, @$ionicPopover, @$ionicModal, @$ionicTabsDelegate, @commonService, @$state) ->
      super $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options
      @init()

#    initialize: ->
#      super
#      @init()

    init: ->
      @equipments = []
#      @formatString = fsf.FormatStringFilter()
      @initModal()
      @equipSubscription?.dispose()
      @equipSubscription = @commonService.subscribeEventBus "selectEquipment", (msg) =>
        #console.log msg.message
        @currentEquipInfo = msg.message
        @templateId = @currentEquipInfo.templateId
#        setTimeout =>
        @templateParameters = {station: @currentEquipInfo.stationId, equipment: @currentEquipInfo.equipmentId}
#        ,100
#        @equipment = _.find @equipments, (equip)->equip.model.station is msg.message.stationId and equip.model.equipment is msg.message.equipmentId
#        @equipment?.loadEquipmentTemplate null, (err, template) =>
#          @templateId = @equipment.getTemplateValue 'directive'
#          setTimeout =>
#            @templateParameters = {station: @equipment.model.station, equipment: @equipment.model.equipment}
#          ,100
        @$ionicModal.fromTemplateUrl('templates/equipment.html',
          scope: @$scope
          animation: 'slide-in-up').then (modal) =>
            @emodal = modal
            @$scope.vm = @
            @emodal.show()

      @subscription?.dispose()
      @subscription = @commonService.subscribeEventBus "navigateTo", (msg) =>
#        M.Tabs.getInstance($("#tabs")).select('history')
        event = new MouseEvent "click", {
          bubbles: true,
          cancelable: true,
          view: window
        }
        event.isIonicTap = true
        $("a[href='#history']")[0].dispatchEvent event
        setTimeout =>
          @commonService.publishEventBus "signalId", {stationId:msg.message.stationId, equipment: msg.message.equipmentId, signalId: msg.message.signalId}
        ,10

    onTemplateLoad: ->
      return

    dispose: ->
      super
      @modal?.remove()
      @emodal?.remove()
      @equipSubscription?.dispose()
      @subscription?.dispose()

    openModal: ->
      @datacenters = @project.stations.roots
      @datacenters = _.filter @datacenters, (station) => station.model.station.charAt(0) isnt "_"
      @modal.show()

    closeModal: () =>
      @modal?.hide()

    initModal: ->
      @$ionicModal.fromTemplateUrl('templates/modals/station.html',
        scope: @$scope
        animation: 'slide-in-up').then (modal) =>
          @modal = modal
          @$scope.vm = @

#      @$ionicModal.fromTemplateUrl('templates/equipment.html',
#        scope: @$scope
#        animation: 'slide-in-up').then (modal) =>
#          @emodal = modal
#          @$scope.vm = @

    modalSelectStation: (station) ->
      @modal.hide()
      @$timeout () =>
        @selectStation station
#        @loadEquipments (err, equipments) =>
#          @equipments = equipments
      , 10

    initializeStations: () ->
      @datacenters = @project.stations.roots
      @datacenters = _.filter @datacenters, (station) => station.model.station.charAt(0) isnt "_"
      @$routeParams.station = @$rootScope.station.station if not @$routeParams.station and @$rootScope.station
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
      # set url without save into navigation history
#      @$location.search 'station', station?.model.station
#        .replace()
      @$rootScope.station = @station.model
      return true

    load: (callback, refresh) ->
      super (err, model) =>
#        @loadEquipments (err, equipments) =>
#          @equipments = equipments
#          console.log @$rootScope.project, '<-- signal project'
#          console.log @$routeParams, '<-- $routeParams'
        callback? err, model
      , refresh

    loadEquipments: (callback) ->
#      return callback?()
      @showStations = @getStations @station
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
      fields = 'user project station equipment name template properties type parent image'
      #      fields = null
      station.loadEquipments filter, fields, (err, equips) =>
        return callback? err, [] if err
        equips = _.filter equips, (e) -> e.model.type isnt '_station_management'
        callback? err, equips
      , true

    getStations: (station) ->
      return [] if not station
      stations = [station]
      stations = stations.concat(station.stations) if station.stations and station.stations.length
      for s in station.stations
        stations = stations.concat(s.stations) if s.stations and s.stations.length
      stations

    getItemHeight: (index, length) ->
      if index is (length - 1) then '220px' else '100px'

    goBack: ->
      @emodal?.remove()

  exports =
    Ctrl: Ctrl
