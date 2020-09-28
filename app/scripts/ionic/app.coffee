define ['src/main'], () ->
  app = angular.module('clc', [
    'ionic'
    'ngCordova'
    'angular-storage'
    'ngResource'
    'btford.socket-io'
    'ionic-datepicker'

    'clc.mobile'
  ])

  app.config(['$ionicConfigProvider', '$httpProvider', 'ionicDatePickerProvider', ($ionicConfigProvider, $httpProvider, ionicDatePickerProvider) ->
    $ionicConfigProvider.scrolling.jsScrolling false
#    $ionicConfigProvider.platform.ios.tabs.style('standard')
#    $ionicConfigProvider.platform.ios.tabs.position('bottom')
    $ionicConfigProvider.platform.android.tabs.style('standard')
    $ionicConfigProvider.platform.android.tabs.position('standard')

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center')
    $ionicConfigProvider.platform.android.navBar.alignTitle('center')
#
#    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left')
#    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back')
#
#    $ionicConfigProvider.platform.ios.views.transition('ios')
#    $ionicConfigProvider.platform.android.views.transition('android')

    # 去掉切换页面的动画，实在有点卡
    $ionicConfigProvider.platform.ios.views.transition('none')
    $ionicConfigProvider.platform.android.views.transition('none')

#    $ionicConfigProvider.views.maxCache 0

    # 设置http请求超时时间 10s
    $httpProvider.defaults.timeout = 1000 * 10
    $httpProvider.interceptors.push(['$rootScope', '$q', '$timeout', '$injector', ($rootScope, $q, $timeout, $injector) ->
      requestInitiated = false
      {
        request: (config) ->
          requestInitiated = true
          $timeout ->
            return if not requestInitiated
            $injector.get("$ionicLoading").show({
              template: '<ion-spinner icon="ripple" class="spinner-balanced"></ion-spinner>'
              duration: 6000
              noBackdrop: true
              hideOnStateChange: true
            })
          , 100
          #          $rootScope.$broadcast 'loading:show'
          config

        requestError: (rejection) ->
          requestInitiated = false
          #          $rootScope.$broadcast 'loading:hide'
          $injector.get("$ionicLoading").hide()
          $q.reject rejection

        response: (response) ->
#          $rootScope.$broadcast 'loading:hide'
          requestInitiated = false
          $timeout ->
            return if requestInitiated
            $injector.get("$ionicLoading").hide()
          , 300
          response

        responseError: (rejection) ->
          requestInitiated = false
          #          $rootScope.$broadcast 'loading:hide'
          $injector.get("$ionicLoading").hide()
          $q.reject rejection

      }
    ])

    # 日期插件设置和本地化
    datePickerObj =
      setLabel: '确定'
      closeLabel: '关闭'
      mondayFirst: false
      weeksList: ["日", "一", "二", "三", "四", "五", "六"]
      monthsList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
      from: new Date(2000, 1, 1)
      to: new Date(2088, 1, 1)
      dateFormat: 'yyyy-MM-dd'

    ionicDatePickerProvider.configDatePicker datePickerObj

  ])

  app.factory('socket', ['$location', 'socketFactory', 'settingService',
    ($location, socketFactory, setting) ->
      ioUrl = setting.ioUrl
      # ioUrl = "/"
      # console.log "#{new Date().toISOString()} connecting socket.io to #{ioUrl}"
      server = io.connect ioUrl

      mysocket = socketFactory ioSocket: server
      mysocket.forward 'error'
      mysocket
  ])

  app.run [
    '$ionicPlatform'
    '$ionicLoading'
#    '$cordovaSplashscreen'
    '$rootScope'
    '$state'
    '$timeout'
    'IONIC_BACK_PRIORITY'
    '$ionicHistory'
    'toastService'
#    '$cordovaBatteryStatus'
    (
      $ionicPlatform,
      $ionicLoading,
#      $cordovaSplashscreen,
      $rootScope,
      $state,
      $timeout,
      IONIC_BACK_PRIORITY,
      $ionicHistory,
      toastService
#      $cordovaBatteryStatus
    ) ->
      # 适应PC web版的代码
      window.Materialize = {}
      window.Materialize.toast = toastService
      isExitApp = false
      $ionicPlatform.registerBackButtonAction () ->
        exitView = ['login', "tab.overview", "tab.event", "tab.signal", "tab.order", "tab.survey", "tab.setting"]
        currentView = $ionicHistory.currentView()
        if currentView?.stateName is 'equipment'
          $state.go 'tab.signal', {user: $rootScope.station?.user, project: $rootScope.station?.project, station: $rootScope.station?.station}
          return
        if currentView and (not ~exitView.indexOf(currentView?.stateName))
          return $ionicHistory.goBack()
        if isExitApp
          $ionicLoading.hide()
          return ionic.Platform.exitApp()
        isExitApp = true
        $timeout ->
          isExitApp = false
        , 5000
        # 我提示用户再按一次返回按钮会退出APP
        toastService '再按一次退出', 100
      , IONIC_BACK_PRIORITY.modal + 1

#      $rootScope.$on 'loading:show', ->
#        $ionicLoading.show()
##        return
#      $rootScope.$on 'loading:hide', ->
#        $ionicLoading.hide()
##        return

      $ionicPlatform.ready ->
        $rootScope.appVersion = '0.1.0'
        return if not window.cordova
        navigator.splashscreen.hide()
#        $timeout ->
#          navigator.splashscreen.hide()
#        , 500

        if window.cordova and window.cordova.plugins and window.cordova.plugins.Keyboard
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar false
          cordova.plugins.Keyboard.disableScroll true

        if window.StatusBar
          StatusBar.styleDefault()
          if ionic.Platform.isAndroid()
            StatusBar.backgroundColorByHexString "#ccc"

        cordova.getAppVersion (version) ->
          $rootScope.appVersion = version
  ]

  app
