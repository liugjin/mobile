#功能介绍
define ['clc.foundation.angular/controllers/controller'], (base)->
  class FunctionIntroductionCtrl extends base.Controller
    constructor:($scope, $rootScope, $routeParams, $location, $window,@$ionicHistory)->
      super $scope, $rootScope, $routeParams, $location, $window


    onBackPress: ->
      @$ionicHistory.goBack()

  exports =
    FunctionIntroductionCtrl:FunctionIntroductionCtrl
