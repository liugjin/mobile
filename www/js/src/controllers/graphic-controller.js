var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./base/graphic-base-controller'], function(base) {
  var Ctrl, exports;
  Ctrl = (function(_super) {
    __extends(Ctrl, _super);

    function Ctrl($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $ionicPopover, $ionicModal) {
      this.$ionicPopover = $ionicPopover;
      this.$ionicModal = $ionicModal;
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

    Ctrl.prototype.selectStation = function(station) {
      if (!Ctrl.__super__.selectStation.call(this, station)) {
        return false;
      }
      this.loadStationGraphic(station);
      return true;
    };

    Ctrl.prototype.loadStationGraphic = function(station, refresh) {
      if (station == null) {
        station = this.station;
      }
      if (!station) {
        return;
      }
      this.templateId = {
        user: this.$routeParams.user,
        project: this.$routeParams.project,
        template: station.model.graphic || station.model.map
      };
      if (refresh) {
        this.templateId.timestamp = new Date;
      }
      return this.templateId;
    };

    return Ctrl;

  })(base.GraphicBaseController);
  return exports = {
    Ctrl: Ctrl
  };
});
