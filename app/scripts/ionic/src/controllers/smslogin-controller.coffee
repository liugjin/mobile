define ['clc.foundation.angular/controllers/controller'], (base) ->
  class Ctrl extends base.Controller
    constructor: ($scope, $rootScope, $routeParams, $location, $window, @$state, @cloudAuthService, @toastService, @$timeout, @settingService, @$ionicModal, @$http, @modelManager, @modelEngine) ->
      super $scope, $rootScope, $routeParams, $location, $window
      @ismail = false
      @isLogin = false
      @TIME = null

    doLogin: =>
      if !@smscode
        M.toast {html: '验证码不能为空'}
        return
      if !@code || !@smscode || @smscode.toString() != @code.toString()
        M.toast {html: '验证码不正确'}
        return
      @isLogin = true
      url = "http://#{@$rootScope.preference.ip}/auth/loginbysmscode/#{@phone}/#{@code}"
      @$http.post(url, {}).then (res) =>
#        console.info res
        if res.data && res.data.user
          M.toast {html: '登录成功'}
          #保存项目选择到本地偏好
          if localStorage.getItem 'preference'
            preference = JSON.parse localStorage.getItem 'preference'
            preference.user = res.data.user
            localStorage.setItem 'preference',JSON.stringify preference
          else
            preference =
              user: res.data.user
            localStorage.setItem 'preference',JSON.stringify preference
          @$rootScope.preference = preference
          @$rootScope.user = res.data

          @$timeout =>
            @$state.go 'portal', {}, {reload: true}
          , 1000
        else
          M.toast {html: '登录失败'}

    isPoneAvailable: (str) ->
      strreg= /^[1][3,4,5,7,8][0-9]{9}$/
      if !strreg.test str
        return false
      else
        return true
        
    sendsmscode: () =>
      return if not @phone
      if !@isPoneAvailable(@phone)
        return M.toast {html: "手机号码格式不正确"}
      @ismail = true
      @TIME = 30
      @timer = setInterval () =>
        @$scope.$applyAsync () =>
          @TIME--
          if @TIME < 0
            clearInterval @timer
            @TIME = null
            @ismail = false
      ,1000
      url = "http://#{@$rootScope.preference.ip}/auth/sendsmscode/#{@phone}"
      @$http.post(url, {}).then (res) =>
        console.info 'res',res.data
        if res.data && res.data.code
          @code = res.data.code
          M.toast {html: "手机验证码已发送到您手机上，10分钟内有效"}
        else
          @$http.post(url, {}).then (res) =>
            @code = res.data.code
      ,(err) =>
        console.info 'err',err

  exports =
    Ctrl: Ctrl
