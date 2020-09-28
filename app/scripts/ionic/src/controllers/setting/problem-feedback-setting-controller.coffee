#问题反馈界面
define ['clc.foundation.angular/controllers/controller'], (base)->
  class ProblemFeedbackSettingCtrl extends base.Controller
    constructor:($scope, $rootScope, $routeParams, $location, $window,@$ionicHistory)->
      super $scope, $rootScope, $routeParams, $location, $window


    onBackPress: ->
      @$ionicHistory.goBack()


#      提交按钮  待添加事件
    onSubmit: ->
#      @feedbackData={}
#      @data.feedback = @$scope.data.feedback
      console.log '点击onSubmit'
      console.log @data.feedback

  exports =
    ProblemFeedbackSettingCtrl:ProblemFeedbackSettingCtrl
