#重置密码
define ['clc.foundation.angular/controllers/controller',
  'tripledes'], (base,tripledes)->
  class ResetPasswordSettingCtrl extends base.Controller
    constructor: ($scope, $rootScope, $routeParams, $location, $window, @$state, @toastService, @$timeout, @settingService,@$ionicHistory,@modelManager) ->
      super $scope, $rootScope, $routeParams, $location, $window

    submitChange:=>
      @oldPsw
      @newPsw
      @confirmPsw

      psw = @_decrypt @$rootScope.user.password,@$rootScope.user.name
#      console.log '密码:'+psw
      if !@oldPsw is undefined or @newPsw is undefined or @confirmPsw is undefined
        @toastService '输入不能为空'
      else
        if psw isnt @oldPsw
          console.log '旧密码不对!'
          @toastService '您输入的旧密码有误!'
        else
          if @newPsw isnt @confirmPsw
            @toastService '两次密码输入不一致'
          else
#            TODO 更新密码
            newPsw = @_encrypt @newPsw,@$rootScope.user.name

            changePswService = @modelManager.getService 'changePassword'
#            changePswService.url = changePswService.url.replace('#/', '')

            @data =
              oldPassword:@$rootScope.user.password
              password:newPsw
              user:@$rootScope.user.name


#            url = @settingService.
#            @$rootScope.user.password = newPsw
            changePswService.create @data, (err, result)=>

#              @toastService err if err
#
#            console.log newPsw





#      密码解密
    _decrypt: (encrypted, secret) ->
      CryptoJS.DES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8)
#    密码加密
    _encrypt: (message, secret) ->
      CryptoJS.DES.encrypt(message, secret).toString()


    onBackPress: ->
      @$ionicHistory.goBack()

  exports =
    ResetPasswordSettingCtrl:ResetPasswordSettingCtrl
