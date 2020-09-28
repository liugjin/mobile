#更换邮箱
define ['clc.foundation.angular/controllers/controller','clc.foundation.angular/services/http-service'], (base,http)->
  class ChangeEmailSettingCtrl extends base.Controller
#    constructor:($scope, $rootScope, $routeParams, $location, $window,@$ionicHistory,@$ionicPopup,@httpService)->
    constructor:($scope, $rootScope, $routeParams, $location, $window, $timeout, @modelManager, @modelEngine, @uploadService, @options, @httpService,@$ionicHistory,@$ionicPopup)->
      super $scope, $rootScope, $routeParams, $location, $window

#      弹出弹窗
    showPop:=>
      @$scope.data ={}
      @popMsg =
       template:'<input type="email" ng-model="data.email">',
       title:'请输入您要修改的邮箱',
       scope:@$scope,
       buttons:[
         {text:'取消'
         }
         {
           text:'确定'
           type:'button-positive'
           onTap: (e)=>
             if !@$scope.data.email
               e.preventDefault()
             else
               return @$scope.data.email
         }
       ]

      @myPop = @$ionicPopup.show @popMsg

      @myPop.then( (res) =>

        if !res
          console.log 'res为空'
        else
          console.log "result?"+res

#          todo 更新个人信息


#          userService = @modelManager.getService 'user'



          userService = @modelManager.getService 'user'
          @$rootScope.user.email = res
          userService.update @$rootScope.user

#          userService.get {user:@$rootScope.user.user}, (err, user)=>
#            user.email = res
#            userService.update user


#          console.log http
#          @httpService.post(url,null,(err, data)->
#            console.log data
#          )
      )







    onBackPress: ->
      @$ionicHistory.goBack()



  exports =
    ChangeEmailSettingCtrl:ChangeEmailSettingCtrl
