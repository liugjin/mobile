
/*
* File: main
* User: Dow
* Date: 2014/10/8
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
define(['./module', './services/common-service', './services/constants-service', './services/storage-service', 'clc.foundation.angular/services/http-service', 'clc.foundation.angular/services/resource-model-service', 'clc.foundation.angular/services/upload-service', 'clc.foundation.angular/services/model-service', 'clc.foundation.angular/services/model-manager', 'clc.foundation.angular/live/live-service', './services/reporting-service', './models/model-engine', './services/toast-service', './services/cloud-auth-service', './controllers/platform-controller', './controllers/login-controller', './controllers/smslogin-controller', './controllers/register-controller', './controllers/reg-controller', './controllers/logout-controller', './controllers/tabs-controller', './controllers/setting/about-us-controller', './controllers/supplier-controller', './controllers/portal-controller', './controllers/project-controller', './controllers/setting-controller', './controllers/signal-controller', './controllers/stations-controller', './controllers/station-controller', './controllers/event-controller', './controllers/event-detail-controller', './controllers/equipment-controller', './controllers/scan-controller', './controllers/scan-qr-controller', './controllers/overview-controller', './controllers/order-controller', './controllers/survey-controller', './controllers/order-detail-controller', './directives/mobile-historycurve/component', './directives/mobile-equipproperty/component', './directives/mobile-equipment-overview/component', './directives/event-detail/component', './directives/mobile-equip-event/component', './directives/graphic-box/component', './directives/signal-value/component', './directives/mobile-signal-value/component', './directives/mobile-equip-signal/component', './directives/mobile-equip-video/component', './directives/mobile-order-list/component', './directives/mobile-order-detail/component', './directives/mobile-order-node/component', './directives/mobile-equip-list/component', './directives/mobile-events-statistic/component', './directives/mobile-status-statistic/component', './directives/mobile-event-list/component', './directives/mobile-focus-equip/component', './directives/mobile-order-handle/component', './directives/mobile-order-info/component', './directives/mobile-order-handle1/component', './directives/mobile-order-info1/component', './directives/mobile-job-content/component', './directives/mobile-situation-feedback/component', './directives/mobile-field-attachment/component', './directives/mobile-general-overview/component', './directives/mobile-on-site-inspection/component', './directives/mobile-maintenance-operation/component', './directives/mobile-fault-yun/component', './directives/mobile-date-switching/component', './directives/mobile-data-title/component', './directives/mobile-mocha-itom/component', './directives/mobile-menu/component', './directives/mobile-calendar-component/component', './filters/string-replace-filter', 'clc.foundation.angular/filters/pretty-number-filter'], function(module, commonService, constants, storageService, httpService, resourceService, uploadService, modelService, modelManager, liveService, reportingService, modelEngine, toastService, cloudAuthService, platformController, loginController, smsloginController, registerController, regController, logoutController, tabsController, aboutUsController, supplierController, portalController, projectController, settingController, signalController, stationsController, stationController, eventController, eventDetailController, equipmentController, scanController, scanQrController, overviewController, orderController, surveyController, orderDetailController, mobileHistorycurveDirective, mobileEquippropertyDirective, mobileEquipmentOverviewDirective, eventDetailDirective, mobileEquipEventDirective, graphicBoxDirective, signalValueDirective, mobileSignalValueDirective, mobileEquipSignalDirective, mobileEquipVideoDirective, mobileOrderListDirective, mobileOrderDetailDirective, mobileOrderNodeDirective, mobileEquipListDirective, mobileEventsStatisticDirective, mobileStatusStatisticDirective, mobileEventListDirective, mobileFocusEquipDirective, mobileOrderHandleDirective, mobileOrderInfoDirective, mobileOrderHandle1Directive, mobileOrderInfo1Directive, mobileJobContentDirective, mobileSituationFeedbackDirective, mobileFieldAttachmentDirective, mobileGeneralOverviewDirective, mobileOnSiteInspectionDirective, mobileMaintenanceOperationDirective, mobileFaultYunDirective, mobileDateSwitchingDirective, mobileDataTitleDirective, mobileMochaItomDirective, mobileMenuDirective, mobileCalendarComponentDirective, srfFilter, prettyNumberFilter) {
  var createDirective, createModelController10, createModelController20, createModelController21, createModelController3, createModelController4, createModelController5, createModelController7;
  module.service('commonService', ['$rootScope', '$http', 'modelEngine', 'liveService', 'reportingService', 'uploadService', commonService.CommonService]);
  module.service('settingService', ['$rootScope', '$http', constants.Constants]);
  module.factory('storage', ['store', 'settingService', storageService.service]);
  module.service('modelEngine', [
    '$rootScope', 'modelManager', 'storage', function($rootScope, modelManager, storage) {
      return new modelEngine.ModelEngine($rootScope, modelManager, storage);
    }
  ]);
  module.service('toastService', ['$window', '$timeout', '$ionicLoading', '$cordovaToast', 'settingService', toastService.service]);
  module.service('cloudAuthService', ['$rootScope', 'storage', 'httpService', 'settingService', cloudAuthService.CloudAuthService]);
  createModelController20 = function(name, Controller, type, key, title) {
    return module.controller(name, [
      '$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', 'modelManager', 'modelEngine', 'uploadService', '$state', function($scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, $state) {
        var options;
        options = {
          type: type,
          key: key,
          title: title,
          uploadUrl: setting.urls.uploadUrl,
          fileUrl: setting.urls.fileUrl,
          url: setting.urls[type]
        };
        return new Controller($scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, options, $state);
      }
    ]);
  };
  createModelController21 = function(name, Controller, type, key, title) {
    return module.controller(name, [
      '$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', 'modelManager', 'modelEngine', 'uploadService', '$state', '$ionicModal', function($scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, $state, $ionicModal) {
        var options;
        options = {
          type: type,
          key: key,
          title: title,
          uploadUrl: setting.urls.uploadUrl,
          fileUrl: setting.urls.fileUrl,
          url: setting.urls[type]
        };
        return new Controller($scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, options, $state, $ionicModal);
      }
    ]);
  };
  createModelController3 = function(name, Controller, type, key, title) {
    return module.controller(name, [
      '$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', '$interval', 'modelManager', 'modelEngine', 'uploadService', 'liveService', 'reportingService', function($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService) {
        var options;
        options = {
          type: type,
          key: key,
          title: title,
          uploadUrl: setting.urls.uploadUrl,
          fileUrl: setting.urls.fileUrl,
          url: setting.urls[type]
        };
        return new Controller($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options);
      }
    ]);
  };
  createModelController4 = function(name, Controller, type, key, title) {
    return module.controller(name, [
      '$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', '$interval', 'modelManager', 'modelEngine', 'uploadService', 'liveService', 'reportingService', '$ionicPopover', '$ionicModal', 'commonService', '$state', '$ionicPopup', function($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, $ionicPopover, $ionicModal, commonService, $state, $ionicPopup) {
        var options;
        options = {
          type: type,
          key: key,
          title: title,
          uploadUrl: setting.urls.uploadUrl,
          fileUrl: setting.urls.fileUrl,
          url: setting.urls[type]
        };
        return new Controller($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $ionicPopover, $ionicModal, commonService, $state, $ionicPopup);
      }
    ]);
  };
  createModelController5 = function(name, Controller, type, key, title) {
    return module.controller(name, [
      '$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', '$interval', 'modelManager', 'modelEngine', 'uploadService', 'liveService', 'reportingService', '$ionicPopover', '$ionicModal', 'commonService', '$state', '$ionicPopup', '$ionicActionSheet', '$cordovaCamera', '$ionicHistory', function($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, $ionicPopover, $ionicModal, commonService, $state, $ionicPopup, $ionicActionSheet, $cordovaCamera, $ionicHistory) {
        var options;
        options = {
          type: type,
          key: key,
          title: title,
          uploadUrl: setting.urls.uploadUrl,
          fileUrl: setting.urls.fileUrl,
          url: setting.urls[type]
        };
        return new Controller($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $ionicPopover, $ionicModal, commonService, $state, $ionicPopup, $ionicActionSheet, $cordovaCamera, $ionicHistory);
      }
    ]);
  };
  createModelController7 = function(name, Controller, type, key, title) {
    return module.controller(name, [
      '$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', '$interval', 'modelManager', 'modelEngine', 'uploadService', 'liveService', 'reportingService', '$ionicPopover', '$ionicModal', '$ionicTabsDelegate', 'commonService', '$state', function($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, $ionicPopover, $ionicModal, $ionicTabsDelegate, commonService, $state) {
        var options;
        options = {
          type: type,
          key: key,
          title: title,
          uploadUrl: setting.urls.uploadUrl,
          fileUrl: setting.urls.fileUrl,
          url: setting.urls[type]
        };
        return new Controller($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $ionicPopover, $ionicModal, $ionicTabsDelegate, commonService, $state);
      }
    ]);
  };
  createModelController10 = function(name, Controller, type, key, title) {
    return module.controller(name, [
      '$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', '$interval', 'modelManager', 'modelEngine', 'uploadService', 'liveService', 'reportingService', '$state', '$ionicPopup', function($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, $state, $ionicPopup) {
        var options;
        options = {
          type: type,
          key: key,
          title: title,
          uploadUrl: setting.urls.uploadUrl,
          fileUrl: setting.urls.fileUrl,
          url: setting.urls[type]
        };
        return new Controller($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $state, $ionicPopup);
      }
    ]);
  };
  module.controller('PlatformCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$state', 'cloudAuthService', 'toastService', '$timeout', 'settingService', '$ionicModal', '$http', 'modelManager', 'modelEngine', platformController.Ctrl]);
  module.controller('LoginCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$state', 'cloudAuthService', 'toastService', '$timeout', 'settingService', '$ionicModal', loginController.Ctrl]);
  module.controller('SmsloginCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$state', 'cloudAuthService', 'toastService', '$timeout', 'settingService', '$ionicModal', '$http', 'modelManager', 'modelEngine', smsloginController.Ctrl]);
  module.controller('RegisterCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$state', 'cloudAuthService', 'toastService', '$timeout', 'settingService', '$ionicModal', '$http', 'modelManager', 'modelEngine', '$ionicPopup', registerController.Ctrl]);
  module.controller('RegCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$state', 'cloudAuthService', 'toastService', '$timeout', 'settingService', '$ionicModal', regController.Ctrl]);
  module.controller('LogoutCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$state', 'cloudAuthService', 'storage', logoutController.LogoutController]);
  module.controller('TabsCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$state', 'cloudAuthService', 'toastService', '$timeout', 'settingService', '$ionicActionSheet', 'storage', '$ionicPopover', tabsController.Ctrl]);
  module.controller('AboutUsCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$ionicHistory', aboutUsController.AboutUsCtrl]);
  module.controller('SupplierCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$state', 'cloudAuthService', 'toastService', '$timeout', 'settingService', '$ionicModal', '$http', 'modelManager', 'modelEngine', '$ionicPopup', supplierController.Ctrl]);
  createModelController21('PortalCtrl', portalController.PortalController, 'projects', ['user', 'project'], '项目');
  createModelController20('ProjectCtrl', projectController.ProjectController, 'project', ['user', 'project'], '项目');
  createModelController4('SettingCtrl', settingController.SettingController, 'projects', ['user', 'project'], '设置');
  createModelController7('SignalCtrl', signalController.Ctrl, 'project', ['user', 'project'], '信号');
  createModelController3('StationsCtrl', stationsController.Ctrl, 'project', ['user', 'project'], '电站');
  createModelController3('StationCtrl', stationController.Ctrl, 'project', ['user', 'project'], '电站');
  createModelController4('EventCtrl', eventController.Ctrl, 'project', ['user', 'project'], '事件');
  createModelController10('EventDetailCtrl', eventDetailController.Ctrl, 'project', ['user', 'project'], '事件详情');
  createModelController7('EquipmentCtrl', equipmentController.Ctrl, 'project', ['user', 'project'], '设备');
  createModelController10('ScanCtrl', scanController.Ctrl, 'project', ['user', 'project'], '扫码');
  createModelController10('ScanQrCtrl', scanQrController.Ctrl, 'project', ['user', 'project'], '扫码');
  createModelController4('OverviewCtrl', overviewController.Ctrl, 'project', ['user', 'project'], '总览');
  createModelController5('OrderCtrl', orderController.Ctrl, 'project', ['user', 'project'], '工单');
  createModelController5('SurveyCtrl', surveyController.Ctrl, 'project', ['user', 'project'], '工单概览');
  createModelController5('OrderDetailCtrl', orderDetailController.Ctrl, 'project', ['user', 'project'], '工单操作');
  createDirective = function(name, Directive) {
    return module.directive(name, [
      '$timeout', '$window', '$compile', '$stateParams', 'commonService', function($timeout, $window, $compile, $routeParams, commonService) {
        return new Directive($timeout, $window, $compile, $routeParams, commonService);
      }
    ]);
  };
  createDirective('mobileHistorycurve', mobileHistorycurveDirective.MobileHistorycurveDirective);
  createDirective('mobileEquipproperty', mobileEquippropertyDirective.MobileEquippropertyDirective);
  createDirective('mobileEquipmentOverview', mobileEquipmentOverviewDirective.MobileEquipmentOverviewDirective);
  createDirective('eventDetail', eventDetailDirective.EventDetailDirective);
  createDirective('mobileEquipEvent', mobileEquipEventDirective.MobileEquipEventDirective);
  createDirective('graphicBox', graphicBoxDirective.GraphicBoxDirective);
  createDirective('signalValue', signalValueDirective.SignalValueDirective);
  createDirective('mobileSignalValue', mobileSignalValueDirective.MobileSignalValueDirective);
  createDirective('mobileEquipSignal', mobileEquipSignalDirective.MobileEquipSignalDirective);
  createDirective('mobileEquipVideo', mobileEquipVideoDirective.MobileEquipVideoDirective);
  createDirective('mobileOrderList', mobileOrderListDirective.MobileOrderListDirective);
  createDirective('mobileOrderDetail', mobileOrderDetailDirective.MobileOrderDetailDirective);
  createDirective('mobileOrderNode', mobileOrderNodeDirective.MobileOrderNodeDirective);
  createDirective('mobileEquipList', mobileEquipListDirective.MobileEquipListDirective);
  createDirective('mobileEventsStatistic', mobileEventsStatisticDirective.MobileEventsStatisticDirective);
  createDirective('mobileStatusStatistic', mobileStatusStatisticDirective.MobileStatusStatisticDirective);
  createDirective('mobileEventList', mobileEventListDirective.MobileEventListDirective);
  createDirective('mobileFocusEquip', mobileFocusEquipDirective.MobileFocusEquipDirective);
  createDirective('mobileOrderHandle', mobileOrderHandleDirective.MobileOrderHandleDirective);
  createDirective('mobileOrderInfo', mobileOrderInfoDirective.MobileOrderInfoDirective);
  createDirective('mobileOrderHandle1', mobileOrderHandle1Directive.MobileOrderHandle1Directive);
  createDirective('mobileOrderInfo1', mobileOrderInfo1Directive.MobileOrderInfo1Directive);
  createDirective('mobileJobContent', mobileJobContentDirective.MobileJobContentDirective);
  createDirective('mobileSituationFeedback', mobileSituationFeedbackDirective.MobileSituationFeedbackDirective);
  createDirective('mobileFieldAttachment', mobileFieldAttachmentDirective.MobileFieldAttachmentDirective);
  createDirective('mobileGeneralOverview', mobileGeneralOverviewDirective.MobileGeneralOverviewDirective);
  createDirective('mobileOnSiteInspection', mobileOnSiteInspectionDirective.MobileOnSiteInspectionDirective);
  createDirective('mobileMaintenanceOperation', mobileMaintenanceOperationDirective.MobileMaintenanceOperationDirective);
  createDirective('mobileFaultYun', mobileFaultYunDirective.MobileFaultYunDirective);
  createDirective('mobileDateSwitching', mobileDateSwitchingDirective.MobileDateSwitchingDirective);
  createDirective('mobileDataTitle', mobileDataTitleDirective.MobileDataTitleDirective);
  createDirective('mobileMochaItom', mobileMochaItomDirective.MobileMochaItomDirective);
  createDirective('mobileMenu', mobileMenuDirective.MobileMenuDirective);
  createDirective('mobileCalendarComponent', mobileCalendarComponentDirective.MobileCalendarComponentDirective);
  module.filter('prettyNumber', [prettyNumberFilter.PrettyNumberFilter]);
  return module.filter('replace', [srfFilter.StringReplaceFilter]);
});
