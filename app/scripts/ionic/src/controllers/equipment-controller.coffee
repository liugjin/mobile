

define ['./base/graphic-base-controller', 'moment'], (base, moment) ->

  class Ctrl extends base.GraphicBaseController
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, @$ionicPopover, @$ionicModal, @$ionicTabsDelegate, @commonService, @$state) ->
      super $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options

#      @searchSignal = ''
#      @signalGroup = 'all'
#      @historyDataTab = 'data'
#      @statisticDataTab = 'data'

    load: ->
      super (err, data) =>
        @station.loadEquipment @$routeParams.equipment, null, (err, equipment) =>
          @equipment = equipment if not err
          @currentEquipInfo = {stationId: @equipment.model.station, equipmentId: @equipment.model.equipment, type: @equipment.model.type, name: @equipment.model.name} if @equipment
          @equipment?.loadEquipmentTemplate null, (err, template) =>
            @templateId = @equipment.getTemplateValue 'directive'
            setTimeout =>
              @templateParameters = {station: @equipment.model.station, equipment: @equipment.model.equipment}
            ,100
#      setTimeout  =>
#        @$ionicTabsDelegate.select 1
#      , 2000
#      @query =
#        startTime: moment().startOf("day")
#        endTime: moment().endOf("day")
#        period: "day"
        @subscription?.dispose()
        @subscription = @commonService.subscribeEventBus "navigateTo", (msg) =>
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
#          @$ionicTabsDelegate.select 1
#          setTimeout =>
#            @commonService.publishEventBus "signalId", {stationId:msg.message.stationId, equipment: msg.message.equipmentId, signalId: msg.message.signalId}
#          ,10

    onTemplateLoad: ->
      return
#
    goBack: ->
      # console.log "goBack"
      if @$routeParams.origin
        @$state.go 'scan', {user: @$routeParams.user, project: @$routeParams.project, origin: @$routeParams.origin}
      else
        @$state.go 'tab.signal', {user: @$routeParams.user, project: @$routeParams.project, station: @$routeParams.station}
#
#    setSignalGroupFilter: (group) ->
#      @searchSignal = if group is 'all' then '' else group
#      @signalGroup = group
#
#
#    selectDate: () ->
##      option =
##        callback: (val) =>
##          @period.startTime = moment(val).startOf 'day'
##          @period.endTime = moment(val).endOf 'day'
##          @period.type = 'day'
##          @querySignalRecords(null, "refresh")
##        inputDate: @period.startTime.toDate()
##
##      @ionicDatePicker.openDatePicker option
#
#
#    selectHistoryDataTab: (tab) ->
#      @historyDataTab = tab
#
#    selectStatisticDataTab: (tab) ->
#      @statisticDataTab = tab
#
#
#    resizeGraphic: () ->
#      @$timeout =>
#        @stretch()
#      , 250

    dispose: ->
      super
      @subscription?.dispose()

  exports =
    Ctrl: Ctrl
