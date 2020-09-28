


define [
  'services/constants-service'
  'services/storage-service'

  'clc.foundation.angular/services/http-service'
  'clc.foundation.angular/services/resource-model-service'
  'clc.foundation.angular/services/upload-service'
#  'clc.foundation.angular/services/auth-service'
  'clc.foundation.angular/services/model-service'
  'clc.foundation.angular/services/model-manager'
  'clc.foundation.angular/live/live-service'
  'services/reporting-service'
  'models/model-engine'


  'services/toast-service'
  'services/cloud-auth-service'
], (
  constants,
  storageService,

  httpService,
  resourceService,
  uploadService,
#  authService,
  modelService,
  modelManager,
  liveService,
  reportingService,
  modelEngine,


  toastService,
  cloudAuthService
) ->
  services = angular.module('clc.services', [])

  services.constant 'settingService', constants.Constants
  services.factory 'storage', ['store', 'settingService', storageService.service]

  services.service 'httpService', ['$rootScope', '$http', httpService.HttpService]
  services.service 'resourceService', ['$resource', resourceService.ResourceModelService]
#  services.service 'uploadService', ['$http', uploadService.UploadService]
  services.service 'uploadService', ['$rootScope', '$http', uploadService.UploadService]
#  services.service 'authService', ['$rootScope', '$location', '$cookieStore', 'storage', 'httpService', authService.AuthService]
  services.service 'modelService', ['$rootScope', '$http', modelService.ModelService]
  services.service 'modelManager', ['$rootScope', '$http', ($scope, $http) ->
    new modelManager.ModelManager $scope, $http, window.setting
  ]
  services.service 'liveService', ['$rootScope', 'socket', liveService.LiveService]
  services.service 'reportingService', ['$rootScope', '$http', ($rootScope, $http) ->
    new reportingService.ReportingService $rootScope, $http, window.setting.urls
  ]
  services.service 'modelEngine', ['$rootScope', 'modelManager', 'storage', ($rootScope, modelManager, storage) ->
    new modelEngine.ModelEngine $rootScope, modelManager, storage
  ]

  services.service 'toastService', ['$window', '$timeout', '$ionicLoading', '$cordovaToast', 'settingService', toastService.service]
  services.service 'cloudAuthService', ['$rootScope', 'storage', '$resource', 'settingService', cloudAuthService.CloudAuthService]

  services
