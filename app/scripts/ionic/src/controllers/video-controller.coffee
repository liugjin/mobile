


define ['./base/feature-base-controller'], (base) ->

  class Ctrl extends base.FeatureBaseController
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, @$ionicHistory, @$ionicPopover, @$ionicModal, @$state) ->
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


      #      playURI = "rtsp://admin:12345zqjZQJ@11066d1b.nat123.net:22732/h264/ch1/main/av_stream"
#      playURI = 'rtsp://admin:12345@192.168.0.22:554/streaming/channels/401'
#      vlcVideoPlugin = window.plugins.vlcVideoPlugin
#      vlcVideoPlugin.playURI(playURI)

    play: ->
      playURI = 'rtsp://admin:12345@192.168.0.22:554/streaming/channels/401'
      vlcVideoPlugin = window.plugins?.vlcVideoPlugin
      vlcVideoPlugin?.playURI(playURI)

    goBack: ->
#      @$ionicHistory.goBack()
      @$state.go 'tab.signal', {user: @project.model.user, project: @project.model.project, station: @station.model.station}

  exports =
    Ctrl: Ctrl
