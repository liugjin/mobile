define(['services/constants-service', 'services/storage-service', 'clc.foundation.angular/services/http-service', 'clc.foundation.angular/services/resource-model-service', 'clc.foundation.angular/services/upload-service', 'clc.foundation.angular/services/model-service', 'clc.foundation.angular/services/model-manager', 'clc.foundation.angular/live/live-service', 'services/reporting-service', 'models/model-engine', 'services/toast-service', 'services/cloud-auth-service'], function(constants, storageService, httpService, resourceService, uploadService, modelService, modelManager, liveService, reportingService, modelEngine, toastService, cloudAuthService) {
  var services;
  services = angular.module('clc.services', []);
  services.constant('settingService', constants.Constants);
  services.factory('storage', ['store', 'settingService', storageService.service]);
  services.service('httpService', ['$rootScope', '$http', httpService.HttpService]);
  services.service('resourceService', ['$resource', resourceService.ResourceModelService]);
  services.service('uploadService', ['$rootScope', '$http', uploadService.UploadService]);
  services.service('modelService', ['$rootScope', '$http', modelService.ModelService]);
  services.service('modelManager', [
    '$rootScope', '$http', function($scope, $http) {
      return new modelManager.ModelManager($scope, $http, window.setting);
    }
  ]);
  services.service('liveService', ['$rootScope', 'socket', liveService.LiveService]);
  services.service('reportingService', [
    '$rootScope', '$http', function($rootScope, $http) {
      return new reportingService.ReportingService($rootScope, $http, window.setting.urls);
    }
  ]);
  services.service('modelEngine', [
    '$rootScope', 'modelManager', 'storage', function($rootScope, modelManager, storage) {
      return new modelEngine.ModelEngine($rootScope, modelManager, storage);
    }
  ]);
  services.service('toastService', ['$window', '$timeout', '$ionicLoading', '$cordovaToast', 'settingService', toastService.service]);
  services.service('cloudAuthService', ['$rootScope', 'storage', '$resource', 'settingService', cloudAuthService.CloudAuthService]);
  return services;
});
