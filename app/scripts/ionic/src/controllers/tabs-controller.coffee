


define ['clc.foundation.angular/controllers/controller'], (base) ->

  class Ctrl extends base.Controller

#    @$inject: [
#      '$scope'
#      '$rootScope'
#      '$stateParams'
#      '$location'
#      '$window'
#      '$state'
#      'cloudAuthService'
#      'toastService'
#      '$timeout'
#      'settingService'
#      '$ionicActionSheet'
#      'storage'
#      '$ionicModal'
#    ]
    constructor: ($scope, $rootScope, $routeParams, $location, $window, @$state, @cloudAuthService, @toastService, @$timeout, @settingService, @$ionicActionSheet, @storage, @$ionicPopover) ->
      super $scope, $rootScope, $routeParams, $location, $window
#      @init()
#
#
#    init: ->
#      @userId = @settingService.user
#      @projectId = @settingService.project
#      @stationKey = 'station'
#      @getStation()
#
#      @$ionicPopover.fromTemplateUrl('templates/modals/more.html', scope: @$scope).then (popover) =>
#        @popover = popover
#
#    dispose: ->
#      super
#      @popover?.remove()
#
#
#    getStation: ->
#      @$rootScope.station ?= @storage.get @stationKey
#
#
#    logout: ->
#      @popover.hide()
#      @$state.go 'logout'
#
#
#    goVideo: ->
#      @popover.hide()
#      @$state.go 'video', {user: @userId, project: @projectId, station: @$rootScope.station?.station}
#
#
#
#    more: ($event) ->
##      document.body.classList.remove('platform-ios')
##      document.body.classList.remove('platform-android')
##      document.body.classList.add('platform-ios')
#      @popover.show($event)
#      return

#      @$ionicActionSheet.show
#        titleText: '更多操作'
#        buttons: [
#          { text: '<i class="icon ion-ios-videocam-outline"></i> 视频监控' }
#        ]
#        destructiveText: '退出登录'
#        cancelText: 'Cancel'
#        cancel: ->
#          console.log 'CANCELLED'
#          return
#        buttonClicked: (index) =>
##          console.log 'BUTTON CLICKED', index
#          switch index
#            when 0
#              @$state.go 'video', {user: @userId, project: @projectId, station: @$rootScope.station?.station}
#              true
#            else
#              true
#        destructiveButtonClicked: =>
#          @$state.go 'logout'
#          true





  exports =
    Ctrl: Ctrl
