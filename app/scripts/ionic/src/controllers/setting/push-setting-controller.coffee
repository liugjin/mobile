define ['clc.foundation.angular/controllers/controller'], (base)->
#  推送设置控制器
  class PushSettingCtrl extends base.Controller
    constructor :(@$scope,$rootScope,$routeParams,$location,$window,@$ionicHistory)->
      super @$scope,$rootScope,$routeParams,$location,$window
#      @调用当期类的方法??
      @init()

    init:->
      @$scope.push = false
      @$scope.SMS = false;
      @$scope.email = false

    onBackPress:->
      @$ionicHistory.goBack()


    pushChange:->
      @$scope.push = !@$scope.push
      console.log('push的值:'+@$scope.push)

    SMSChange:->
      @$scope.SMS = !@$scope.SMS
      console.log("SMS的值:"+@$scope.SMS)

    emailChange:->
      @$scope.email = !@$scope.email
      console.log("email的值:"+@$scope.email)


  exports =
    PushSettingCtrl:PushSettingCtrl
