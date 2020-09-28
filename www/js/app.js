define(['src/main'], function() {
  var app;
  app = angular.module('clc', ['ionic', 'ngCordova', 'angular-storage', 'ngResource', 'btford.socket-io', 'ionic-datepicker', 'clc.mobile']);
  app.config([
    '$ionicConfigProvider', '$httpProvider', 'ionicDatePickerProvider', function($ionicConfigProvider, $httpProvider, ionicDatePickerProvider) {
      var datePickerObj;
      $ionicConfigProvider.scrolling.jsScrolling(false);
      $ionicConfigProvider.platform.android.tabs.style('standard');
      $ionicConfigProvider.platform.android.tabs.position('standard');
      $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
      $ionicConfigProvider.platform.android.navBar.alignTitle('center');
      $ionicConfigProvider.platform.ios.views.transition('none');
      $ionicConfigProvider.platform.android.views.transition('none');
      $httpProvider.defaults.timeout = 1000 * 10;
      $httpProvider.interceptors.push([
        '$rootScope', '$q', '$timeout', '$injector', function($rootScope, $q, $timeout, $injector) {
          var requestInitiated;
          requestInitiated = false;
          return {
            request: function(config) {
              requestInitiated = true;
              $timeout(function() {
                if (!requestInitiated) {
                  return;
                }
                return $injector.get("$ionicLoading").show({
                  template: '<ion-spinner icon="ripple" class="spinner-balanced"></ion-spinner>',
                  duration: 6000,
                  noBackdrop: true,
                  hideOnStateChange: true
                });
              }, 100);
              return config;
            },
            requestError: function(rejection) {
              requestInitiated = false;
              $injector.get("$ionicLoading").hide();
              return $q.reject(rejection);
            },
            response: function(response) {
              requestInitiated = false;
              $timeout(function() {
                if (requestInitiated) {
                  return;
                }
                return $injector.get("$ionicLoading").hide();
              }, 300);
              return response;
            },
            responseError: function(rejection) {
              requestInitiated = false;
              $injector.get("$ionicLoading").hide();
              return $q.reject(rejection);
            }
          };
        }
      ]);
      datePickerObj = {
        setLabel: '确定',
        closeLabel: '关闭',
        mondayFirst: false,
        weeksList: ["日", "一", "二", "三", "四", "五", "六"],
        monthsList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        from: new Date(2000, 1, 1),
        to: new Date(2088, 1, 1),
        dateFormat: 'yyyy-MM-dd'
      };
      return ionicDatePickerProvider.configDatePicker(datePickerObj);
    }
  ]);
  app.factory('socket', [
    '$location', 'socketFactory', 'settingService', function($location, socketFactory, setting) {
      var ioUrl, mysocket, server;
      ioUrl = setting.ioUrl;
      server = io.connect(ioUrl);
      mysocket = socketFactory({
        ioSocket: server
      });
      mysocket.forward('error');
      return mysocket;
    }
  ]);
  app.run([
    '$ionicPlatform', '$ionicLoading', '$rootScope', '$state', '$timeout', 'IONIC_BACK_PRIORITY', '$ionicHistory', 'toastService', function($ionicPlatform, $ionicLoading, $rootScope, $state, $timeout, IONIC_BACK_PRIORITY, $ionicHistory, toastService) {
      var isExitApp;
      window.Materialize = {};
      window.Materialize.toast = toastService;
      isExitApp = false;
      $ionicPlatform.registerBackButtonAction(function() {
        var currentView, exitView, _ref, _ref1, _ref2;
        exitView = ['login', "tab.overview", "tab.event", "tab.signal", "tab.order", "tab.survey", "tab.setting"];
        currentView = $ionicHistory.currentView();
        if ((currentView != null ? currentView.stateName : void 0) === 'equipment') {
          $state.go('tab.signal', {
            user: (_ref = $rootScope.station) != null ? _ref.user : void 0,
            project: (_ref1 = $rootScope.station) != null ? _ref1.project : void 0,
            station: (_ref2 = $rootScope.station) != null ? _ref2.station : void 0
          });
          return;
        }
        if (currentView && (!~exitView.indexOf(currentView != null ? currentView.stateName : void 0))) {
          return $ionicHistory.goBack();
        }
        if (isExitApp) {
          $ionicLoading.hide();
          return ionic.Platform.exitApp();
        }
        isExitApp = true;
        $timeout(function() {
          return isExitApp = false;
        }, 5000);
        return toastService('再按一次退出', 100);
      }, IONIC_BACK_PRIORITY.modal + 1);
      return $ionicPlatform.ready(function() {
        $rootScope.appVersion = '0.1.0';
        if (!window.cordova) {
          return;
        }
        navigator.splashscreen.hide();
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
          if (ionic.Platform.isAndroid()) {
            StatusBar.backgroundColorByHexString("#ccc");
          }
        }
        return cordova.getAppVersion(function(version) {
          return $rootScope.appVersion = version;
        });
      });
    }
  ]);
  return app;
});
