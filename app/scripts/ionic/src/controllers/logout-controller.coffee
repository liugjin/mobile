
define ['clc.foundation.angular/controllers/controller'], (base) ->

  class LogoutController extends base.Controller
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $state, cloudAuthService, storage) ->
      super $scope, $rootScope, $routeParams, $location, $window


      (storage.set 'station', @$rootScope.station.model) if @$rootScope.station?.model
      cloudAuthService.logout()
      $state.go 'login', {fromUrl: 'logout'}


  exports =
    LogoutController: LogoutController
