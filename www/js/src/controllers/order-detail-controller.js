var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./base/feature-base-controller', 'clc.foundation.angular/filters/format-string-filter', 'moment', 'rx', 'underscore'], function(base, fsf, moment, Rx, _) {
  var Ctrl, exports;
  Ctrl = (function(_super) {
    __extends(Ctrl, _super);

    function Ctrl($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $ionicPopover, $ionicModal, commonService, $state, $ionicPopup, $ionicActionSheet, $cordovaCamera, $ionicHistory) {
      this.$ionicPopover = $ionicPopover;
      this.$ionicModal = $ionicModal;
      this.commonService = commonService;
      this.$state = $state;
      this.$ionicPopup = $ionicPopup;
      this.$ionicActionSheet = $ionicActionSheet;
      this.$cordovaCamera = $cordovaCamera;
      this.$ionicHistory = $ionicHistory;
      Ctrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options);
    }

    Ctrl.prototype.dispose = function() {};

    return Ctrl;

  })(base.FeatureBaseController);
  return exports = {
    Ctrl: Ctrl
  };
});
