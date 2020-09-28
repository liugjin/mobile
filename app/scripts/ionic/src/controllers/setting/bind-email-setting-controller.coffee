#绑定邮箱
define ['clc.foundation.angular/controllers/controller'], (base)->
  class BindEmailSettingCtrl extends base.Controller
    constructor:($scope, $rootScope, $routeParams, $location, $window,@$ionicHistory)->
      super $scope, $rootScope, $routeParams, $location, $window


    onBackPress: ->
      @$ionicHistory.goBack()

  exports =
    BindEmailSettingCtrl:BindEmailSettingCtrl
