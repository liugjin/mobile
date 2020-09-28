
define [
  './base/feature-base-controller',
  'clc.foundation.angular/filters/format-string-filter',
  'moment',
  'rx'
  'underscore'
], (base, fsf, moment, Rx, _) ->

  class Ctrl extends base.FeatureBaseController
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, @$ionicPopover, @$ionicModal, @commonService, @$state, @$ionicPopup, @$ionicActionSheet,@$cordovaCamera,@$ionicHistory) ->
      super $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options
      @init()

    init: () =>
      @initModal()
      @equipSubscription?.dispose()
      @equipSubscription = @commonService.subscribeEventBus "task-model", (msg) =>
        console.log "msg",msg
        @$routeParams.msg = msg
        @$routeParams.task = msg.message.task.task
        console.log("$routeParams",@$routeParams)
        @$ionicModal.fromTemplateUrl('templates/order-detail.html',
          scope: @$scope
          animation: 'slide-in-up').then (modal) =>
            @emodal = modal
            @$scope.vm = @
            @emodal.show()
        # @$routeParams.orderId = msg.message.orderId
        # @$routeParams.name = msg.message.name
        # @$routeParams.message = msg.message
        # @process = msg.message.process
        # @$ionicModal.fromTemplateUrl('templates/order-detail.html',
        #   scope: @$scope
        #   animation: 'slide-in-up').then (modal) =>
        #     @emodal = modal
        #     @$scope.vm = @
        #     @emodal.show()

      @updateNodeResult?.dispose()
      @updateNodeResult = @commonService.subscribeEventBus "updateNodeResult", (msg) =>
        #console.log msg
        if not msg.message.err and msg.message.result
          @$timeout =>
            @$ionicPopup.show {
              title: '提交成功!',
              buttons: [
                {
                  text: "确认",
                  type: "button-positive",
                  onTap: (e) =>
                    @goBack(true)
                }
              ]
            }
          , 600
        else
          @$timeout =>
            @$ionicPopup.show {
              title: '提交失败!',
              buttons: [
                {
                  text: "确认",
                  type: "button-positive",
                  onTap: (e) =>
                }
              ]
            }
          , 600

    initModal: () =>
      @$ionicModal.fromTemplateUrl('templates/order-node.html', scope: @$scope, animation: 'slide-in-up')
        .then (modal) =>
          @nmodal = modal
          @$scope.vm = @
      @$ionicModal.fromTemplateUrl('templates/order-detail.html', scope: @$scope, animation: 'slide-in-up')
        .then (modal) =>
          @emodal = modal
          @$scope.vm = @

    showConfirm: () =>
      @$timeout =>
        confirmPopup = @$ionicPopup.confirm {
          title: '接收确认'
          template: '确定接收此工单？'
        }
        confirmPopup.then (res) =>
          if res
            @emodal?.show()
      , 600

    goBack: (refresh) =>
      console.log("返回了页面")
      @emodal?.remove()
      @nmodal?.remove()
      @refreshTaskReport(true)

    gotab:()=>
      @$state.go 'tab.overview', {user: @$routeParams.user, project: @$routeParams.project}

    refreshTaskReport: (refresh) =>
      @commonService.publishEventBus "refreshTaskReport", { refresh: refresh }

    dispose: ->
      @emodal?.remove()
      @nmodal?.remove()
      @equipSubscription?.dispose()
      @updateNodeResult?.dispose()

  exports =
    Ctrl: Ctrl
