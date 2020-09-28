#手机号码更换
define ['clc.foundation.angular/controllers/controller'], (base)->
  class PhoneNumberSettingCtrl extends base.Controller
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $timeout, @modelManager, @modelEngine, @uploadService, @options, @httpService, @$ionicHistory, @$ionicPopup)->
      super $scope, $rootScope, $routeParams, $location, $window

#      弹出弹窗
    showPop: =>
      @$scope.data = {}
      @popMsg =
        template: '<input type="number" ng-model="data.phone">',
        title: '请输入您要修改的手机号',
        scope: @$scope,
        buttons: [
          {
            text: '取消'
          }
          {
            text: '确定'
            type: 'button-positive'
            onTap: (e)=>
              if !@$scope.data.phone
                e.preventDefault()
              else
                return @$scope.data.phone
          }
        ]

      @myPop = @$ionicPopup.show @popMsg

      @myPop.then((res) =>
        if !res
          console.log "res为空"
        else

          console.log "result?" + res

          #        todo 更新个人信息


          #        userService = @modelManager.getService 'user'


          userService = @modelManager.getService 'user'
          @$rootScope.user.phone = res
          userService.update @$rootScope.user,(err,data)->

            console.log data

      )


    onBackPress: ->
      @$ionicHistory.goBack()

  exports=
    PhoneNumberSettingCtrl:PhoneNumberSettingCtrl
