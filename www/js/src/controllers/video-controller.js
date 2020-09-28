var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./base/feature-base-controller'], function(base) {
  var Ctrl, exports;
  Ctrl = (function(_super) {
    __extends(Ctrl, _super);

    function Ctrl($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $ionicHistory, $ionicPopover, $ionicModal, $state) {
      this.$ionicHistory = $ionicHistory;
      this.$ionicPopover = $ionicPopover;
      this.$ionicModal = $ionicModal;
      this.$state = $state;
      if (!$routeParams.station && $rootScope.station) {
        $routeParams.station = $rootScope.station.station;
      }
      Ctrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options);
      this.init();
    }

    Ctrl.prototype.init = function() {
      return this.initModal();
    };

    Ctrl.prototype.dispose = function() {
      var _ref;
      Ctrl.__super__.dispose.apply(this, arguments);
      return (_ref = this.modal) != null ? _ref.remove() : void 0;
    };

    Ctrl.prototype.initModal = function() {
      return this.$ionicModal.fromTemplateUrl('templates/modals/station.html', {
        scope: this.$scope,
        animation: 'slide-in-up'
      }).then((function(_this) {
        return function(modal) {
          _this.modal = modal;
          _this.$scope.modal = modal;
          return _this.$scope.controller = _this;
        };
      })(this));
    };

    Ctrl.prototype.modalSelectStation = function(station) {
      this.modal.hide();
      return this.$timeout((function(_this) {
        return function() {
          return _this.selectStation(station);
        };
      })(this), 500);
    };

    Ctrl.prototype.openModal = function() {
      return this.modal.show();
    };

    Ctrl.prototype.play = function() {
      var playURI, vlcVideoPlugin, _ref;
      playURI = 'rtsp://admin:12345@192.168.0.22:554/streaming/channels/401';
      vlcVideoPlugin = (_ref = window.plugins) != null ? _ref.vlcVideoPlugin : void 0;
      return vlcVideoPlugin != null ? vlcVideoPlugin.playURI(playURI) : void 0;
    };

    Ctrl.prototype.goBack = function() {
      return this.$state.go('tab.signal', {
        user: this.project.model.user,
        project: this.project.model.project,
        station: this.station.model.station
      });
    };

    return Ctrl;

  })(base.FeatureBaseController);
  return exports = {
    Ctrl: Ctrl
  };
});
