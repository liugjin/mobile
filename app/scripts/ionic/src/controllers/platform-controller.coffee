define ['clc.foundation.angular/controllers/controller'], (base) ->
  class Ctrl extends base.Controller
    constructor: ($scope, $rootScope, $routeParams, $location, $window, @$state, @cloudAuthService, @toastService, @$timeout, @settingService, @$ionicModal, @$http, @modelManager, @modelEngine) ->
      super $scope, $rootScope, $routeParams, $location, $window
#      @$http.get(setting.entranceUrl).then (res) =>
#        if res.data && res.data.value
#          @platform = res.data.value
#          @selectPlatform = @platform[0].ip + '&' + @platform[0].token if @platform[0]
#          @doRegister()
#      ,(err) =>
#        console.info 'err',err
#      @platform = [{ "ip": "127.0.0.1", "name": "实验平台", "token": "dd0e5800-3b09-11e9-a80b-255cc9995573" }]
#      @platform = [{ "ip": "192.168.1.104", "name": "科华高速", "token": "0d7759a0-cd64-11e9-a113-d5c44dbc5c3c" }]
#      @platform = [{ "ip": "10.239.15.1", "name": "华润数据中心", "token": "6b89b4b0-a1ff-11e9-92d3-ed343dcdae0b" }]
#      @platform = [{ "ip": "47.107.78.8", "name": "中移动数据中心", "token": "c92ca1a0-9efd-11e8-92f2-47f17caf1957" }]
#      @platform = [{ "ip": "lab.huayuan-iot.com", "name": "实验平台", "token": "96c6ec70-9c95-11e9-b3e0-af11a88f0382" }]
      @platform = [{ "ip": "192.168.0.128", "name": "iiot", "token": "2f2fbff0-3bfb-11ea-9248-4b5dea468c92" }]
#      @platform = [{ "ip": "ydpt.jhof.sinopec.com:1000", "name": "实验平台", "token": "1b917a70-90b5-11e9-a7ee-e147866a14c6" }]
#      @platform = [{ "ip": "cloud.huayuan-iot.com", "name": "华远云平台", "token": "98655510-f850-11e8-9681-c905a56f3896" }]

      @selectPlatform = @platform[0].ip + '&' + @platform[0].token if @platform[0]
      @doRegister()

    doRegister: ->
      if !@selectPlatform
        M.toast {html: '平台选择不能为空'}
        return
      #保存项目选择到本地偏好
      if localStorage.getItem 'preference'
        preference = JSON.parse localStorage.getItem 'preference'
        preference.ip = @selectPlatform.split('&')[0]
        preference.token = @selectPlatform.split('&')[1]
        localStorage.setItem 'preference',JSON.stringify preference
      else
        preference =
          ip: @selectPlatform.split('&')[0]
          token: @selectPlatform.split('&')[1]
        localStorage.setItem 'preference',JSON.stringify preference
      @$rootScope.preference = preference
      @settingService.changeIp preference.ip
      @modelManager.options = window.setting
      @$state.go 'login'

  exports =
    Ctrl: Ctrl
