###
* File: main
* User: Dow
* Date: 2014/10/8
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define [
  './module'

  './services/common-service'
  './services/constants-service'
  './services/storage-service'

  'clc.foundation.angular/services/http-service'
  'clc.foundation.angular/services/resource-model-service'
  'clc.foundation.angular/services/upload-service'
  'clc.foundation.angular/services/model-service'
  'clc.foundation.angular/services/model-manager'
  'clc.foundation.angular/live/live-service'
  './services/reporting-service'
  './models/model-engine'

  './services/toast-service'
  './services/cloud-auth-service'
  # {{service-file}}

  './controllers/platform-controller'
  './controllers/login-controller'
  './controllers/smslogin-controller'
  './controllers/register-controller'
  './controllers/reg-controller'
  './controllers/logout-controller'
  './controllers/tabs-controller'
  './controllers/setting/about-us-controller'
  './controllers/supplier-controller'
  './controllers/portal-controller'
  './controllers/project-controller'
  './controllers/setting-controller'
  './controllers/signal-controller'
  './controllers/stations-controller'
  './controllers/station-controller'
#  './controllers/graphic-controller'
  './controllers/event-controller'
  './controllers/event-detail-controller'
  './controllers/equipment-controller'
  './controllers/scan-controller'
  './controllers/scan-qr-controller'
  './controllers/overview-controller'
  './controllers/order-controller'
  './controllers/survey-controller'
  './controllers/order-detail-controller'
  # {{controller-file}}

#  'graphic-directives'
  './directives/mobile-historycurve/component'
  './directives/mobile-equipproperty/component'
  './directives/mobile-equipment-overview/component'
  './directives/event-detail/component'
  './directives/mobile-equip-event/component'
  './directives/graphic-box/component'
  './directives/signal-value/component'
  './directives/mobile-signal-value/component'
  './directives/mobile-equip-signal/component'
  './directives/mobile-equip-video/component'
  './directives/mobile-order-list/component'
  './directives/mobile-order-detail/component'
  './directives/mobile-order-node/component'
  './directives/mobile-equip-list/component'
  './directives/mobile-events-statistic/component'
  './directives/mobile-status-statistic/component'
  './directives/mobile-event-list/component'
  './directives/mobile-focus-equip/component'
  './directives/mobile-order-handle/component'
  './directives/mobile-order-info/component'
  './directives/mobile-order-handle1/component'
  './directives/mobile-order-info1/component'
  # './directives/mobile-pue/component'
  # './directives/health-value/component'
  './directives/mobile-job-content/component'
  './directives/mobile-situation-feedback/component'
  './directives/mobile-field-attachment/component'
  './directives/mobile-general-overview/component'
  './directives/mobile-on-site-inspection/component'
  './directives/mobile-maintenance-operation/component'
  './directives/mobile-fault-yun/component'
  './directives/mobile-date-switching/component'
  './directives/mobile-data-title/component'
  './directives/mobile-mocha-itom/component'
  './directives/mobile-menu/component'
  './directives/mobile-calendar-component/component'
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  # {{directive-file}}
  './filters/string-replace-filter'
  'clc.foundation.angular/filters/pretty-number-filter'
  # {{filter-file}}
], (
  module

  commonService
  constants
  storageService
  httpService
  resourceService
  uploadService
#  authService,
  modelService
  modelManager
  liveService
  reportingService
  modelEngine
  toastService,
  cloudAuthService
  # {{service-namespace}}
  platformController
  loginController
  smsloginController
  registerController
  regController
  logoutController
  tabsController
  aboutUsController
  supplierController
  portalController
  projectController
  settingController
  signalController
  stationsController
  stationController
#  graphicController
  eventController
  eventDetailController
  equipmentController
  scanController
  scanQrController
  overviewController
  orderController
  surveyController
  orderDetailController
  # {{controller-namespace}}

#  graphicDirectives
  mobileHistorycurveDirective
  mobileEquippropertyDirective
  mobileEquipmentOverviewDirective
  eventDetailDirective
  mobileEquipEventDirective
  graphicBoxDirective
  signalValueDirective
  mobileSignalValueDirective
  mobileEquipSignalDirective
  mobileEquipVideoDirective
  mobileOrderListDirective
  mobileOrderDetailDirective
  mobileOrderNodeDirective
  mobileEquipListDirective
  mobileEventsStatisticDirective
  mobileStatusStatisticDirective
  mobileEventListDirective
  mobileFocusEquipDirective
  mobileOrderHandleDirective
  mobileOrderInfoDirective
  mobileOrderHandle1Directive
  mobileOrderInfo1Directive
  # mobilePueDirective
  # healthValueDirective
  mobileJobContentDirective
  mobileSituationFeedbackDirective
  mobileFieldAttachmentDirective
  mobileGeneralOverviewDirective
  mobileOnSiteInspectionDirective
  mobileMaintenanceOperationDirective
  mobileFaultYunDirective
  mobileDateSwitchingDirective
  mobileDataTitleDirective
  mobileMochaItomDirective
  mobileMenuDirective
  mobileCalendarComponentDirective
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  # {{directive-namespace}}

  srfFilter
  prettyNumberFilter
  # {{filter-namespace}}
) ->
# services
  module.service 'commonService', ['$rootScope', '$http', 'modelEngine','liveService', 'reportingService', 'uploadService', commonService.CommonService]

  module.service 'settingService', ['$rootScope', '$http', constants.Constants]
#  module.constant 'settingService', constants.Constants
  module.factory 'storage', ['store', 'settingService', storageService.service]

#  module.service 'httpService', ['$rootScope', '$http', httpService.HttpService]
#  module.service 'resourceService', ['$resource', resourceService.ResourceModelService]
##    services.service 'uploadService', ['$http', uploadService.UploadService]
#  module.service 'uploadService', ['$rootScope', '$http', uploadService.UploadService]
##    services.service 'authService', ['$rootScope', '$location', '$cookieStore', 'storage', 'httpService', authService.AuthService]
#  module.service 'modelService', ['$rootScope', '$http', modelService.ModelService]
#  module.service 'modelManager', ['$rootScope', '$http', ($scope, $http) ->
#    new modelManager.ModelManager $scope, $http, window.setting
#  ]
#  module.service 'liveService', ['$rootScope', 'socket', liveService.LiveService]
#  module.service 'reportingService', ['$rootScope', '$http', ($rootScope, $http) ->
#    new reportingService.ReportingService $rootScope, $http, window.setting.urls
#  ]
  module.service 'modelEngine', ['$rootScope', 'modelManager', 'storage', ($rootScope, modelManager, storage) ->
    new modelEngine.ModelEngine $rootScope, modelManager, storage
  ]

  module.service 'toastService', ['$window', '$timeout', '$ionicLoading', '$cordovaToast', 'settingService', toastService.service]
  module.service 'cloudAuthService', ['$rootScope', 'storage', 'httpService', 'settingService', cloudAuthService.CloudAuthService]
  # {{service-register}}

  # controllers
  # add $timeout and modelEngine
  createModelController20 = (name, Controller, type, key, title) ->
    module.controller name, ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', 'modelManager', 'modelEngine', 'uploadService', '$state'
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
    module.controller name, ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', 'modelManager', 'modelEngine', 'uploadService', '$state', '$ionicModal'
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
    module.controller name, ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', '$interval', 'modelManager', 'modelEngine', 'uploadService', 'liveService', 'reportingService',
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
    module.controller name, ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', '$interval', 'modelManager', 'modelEngine', 'uploadService', 'liveService', 'reportingService', '$ionicPopover', '$ionicModal', 'commonService', '$state', '$ionicPopup'
      ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, $ionicPopover, $ionicModal, commonService, $state, $ionicPopup) ->
        options =
          type: type
          key: key
          title: title
          uploadUrl: setting.urls.uploadUrl
          fileUrl: setting.urls.fileUrl
          url: setting.urls[type]

        new Controller $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $ionicPopover, $ionicModal, commonService, $state, $ionicPopup
    ]

  createModelController5 = (name, Controller, type, key, title) ->
    module.controller name, ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', '$interval', 'modelManager', 'modelEngine', 'uploadService', 'liveService', 'reportingService', '$ionicPopover', '$ionicModal', 'commonService', '$state', '$ionicPopup','$ionicActionSheet','$cordovaCamera','$ionicHistory'
      ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, $ionicPopover, $ionicModal, commonService, $state, $ionicPopup, $ionicActionSheet,$cordovaCamera,$ionicHistory) ->
        options =
          type: type
          key: key
          title: title
          uploadUrl: setting.urls.uploadUrl
          fileUrl: setting.urls.fileUrl
          url: setting.urls[type]

        new Controller $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $ionicPopover, $ionicModal, commonService, $state, $ionicPopup, $ionicActionSheet,$cordovaCamera,$ionicHistory
    ]  

  createModelController7 = (name, Controller, type, key, title) ->
    module.controller name, ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', '$interval', 'modelManager', 'modelEngine', 'uploadService', 'liveService', 'reportingService','$ionicPopover', '$ionicModal', '$ionicTabsDelegate', 'commonService', '$state'
      ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, $ionicPopover, $ionicModal, $ionicTabsDelegate, commonService, $state) ->
        options =
          type: type
          key: key
          title: title
          uploadUrl: setting.urls.uploadUrl
          fileUrl: setting.urls.fileUrl
          url: setting.urls[type]

        new Controller $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $ionicPopover, $ionicModal, $ionicTabsDelegate, commonService, $state
    ]

  createModelController10 = (name, Controller, type, key, title) ->
    module.controller name, ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', '$interval', 'modelManager', 'modelEngine', 'uploadService', 'liveService', 'reportingService', '$state','$ionicPopup'
      ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, $state, $ionicPopup) ->
        options =
          type: type
          key: key
          title: title
          uploadUrl: setting.urls.uploadUrl
          fileUrl: setting.urls.fileUrl
          url: setting.urls[type]

        new Controller $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $state, $ionicPopup
    ]
  module.controller 'PlatformCtrl', ['$scope','$rootScope','$stateParams','$location','$window','$state','cloudAuthService','toastService','$timeout','settingService','$ionicModal','$http','modelManager','modelEngine', platformController.Ctrl]
  module.controller 'LoginCtrl', ['$scope','$rootScope','$stateParams','$location','$window','$state','cloudAuthService','toastService','$timeout','settingService','$ionicModal', loginController.Ctrl]
  module.controller 'SmsloginCtrl', ['$scope','$rootScope','$stateParams','$location','$window','$state','cloudAuthService','toastService','$timeout','settingService','$ionicModal','$http','modelManager','modelEngine', smsloginController.Ctrl]
  module.controller 'RegisterCtrl', ['$scope','$rootScope','$stateParams','$location','$window','$state','cloudAuthService','toastService','$timeout','settingService','$ionicModal','$http','modelManager','modelEngine','$ionicPopup', registerController.Ctrl]
  module.controller 'RegCtrl', ['$scope','$rootScope','$stateParams','$location','$window','$state','cloudAuthService','toastService','$timeout','settingService','$ionicModal', regController.Ctrl]
  module.controller 'LogoutCtrl', ['$scope','$rootScope','$stateParams','$location','$window','$state','cloudAuthService','storage', logoutController.LogoutController]
  module.controller 'TabsCtrl', ['$scope','$rootScope','$stateParams','$location','$window','$state','cloudAuthService','toastService','$timeout','settingService','$ionicActionSheet','storage','$ionicPopover', tabsController.Ctrl]
  module.controller 'AboutUsCtrl', ['$scope','$rootScope','$stateParams','$location','$window','$ionicHistory', aboutUsController.AboutUsCtrl]
  module.controller 'SupplierCtrl', ['$scope','$rootScope','$stateParams','$location','$window','$state','cloudAuthService','toastService','$timeout','settingService','$ionicModal','$http','modelManager','modelEngine','$ionicPopup', supplierController.Ctrl]

  createModelController21 'PortalCtrl', portalController.PortalController, 'projects', ['user', 'project'], '项目'
  createModelController20 'ProjectCtrl', projectController.ProjectController, 'project', ['user', 'project'], '项目'
  createModelController4 'SettingCtrl', settingController.SettingController, 'projects', ['user', 'project'], '设置'
  createModelController7 'SignalCtrl', signalController.Ctrl, 'project', ['user', 'project'], '信号'
  createModelController3 'StationsCtrl', stationsController.Ctrl, 'project', ['user', 'project'], '电站'
  createModelController3 'StationCtrl', stationController.Ctrl, 'project', ['user', 'project'], '电站'
#  createModelController4 'GraphicCtrl', graphicController.Ctrl, 'project', ['user', 'project'], '组态'
  createModelController4 'EventCtrl', eventController.Ctrl, 'project', ['user', 'project'], '事件'
  createModelController10 'EventDetailCtrl', eventDetailController.Ctrl, 'project', ['user', 'project'], '事件详情'
  createModelController7 'EquipmentCtrl', equipmentController.Ctrl, 'project', ['user', 'project'], '设备'
  createModelController10 'ScanCtrl', scanController.Ctrl, 'project', ['user', 'project'], '扫码'
  createModelController10 'ScanQrCtrl', scanQrController.Ctrl, 'project', ['user', 'project'], '扫码'
  createModelController4 'OverviewCtrl', overviewController.Ctrl, 'project', ['user', 'project'], '总览'
  createModelController5 'OrderCtrl', orderController.Ctrl, 'project', ['user', 'project'], '工单'
  createModelController5 'SurveyCtrl', surveyController.Ctrl, 'project', ['user', 'project'], '工单概览'
  createModelController5 'OrderDetailCtrl', orderDetailController.Ctrl, 'project', ['user', 'project'], '工单操作'
  # {{controller-register}}

  # directives
#  module.directive 'graphicViewer', ['$window', '$timeout', 'modelManager', 'storage', graphicDirectives.GraphicViewerDirective]
#  module.directive 'graphicPlayer', ['$window', '$timeout', '$compile', 'modelManager', 'liveService', 'storage', graphicDirectives.GraphicPlayerDirective]
#  module.directive 'elementPopover', ['$timeout', '$compile', graphicDirectives.ElementPopoverDirective]

  # {{directive-register}}

  createDirective = (name, Directive) ->
    module.directive name, ['$timeout', '$window', '$compile', '$stateParams', 'commonService', ($timeout, $window, $compile, $routeParams, commonService)->
      new Directive $timeout, $window, $compile, $routeParams, commonService
    ]


  createDirective 'mobileHistorycurve', mobileHistorycurveDirective.MobileHistorycurveDirective
  createDirective 'mobileEquipproperty', mobileEquippropertyDirective.MobileEquippropertyDirective
  createDirective 'mobileEquipmentOverview', mobileEquipmentOverviewDirective.MobileEquipmentOverviewDirective
  createDirective 'eventDetail', eventDetailDirective.EventDetailDirective
  createDirective 'mobileEquipEvent', mobileEquipEventDirective.MobileEquipEventDirective
  createDirective 'graphicBox', graphicBoxDirective.GraphicBoxDirective
  createDirective 'signalValue', signalValueDirective.SignalValueDirective
  createDirective 'mobileSignalValue', mobileSignalValueDirective.MobileSignalValueDirective
  createDirective 'mobileEquipSignal', mobileEquipSignalDirective.MobileEquipSignalDirective
  createDirective 'mobileEquipVideo', mobileEquipVideoDirective.MobileEquipVideoDirective
  createDirective 'mobileOrderList', mobileOrderListDirective.MobileOrderListDirective
  createDirective 'mobileOrderDetail', mobileOrderDetailDirective.MobileOrderDetailDirective
  createDirective 'mobileOrderNode', mobileOrderNodeDirective.MobileOrderNodeDirective
  createDirective 'mobileEquipList', mobileEquipListDirective.MobileEquipListDirective
  createDirective 'mobileEventsStatistic', mobileEventsStatisticDirective.MobileEventsStatisticDirective
  createDirective 'mobileStatusStatistic', mobileStatusStatisticDirective.MobileStatusStatisticDirective
  createDirective 'mobileEventList', mobileEventListDirective.MobileEventListDirective
  createDirective 'mobileFocusEquip', mobileFocusEquipDirective.MobileFocusEquipDirective
  createDirective 'mobileOrderHandle', mobileOrderHandleDirective.MobileOrderHandleDirective
  createDirective 'mobileOrderInfo', mobileOrderInfoDirective.MobileOrderInfoDirective
  createDirective 'mobileOrderHandle1', mobileOrderHandle1Directive.MobileOrderHandle1Directive
  createDirective 'mobileOrderInfo1', mobileOrderInfo1Directive.MobileOrderInfo1Directive
  # createDirective 'mobilePue', mobilePueDirective.MobilePueDirective
  # createDirective 'healthValue', healthValueDirective.HealthValueDirective
  createDirective 'mobileJobContent', mobileJobContentDirective.MobileJobContentDirective
  createDirective 'mobileSituationFeedback', mobileSituationFeedbackDirective.MobileSituationFeedbackDirective
  createDirective 'mobileFieldAttachment', mobileFieldAttachmentDirective.MobileFieldAttachmentDirective
  createDirective 'mobileGeneralOverview', mobileGeneralOverviewDirective.MobileGeneralOverviewDirective
  createDirective 'mobileOnSiteInspection', mobileOnSiteInspectionDirective.MobileOnSiteInspectionDirective
  createDirective 'mobileMaintenanceOperation', mobileMaintenanceOperationDirective.MobileMaintenanceOperationDirective
  createDirective 'mobileFaultYun', mobileFaultYunDirective.MobileFaultYunDirective
  createDirective 'mobileDateSwitching', mobileDateSwitchingDirective.MobileDateSwitchingDirective
  createDirective 'mobileDataTitle', mobileDataTitleDirective.MobileDataTitleDirective
  createDirective 'mobileMochaItom', mobileMochaItomDirective.MobileMochaItomDirective
  createDirective 'mobileMenu', mobileMenuDirective.MobileMenuDirective
  createDirective 'mobileCalendarComponent', mobileCalendarComponentDirective.MobileCalendarComponentDirective
  # {{component-register}}

  #filters
  module.filter 'prettyNumber', [prettyNumberFilter.PrettyNumberFilter]
  module.filter 'replace', [srfFilter.StringReplaceFilter]
  # {{filter-register}}
