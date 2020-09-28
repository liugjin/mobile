define(function(require) {
  var controllers, createModelController10, createModelController20, createModelController21, createModelController3, createModelController4, createModelController5, createModelController6, createModelController7, createModelController8, createModelController9;
  controllers = angular.module('clc.controllers', []);
  createModelController20 = function(name, Controller, type, key, title) {
    return controllers.controller(name, [
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
    return controllers.controller(name, [
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
    return controllers.controller(name, [
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
    return controllers.controller(name, [
      '$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', '$interval', 'modelManager', 'modelEngine', 'uploadService', 'liveService', 'reportingService', '$ionicPopover', '$ionicModal', function($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, $ionicPopover, $ionicModal) {
        var options;
        options = {
          type: type,
          key: key,
          title: title,
          uploadUrl: setting.urls.uploadUrl,
          fileUrl: setting.urls.fileUrl,
          url: setting.urls[type]
        };
        return new Controller($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $ionicPopover, $ionicModal);
      }
    ]);
  };
  createModelController5 = function(name, Controller, type, key, title) {
    return controllers.controller(name, [
      '$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', '$interval', 'modelManager', 'modelEngine', 'uploadService', 'liveService', 'reportingService', '$ionicPopover', '$ionicModal', '$cordovaBarcodeScanner', function($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, $ionicPopover, $ionicModal, $cordovaBarcodeScanner) {
        var options;
        options = {
          type: type,
          key: key,
          title: title,
          uploadUrl: setting.urls.uploadUrl,
          fileUrl: setting.urls.fileUrl,
          url: setting.urls[type]
        };
        return new Controller($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $ionicPopover, $ionicModal, $cordovaBarcodeScanner);
      }
    ]);
  };
  createModelController6 = function(name, Controller, type, key, title) {
    return controllers.controller(name, [
      '$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', '$interval', 'modelManager', 'modelEngine', 'uploadService', 'liveService', 'reportingService', '$ionicHistory', '$ionicPopover', '$ionicModal', '$state', function($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, $ionicHistory, $ionicPopover, $ionicModal, $state) {
        var options;
        options = {
          type: type,
          key: key,
          title: title,
          uploadUrl: setting.urls.uploadUrl,
          fileUrl: setting.urls.fileUrl,
          url: setting.urls[type]
        };
        return new Controller($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $ionicHistory, $ionicPopover, $ionicModal, $state);
      }
    ]);
  };
  createModelController7 = function(name, Controller, type, key, title) {
    return controllers.controller(name, [
      '$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', '$interval', 'modelManager', 'modelEngine', 'uploadService', 'liveService', 'reportingService', 'ionicDatePicker', function($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, ionicDatePicker) {
        var options;
        options = {
          type: type,
          key: key,
          title: title,
          uploadUrl: setting.urls.uploadUrl,
          fileUrl: setting.urls.fileUrl,
          url: setting.urls[type]
        };
        return new Controller($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, ionicDatePicker);
      }
    ]);
  };
  createModelController8 = function(name, Controller, type, key, title) {
    return controllers.controller(name, [
      '$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', '$interval', 'modelManager', 'modelEngine', 'uploadService', 'liveService', 'reportingService', '$ionicPopover', '$ionicModal', '$ionicPlatform', '$cordovaBatteryStatus', '$cordovaVibration', '$cordovaGeolocation', function($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, $ionicPopover, $ionicModal, $ionicPlatform, $cordovaBatteryStatus, $cordovaVibration, $cordovaGeolocation) {
        var options;
        options = {
          type: type,
          key: key,
          title: title,
          uploadUrl: setting.urls.uploadUrl,
          fileUrl: setting.urls.fileUrl,
          url: setting.urls[type]
        };
        return new Controller($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $ionicPopover, $ionicModal, $ionicPlatform, $cordovaBatteryStatus, $cordovaVibration, $cordovaGeolocation);
      }
    ]);
  };
  createModelController9 = function(name, Controller, type, key, title) {
    return controllers.controller(name, [
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
  createModelController10 = function(name, Controller, type, key, title) {
    return controllers.controller(name, [
      '$scope', '$rootScope', '$stateParams', '$location', '$window', '$timeout', '$interval', 'modelManager', 'modelEngine', 'uploadService', 'liveService', 'reportingService', '$cordovaBarcodeScanner', '$state', function($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, $cordovaBarcodeScanner, $state) {
        var options;
        options = {
          type: type,
          key: key,
          title: title,
          uploadUrl: setting.urls.uploadUrl,
          fileUrl: setting.urls.fileUrl,
          url: setting.urls[type]
        };
        return new Controller($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $cordovaBarcodeScanner, $state);
      }
    ]);
  };
  controllers.controller('LoginCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$state', 'cloudAuthService', 'toastService', '$timeout', 'settingService', '$ionicModal', require('controllers/login-controller').Ctrl]);
  controllers.controller('RegisterCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$state', 'cloudAuthService', 'toastService', '$timeout', 'settingService', '$ionicModal', '$http', 'modelManager', 'modelEngine', require('controllers/register-controller').Ctrl]);
  controllers.controller('RegCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$state', 'cloudAuthService', 'toastService', '$timeout', 'settingService', '$ionicModal', require('controllers/reg-controller').Ctrl]);
  controllers.controller('LogoutCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$state', 'cloudAuthService', 'storage', require('controllers/logout-controller').LogoutController]);
  controllers.controller('TabsCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$state', 'cloudAuthService', 'toastService', '$timeout', 'settingService', '$ionicActionSheet', 'storage', '$ionicPopover', require('controllers/tabs-controller').Ctrl]);
  controllers.controller('AboutUsCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$ionicHistory', require('controllers/setting/about-us-controller').AboutUsCtrl]);
  controllers.controller('AboutAppCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$window', '$ionicHistory', require('controllers/setting/about-app-controller').AboutAppCtrl]);
  createModelController21('PortalCtrl', require('controllers/portal-controller').PortalController, 'projects', ['user', 'project'], '项目');
  createModelController20('ProjectCtrl', require('controllers/project-controller').ProjectController, 'project', ['user', 'project'], '项目');
  createModelController4('SettingCtrl', require('controllers/setting-controller').SettingController, 'projects', ['user', 'project'], '设置');
  createModelController4('SignalCtrl', require('controllers/signal-controller').Ctrl, 'project', ['user', 'project'], '信号');
  createModelController3('StationsCtrl', require('controllers/stations-controller').Ctrl, 'project', ['user', 'project'], '电站');
  createModelController3('StationCtrl', require('controllers/station-controller').Ctrl, 'project', ['user', 'project'], '电站');
  createModelController4('GraphicCtrl', require('controllers/graphic-controller').Ctrl, 'project', ['user', 'project'], '组态');
  createModelController4('EventCtrl', require('controllers/event-controller').Ctrl, 'project', ['user', 'project'], '事件');
  createModelController7('EquipmentCtrl', require('controllers/equipment-controller').Ctrl, 'project', ['user', 'project'], '设备');
  createModelController10('ScanCtrl', require('controllers/scan-controller').Ctrl, 'project', ['user', 'project'], '扫码');
  createModelController4('OverviewCtrl', require('controllers/overview-controller').Ctrl, 'project', ['user', 'project'], '总览');
  return controllers;
});
