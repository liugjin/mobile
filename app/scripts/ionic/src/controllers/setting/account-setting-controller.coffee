define ['clc.foundation.angular/controllers/controller'],(base)->
#  账号设置控制器
  class AccountSettingCtrl extends base.Controller
    constructor:($scope, $rootScope, $routeParams, $location, $window,@$ionicHistory)->
      super $scope, $rootScope, $routeParams, $location, $window


#      返回
    onBackPress:->
      @$ionicHistory.goBack()

  exports =
    AccountSettingCtrl:AccountSettingCtrl

