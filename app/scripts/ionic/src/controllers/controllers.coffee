define (require) ->

  controllers = angular.module 'clc.controllers', []

  createModelController20 = (name, Controller, type, key, title) ->
    controllers.controller name, ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', 'modelManager', 'modelEngine', 'uploadService', '$state'
      ($scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, $state) ->
        options =
          type: type
          key: key
          title: title
          uploadUrl: setting.urls.uploadUrl
          fileUrl: setting.urls.fileUrl
          url: setting.urls[type]

        new Controller $scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, options, $state
    ]

  createModelController21 = (name, Controller, type, key, title) ->
    controllers.controller name, ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', 'modelManager', 'modelEngine', 'uploadService', '$state', '$ionicModal'
      ($scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, $state, $ionicModal) ->
        options =
          type: type
          key: key
          title: title
          uploadUrl: setting.urls.uploadUrl
          fileUrl: setting.urls.fileUrl
          url: setting.urls[type]

        new Controller $scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, options, $state, $ionicModal
    ]

  createModelController3 = (name, Controller, type, key, title) ->
    controllers.controller name, ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', '$interval', 'modelManager', 'modelEngine', 'uploadService', 'liveService', 'reportingService',
      ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService) ->
        options =
          type: type
          key: key
          title: title
          uploadUrl: setting.urls.uploadUrl
          fileUrl: setting.urls.fileUrl
          url: setting.urls[type]

        new Controller $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options
    ]

  createModelController4 = (name, Controller, type, key, title) ->
    controllers.controller name, ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', '$interval', 'modelManager', 'modelEngine', 'uploadService', 'liveService', 'reportingService', '$ionicPopover', '$ionicModal'
      ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, $ionicPopover, $ionicModal) ->
        options =
          type: type
          key: key
          title: title
          uploadUrl: setting.urls.uploadUrl
          fileUrl: setting.urls.fileUrl
          url: setting.urls[type]

        new Controller $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $ionicPopover, $ionicModal
    ]

  createModelController5 = (name, Controller, type, key, title) ->
    controllers.controller name, ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', '$interval', 'modelManager', 'modelEngine', 'uploadService', 'liveService', 'reportingService', '$ionicPopover', '$ionicModal', '$cordovaBarcodeScanner'
      ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, $ionicPopover, $ionicModal, $cordovaBarcodeScanner) ->
        options =
          type: type
          key: key
          title: title
          uploadUrl: setting.urls.uploadUrl
          fileUrl: setting.urls.fileUrl
          url: setting.urls[type]

        new Controller $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $ionicPopover, $ionicModal, $cordovaBarcodeScanner
    ]

  createModelController6 = (name, Controller, type, key, title) ->
    controllers.controller name, ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', '$interval', 'modelManager', 'modelEngine', 'uploadService', 'liveService', 'reportingService', '$ionicHistory', '$ionicPopover', '$ionicModal', '$state'
      ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, $ionicHistory, $ionicPopover, $ionicModal, $state) ->
        options =
          type: type
          key: key
          title: title
          uploadUrl: setting.urls.uploadUrl
          fileUrl: setting.urls.fileUrl
          url: setting.urls[type]

        new Controller $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $ionicHistory, $ionicPopover, $ionicModal, $state
    ]

  createModelController7 = (name, Controller, type, key, title) ->
    controllers.controller name, ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', '$interval', 'modelManager', 'modelEngine', 'uploadService', 'liveService', 'reportingService', 'ionicDatePicker'
      ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, ionicDatePicker) ->
        options =
          type: type
          key: key
          title: title
          uploadUrl: setting.urls.uploadUrl
          fileUrl: setting.urls.fileUrl
          url: setting.urls[type]

        new Controller $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, ionicDatePicker
    ]


  createModelController8 = (name, Controller, type, key, title) ->
    controllers.controller name, ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', '$interval', 'modelManager', 'modelEngine', 'uploadService', 'liveService', 'reportingService', '$ionicPopover', '$ionicModal', '$ionicPlatform', '$cordovaBatteryStatus', '$cordovaVibration', '$cordovaGeolocation'
      ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, $ionicPopover, $ionicModal, $ionicPlatform, $cordovaBatteryStatus, $cordovaVibration, $cordovaGeolocation) ->
        options =
          type: type
          key: key
          title: title
          uploadUrl: setting.urls.uploadUrl
          fileUrl: setting.urls.fileUrl
          url: setting.urls[type]

        new Controller $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $ionicPopover, $ionicModal, $ionicPlatform, $cordovaBatteryStatus, $cordovaVibration, $cordovaGeolocation
    ]


  createModelController9 = (name, Controller, type, key, title) ->
    controllers.controller name, ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', '$interval', 'modelManager', 'modelEngine', 'uploadService', 'liveService', 'reportingService',
      ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService) ->
        options =
          type: type
          key: key
          title: title
          uploadUrl: setting.urls.uploadUrl
          fileUrl: setting.urls.fileUrl
          url: setting.urls[type]

        new Controller $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options
    ]


  createModelController10 = (name, Controller, type, key, title) ->
    controllers.controller name, ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', '$interval', 'modelManager', 'modelEngine', 'uploadService', 'liveService', 'reportingService', '$cordovaBarcodeScanner', '$state'
      ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, $cordovaBarcodeScanner, $state) ->
        options =
          type: type
          key: key
          title: title
          uploadUrl: setting.urls.uploadUrl
          fileUrl: setting.urls.fileUrl
          url: setting.urls[type]

        new Controller $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $cordovaBarcodeScanner, $state
    ]


  controllers.controller 'LoginCtrl', [
    '$scope'
    '$rootScope'
    '$stateParams'
    '$location'
    '$window'
    '$state'
    'cloudAuthService'
    'toastService'
    '$timeout'
    'settingService'
    '$ionicModal'
    require('controllers/login-controller').Ctrl
  ]

  controllers.controller 'RegisterCtrl', [
    '$scope'
    '$rootScope'
    '$stateParams'
    '$location'
    '$window'
    '$state'
    'cloudAuthService'
    'toastService'
    '$timeout'
    'settingService'
    '$ionicModal'
    '$http'
    'modelManager'
    'modelEngine'
    require('controllers/register-controller').Ctrl
  ]

  controllers.controller 'RegCtrl', [
    '$scope'
    '$rootScope'
    '$stateParams'
    '$location'
    '$window'
    '$state'
    'cloudAuthService'
    'toastService'
    '$timeout'
    'settingService'
    '$ionicModal'
    require('controllers/reg-controller').Ctrl
  ]

  controllers.controller 'LogoutCtrl', [
    '$scope'
    '$rootScope'
    '$stateParams'
    '$location'
    '$window'
    '$state'
    'cloudAuthService'
    'storage'
    require('controllers/logout-controller').LogoutController
  ]


  controllers.controller 'TabsCtrl', [
    '$scope'
    '$rootScope'
    '$stateParams'
    '$location'
    '$window'
    '$state'
    'cloudAuthService'
    'toastService'
    '$timeout'
    'settingService'
    '$ionicActionSheet'
    'storage'
    '$ionicPopover'
    require('controllers/tabs-controller').Ctrl
  ]

#  controllers.controller 'SettingCtrl', [
#    '$scope'
#    '$rootScope'
#    '$stateParams'
#    '$location'
#    '$window'
#    '$state'
#    'toastService'
#    '$timeout'
#    'settingService'
#    'storage'
#    require('controllers/setting-controller').Ctrl
#  ]

#  controllers.controller 'TabsCtrl', require('controllers/tabs-controller').Ctrl


  controllers.controller 'AboutUsCtrl', [
    '$scope'
    '$rootScope'
    '$stateParams'
    '$location'
    '$window'
    '$ionicHistory'
    require('controllers/setting/about-us-controller').AboutUsCtrl
  ]

  controllers.controller 'AboutAppCtrl', [
    '$scope'
    '$rootScope'
    '$stateParams'
    '$location'
    '$window'
    '$ionicHistory'
    require('controllers/setting/about-app-controller').AboutAppCtrl
  ]



  createModelController21 'PortalCtrl', require('controllers/portal-controller').PortalController, 'projects', ['user', 'project'], '项目'
  createModelController20 'ProjectCtrl', require('controllers/project-controller').ProjectController, 'project', ['user', 'project'], '项目'

#  createModelController20 'SettingCtrl', require('controllers/setting-controller').SettingController, 'projects', ['user', 'project'], '设置'
  createModelController4 'SettingCtrl', require('controllers/setting-controller').SettingController, 'projects', ['user', 'project'], '设置'

  createModelController4 'SignalCtrl', require('controllers/signal-controller').Ctrl, 'project', ['user', 'project'], '信号'
#  createModelController9 'SettingCtrl', require('controllers/setting-controller').Ctrl, 'project', ['user', 'project'], '设置'

  createModelController3 'StationsCtrl', require('controllers/stations-controller').Ctrl, 'project', ['user', 'project'], '电站'
  createModelController3 'StationCtrl', require('controllers/station-controller').Ctrl, 'project', ['user', 'project'], '电站'
  createModelController4 'GraphicCtrl', require('controllers/graphic-controller').Ctrl, 'project', ['user', 'project'], '组态'
  createModelController4 'EventCtrl', require('controllers/event-controller').Ctrl, 'project', ['user', 'project'], '事件'
#  createModelController6 'VideoCtrl', require('controllers/video-controller').Ctrl, 'project', ['user', 'project'], '视频'
#  createModelController34 'SignalCtrl', require('controllers/signal-controller').Ctrl, 'equipments', ['user', 'project', 'station', 'equipment'], '设备视图'

  createModelController7 'EquipmentCtrl', require('controllers/equipment-controller').Ctrl, 'project', ['user', 'project'], '设备'

  createModelController10 'ScanCtrl', require('controllers/scan-controller').Ctrl, 'project', ['user', 'project'], '扫码'

  createModelController4 'OverviewCtrl', require('controllers/overview-controller').Ctrl, 'project', ['user', 'project'], '总览'







  controllers
