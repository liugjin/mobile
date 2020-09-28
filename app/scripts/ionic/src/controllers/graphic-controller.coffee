
define ['./base/graphic-base-controller'], (base) ->

  class Ctrl extends base.GraphicBaseController
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, @$ionicPopover, @$ionicModal) ->
      $routeParams.station = $rootScope.station.station if not $routeParams.station  and $rootScope.station
      super $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options
      @init()



    init: ->
      @initModal()


    dispose: ->
      super
      @modal?.remove()

    initModal: ->
      @$ionicModal.fromTemplateUrl('templates/modals/station.html',
        scope: @$scope
        animation: 'slide-in-up').then (modal) =>
          @modal = modal
          @$scope.modal = modal
          @$scope.controller = @


    modalSelectStation: (station) ->
      @modal.hide()
      @$timeout () =>
        @selectStation station
      , 500


    openModal: ->
      @modal.show()

    selectStation: (station) ->
      return false if not super station

      @loadStationGraphic station
#      @setMapOptions station

#      @loadEquipments()
      return true

    loadStationGraphic: (station = @station, refresh) ->
      return if not station

      @templateId =
        user: @$routeParams.user
        project: @$routeParams.project
        template: station.model.graphic or station.model.map

      @templateId.timestamp = new Date if refresh
      @templateId

#      @stationId = @$stateParams.id
#
#      @viewTitles =
#        'high-voltage-station': '高压变电所'
#        'low-voltage-station': '低压变电所'
#      @viewTitle = @viewTitles[@stationId] or @viewTitles['high-voltage-station']
#
#      @routeParams =
#        user: 'clc'
#        project: 'sfere'
#        station: 'high-voltage-station'
#        type: '1'
#
#      @graphicOptions =
#        engineOptions:
#          parameters: @routeParams
#        renderOptions:
#          editable: false
#          type: @$stateParams.renderer ? @$rootScope.renderType ? 'snapsvg'
#          uploadUrl: 'http://cloudview.sfere-elec.com/resource/upload/img/public'
#
#      @templateId =
#        user: 'clc'
#        project: 'sfere'
##        template: 'system-monitoring'
#        template: 'distri-room'
#        timestamp: new Date


  exports =
    Ctrl: Ctrl
