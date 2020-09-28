
define ['clc.foundation.angular/controllers/controller'], (base) ->

  class Ctrl extends base.Controller
    constructor: ($scope, $rootScope, $routeParams, $location, $window, @$state, @cloudAuthService, @toastService, @$timeout, @settingService, @$ionicModal) ->
      super $scope, $rootScope, $routeParams, $location, $window

      @getPreference (preference)=>
#        console.info 'preference',preference
#        if !preference.project
#          @$state.go 'portal', {}
      @init()

    #从本地获取用户偏好
    getPreference: (callback)->
      if !@$rootScope.preference
        if localStorage.getItem 'preference'
          preference = JSON.parse localStorage.getItem 'preference'
          if !preference.ip
            @$state.go 'platform', {}
          else
            @$rootScope.preference = preference
            callback?preference
        else
          @$state.go 'platform', {}
      else
        callback?@$rootScope.preference

    init: ->
      @loginData = {}
      @btnTxt = '登  录'
      @isLogin = false
      @isAll = false
      user = @cloudAuthService.getUserCookie()
      @initModal()

      if user and user.user and user.password
        @loginData.username = user.user
        @loginData.password = user.password
        @changeInput()
        if @$routeParams.fromUrl is 'logout'
          return
        if @$routeParams.fromUrl is 'changepassword'
          @loginData.password = ''
          return
#        @$timeout =>
#          @doLogin()
#        , 800

    dispose: ->
      super
      @modal?.remove()

    openModal: ->
      @modal.show()

    initModal: ->
      @$ionicModal.fromTemplateUrl('templates/modals/terms.html',
        scope: @$scope
        animation: 'slide-in-up').then (modal) =>
          @modal = modal
          @$scope.modal = modal
          @$scope.controller = @

    doLogin: ->
      if !@loginData.username
        M.toast {html: '请填写账号！', displayLength:1000}
        return
      if !@loginData.password
        M.toast {html: '请填写密码！', displayLength:1000}
        return
      @btnTxt = '登录中...'
      @isLogin = true
      onSuccess = (resp) =>
        if not resp?._err
          if localStorage.getItem 'preference'
            preference = JSON.parse localStorage.getItem 'preference'
            preference.user = resp.user
            preference.name = resp.name
            localStorage.setItem 'preference',JSON.stringify preference
          else
            preference =
              user: resp.user
              name: resp.name
            localStorage.setItem 'preference',JSON.stringify preference
          # console.info '@$rootScope.preference',@$rootScope.preference
          @$timeout =>
            @$state.go 'portal', {origin: 'login'}, {reload: true}
#            @$state.go 'supplier', {}, {reload: true}
#            if @$rootScope.preference.project
#              @$state.go 'tab.overview', {user: @$rootScope.preference.user, project: @$rootScope.preference.project}
#            else
#              @$state.go 'portal', {}, {reload: true}
          , 1000
        else
          @btnTxt = '登  录'
          @isLogin = false
          @toastService '用户或密码错误'

      onFailure = (err) =>
        @btnTxt = '登  录'
        @isLogin = false
        @toastService err
#        @toastService '网络错误，请稍后重试'

      @cloudAuthService.login @loginData.username, @loginData.password, (err, resp)=>
        return onFailure err if err
        return onSuccess resp

#      @cloudAuthService.login(@loginData.username, @loginData.password).$promise.then(
#        onSuccess, onFailure
#      )

    changeInput: () =>
      if @loginData.username and @loginData.password
        @isAll = true
      else
        @isAll = false

  exports =
    Ctrl: Ctrl
