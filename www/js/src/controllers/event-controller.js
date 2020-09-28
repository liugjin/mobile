var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./base/feature-base-controller'], function(base) {
  var Ctrl, exports;
  Ctrl = (function(_super) {
    __extends(Ctrl, _super);

    function Ctrl($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $ionicPopover, $ionicModal, commonService, $state) {
      this.$ionicPopover = $ionicPopover;
      this.$ionicModal = $ionicModal;
      this.commonService = commonService;
      this.$state = $state;
      if (!$routeParams.station && $rootScope.station) {
        $routeParams.station = $rootScope.station.station;
      }
      Ctrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options);
    }

    Ctrl.prototype.init = function() {
      var _ref, _ref1;
      this.initModal();
      if ((_ref = this.equipSubscription) != null) {
        _ref.dispose();
      }
      this.equipSubscription = this.commonService.subscribeEventBus("selectEvent", (function(_this) {
        return function(msg) {
          _this.$routeParams = msg.message;
          return _this.$ionicModal.fromTemplateUrl('templates/event-detail.html', {
            scope: _this.$scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            var _ref1;
            _this.emodal = modal;
            _this.$scope.vm = _this;
            return (_ref1 = _this.emodal) != null ? _ref1.show() : void 0;
          });
        };
      })(this));
      if ((_ref1 = this.goEquipSubscription) != null) {
        _ref1.dispose();
      }
      return this.goEquipSubscription = this.commonService.subscribeEventBus("goEquip", (function(_this) {
        return function(msg) {
          var _ref2;
          if ((_ref2 = _this.emodal) != null) {
            _ref2.remove();
          }
          return _this.$state.go('equipment', msg.message);
        };
      })(this));
    };

    Ctrl.prototype.dispose = function() {
      var _ref, _ref1, _ref2, _ref3;
      Ctrl.__super__.dispose.apply(this, arguments);
      if ((_ref = this.modal) != null) {
        _ref.remove();
      }
      if ((_ref1 = this.emodal) != null) {
        _ref1.remove();
      }
      if ((_ref2 = this.equipSubscription) != null) {
        _ref2.dispose();
      }
      return (_ref3 = this.goEquipSubscription) != null ? _ref3.dispose() : void 0;
    };

    Ctrl.prototype.load = function(callback, refresh) {
      return this.init();
    };

    Ctrl.prototype.initModal = function() {
      return this.$ionicModal.fromTemplateUrl('templates/modals/event.html', {
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
      var _ref;
      if ((_ref = this.modal) != null) {
        _ref.hide();
      }
      return this.$timeout((function(_this) {
        return function() {
          return _this.selectStation(station);
        };
      })(this), 500);
    };

    Ctrl.prototype.openModal = function() {
      return this.modal.show();
    };

    Ctrl.prototype.selectEvent = function(event) {
      return Ctrl.__super__.selectEvent.call(this, event);
    };

    Ctrl.prototype.selectEventSeverity = function() {};

    Ctrl.prototype.goBack = function() {
      var _ref;
      return (_ref = this.emodal) != null ? _ref.remove() : void 0;
    };

    return Ctrl;

  })(base.FeatureBaseController);
  return exports = {
    Ctrl: Ctrl
  };
});
