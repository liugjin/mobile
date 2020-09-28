
define ['clc.foundation.angular/controllers/controller'], (base) ->

  class Ctrl extends base.Controller
    constructor: ($scope, $rootScope, $routeParams, $location, $window, @$state, @cloudAuthService, @toastService, @$timeout, @settingService, @$ionicModal) ->
      super $scope, $rootScope, $routeParams, $location, $window


  exports =
    Ctrl: Ctrl
