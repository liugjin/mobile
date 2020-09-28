
define ['./base/feature-base-controller', 'clc.foundation.angular/filters/format-string-filter', 'json!../update.json'], (base, fsf, version) ->

  class SettingController extends base.FeatureBaseController
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, @$ionicPopover, @$ionicModal, @commonService, @$state, @$ionicPopup) ->
      super $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options

      @pageItems = 30
      @predicate = ['stared', 'updatetime']

      @init()


    init: ->
#      @equipments = []
      #@formatString = fsf.FormatStringFilter()
      @versionIndex = []
      @versionUpdate = version
      _.map @versionUpdate, (value, key) =>
        @versionIndex.push key
      @initModal()

    dispose: ->
      super
      @modal?.remove()

    openModal: ->
      @modal.show()

    #openModal1: ->
    #  @modal1.show()

    initModal: ->
      @$ionicModal.fromTemplateUrl('templates/modals/user.html',
        scope: @$scope
        animation: 'slide-in-up').then (modal) =>
          @modal = modal
          @$scope.modal = modal
          @$scope.controller = @
      #@$ionicModal.fromTemplateUrl('templates/modals/more.html',
      #  scope: @$scope
      #  animation: 'slide-in-up').then (modal) =>
      #    @modal1 = modal
      #    @$scope.modal = modal
      #    @$scope.controller = @

    load: (callback, refresh) ->
      super (err, model) =>
        @loadProjects callback, refresh

        callback? err, model
      , refresh

    loadProjects: (callback, refresh) ->
      # load project including dcim keyword (case insensitive)
      filter =
        keywords:
          $elemMatch:
            $regex: 'industry'
            $options: 'i'

      fields = 'user _id project name image updatetime stars keywords desc'

      @query filter, fields, (err, model) =>
        @items = _.filter @items, (item) -> ~(item.keywords.indexOf 'app')

        callback? err, model
      , refresh

    showConfirm: () =>
      confirmPopup = @$ionicPopup.confirm {
        title: '退出确认'
        template: '确定退出登录？'
      }
      confirmPopup.then (res) =>
        if res
          @$state.go 'logout', {}


  exports =
    SettingController: SettingController
