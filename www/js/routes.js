define(['app'], function(app) {
  return app.config([
    '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('platform', {
        cache: false,
        url: '/platform',
        templateUrl: 'templates/platform.html',
        controller: 'PlatformCtrl as vm'
      }).state('supplier', {
        cache: false,
        url: '/supplier',
        templateUrl: 'templates/supplier.html',
        controller: 'SupplierCtrl as vm'
      }).state('login', {
        cache: false,
        url: '/login?fromUrl',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl as vm'
      }).state('smslogin', {
        cache: false,
        url: '/smslogin?fromUrl',
        templateUrl: 'templates/smslogin.html',
        controller: 'SmsloginCtrl as vm'
      }).state('logout', {
        cache: false,
        url: '/logout',
        controller: 'LogoutCtrl as vm'
      }).state('register', {
        cache: false,
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl as vm'
      }).state('reg', {
        cache: false,
        url: '/reg',
        templateUrl: 'templates/reg.html',
        controller: 'RegCtrl as vm'
      }).state('tab', {
        cache: false,
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: 'TabsCtrl as vm'
      }).state('tab.signal', {
        cache: false,
        url: "/signal/:user/:project?station",
        views: {
          'tab-signal': {
            templateUrl: 'templates/tab-signal.html',
            controller: 'SignalCtrl as vm'
          }
        }
      }).state('tab.overview', {
        cache: false,
        url: "/overview/:user/:project?station",
        views: {
          'tab-overview': {
            templateUrl: 'templates/tab-overview.html',
            controller: 'OverviewCtrl as vm'
          }
        }
      }).state('tab.survey', {
        cache: true,
        url: "/survey/:user/:project",
        views: {
          'tab-survey': {
            templateUrl: 'templates/tab-survey.html',
            controller: 'SurveyCtrl as vm'
          }
        }
      }).state('tab.event', {
        cache: false,
        url: "/event/:user/:project?station&event",
        views: {
          'tab-event': {
            templateUrl: 'templates/tab-event.html',
            controller: 'EventCtrl as vm'
          }
        }
      }).state('tab.stations', {
        cache: false,
        url: "/stations/:user/:project",
        views: {
          'tab-station': {
            templateUrl: 'templates/tab-station.html',
            controller: 'StationsCtrl as vm'
          }
        }
      }).state('tab.setting', {
        url: "/setting/:user/:project?station",
        views: {
          'tab-setting': {
            templateUrl: 'templates/tab-setting.html',
            controller: 'SettingCtrl as vm'
          }
        }
      }).state('portal', {
        cache: false,
        url: '/portal/:user/:project?auto&origin',
        templateUrl: 'templates/portal.html',
        controller: 'PortalCtrl as vm'
      }).state('project', {
        cache: false,
        url: '/project',
        templateUrl: 'templates/project.html',
        controller: 'ProjectCtrl as vm'
      }).state('order', {
        cache: true,
        url: "/order/:user/:project",
        templateUrl: 'templates/tab-order.html',
        controller: 'OrderCtrl as vm'
      }).state('scan', {
        cache: false,
        url: "/scan/:user/:project?station&origin&strScan",
        templateUrl: 'templates/scan.html',
        controller: 'ScanCtrl as vm'
      }).state('scanQr', {
        cache: false,
        url: "/scan-qr/:user/:project?station&origin",
        templateUrl: 'templates/scan-qr.html',
        controller: 'ScanQrCtrl as vm'
      }).state('equipment', {
        cache: false,
        url: '/equipment/:user/:project?station&equipment&origin',
        templateUrl: 'templates/equipment.html',
        controller: 'EquipmentCtrl as vm'
      }).state('station', {
        url: '/station/:user/:project?station',
        templateUrl: 'templates/station.html',
        controller: 'StationCtrl as vm'
      }).state('aboutUs', {
        url: '/setting/aboutUs',
        templateUrl: 'templates/setting/about-us-setting.html',
        controller: "AboutUsCtrl as vm"
      }).state('orderDetail', {
        cache: false,
        url: "/order-detail/:user/:project?task",
        templateUrl: 'templates/order-detail.html',
        controller: 'OrderDetailCtrl as vm'
      }).state('eventDetail', {
        cache: false,
        url: "/event-detail/:user/:project?station&equipment&event&origin&startTime",
        templateUrl: 'templates/event-detail.html',
        controller: 'EventDetailCtrl as vm'
      }).state('aboutApp', {
        url: '/setting/aboutApp',
        templateUrl: 'templates/setting/about-app-setting.html',
        controller: "AboutUsCtrl as vm"
      }).state('funIntro', {
        url: '/setting/functionIntroduction?versionIndex',
        templateUrl: 'templates/setting/function-introduction-setting.html',
        controller: "AboutUsCtrl as vm"
      });
      $urlRouterProvider.otherwise('/login');
    }
  ]);
});
