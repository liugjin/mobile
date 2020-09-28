
define ['./base/feature-base-controller'], (base) ->

  class Ctrl extends base.FeatureBaseController
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, @$ionicPopover, @$ionicModal, @commonService, @$state) ->
      $routeParams.station = $rootScope.station.station if not $routeParams.station  and $rootScope.station
      super $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options
#      @init()


    init: ->
      @initModal()
      @equipSubscription?.dispose()
      @equipSubscription = @commonService.subscribeEventBus "selectEvent", (msg) =>
        #console.log msg.message
        @$routeParams = msg.message
        @$ionicModal.fromTemplateUrl('templates/event-detail.html',
          scope: @$scope
          animation: 'slide-in-up').then (modal) =>
            @emodal = modal
            @$scope.vm = @
            @emodal?.show()

      @goEquipSubscription?.dispose()
      @goEquipSubscription = @commonService.subscribeEventBus "goEquip", (msg) =>
        @emodal?.remove()
        @$state.go 'equipment', msg.message

    dispose: ->
      super
      @modal?.remove()
      @emodal?.remove()
      @equipSubscription?.dispose()
      @goEquipSubscription?.dispose()

    load: (callback, refresh) ->
      @init()
#      super (err, model) =>
#        @eventSeverity = {}
#        @eventSeverity = @project.typeModels.eventseverities.items[0]
##        console.log @eventSeverity, '<-- @eventSeverity'
#      , refresh

    initModal: ->
      @$ionicModal.fromTemplateUrl('templates/modals/event.html',
        scope: @$scope
        animation: 'slide-in-up').then (modal) =>
          @modal = modal
          @$scope.modal = modal
          @$scope.controller = @

    modalSelectStation: (station) ->
      @modal?.hide()
      @$timeout () =>
        @selectStation station
      , 500

    openModal: ->
      @modal.show()

    selectEvent: (event) ->
#      @openModal()
      super event

    selectEventSeverity: () ->

    goBack: () ->
      @emodal?.remove()

  exports =
    Ctrl: Ctrl
