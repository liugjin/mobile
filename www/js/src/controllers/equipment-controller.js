var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./base/graphic-base-controller', 'moment'], function(base, moment) {
  var Ctrl, exports;
  Ctrl = (function(_super) {
    __extends(Ctrl, _super);

    function Ctrl($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $ionicPopover, $ionicModal, $ionicTabsDelegate, commonService, $state) {
      this.$ionicPopover = $ionicPopover;
      this.$ionicModal = $ionicModal;
      this.$ionicTabsDelegate = $ionicTabsDelegate;
      this.commonService = commonService;
      this.$state = $state;
      Ctrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options);
    }

    Ctrl.prototype.load = function() {
      return Ctrl.__super__.load.call(this, (function(_this) {
        return function(err, data) {
          var _ref;
          _this.station.loadEquipment(_this.$routeParams.equipment, null, function(err, equipment) {
            var _ref;
            if (!err) {
              _this.equipment = equipment;
            }
            if (_this.equipment) {
              _this.currentEquipInfo = {
                stationId: _this.equipment.model.station,
                equipmentId: _this.equipment.model.equipment,
                type: _this.equipment.model.type,
                name: _this.equipment.model.name
              };
            }
            return (_ref = _this.equipment) != null ? _ref.loadEquipmentTemplate(null, function(err, template) {
              _this.templateId = _this.equipment.getTemplateValue('directive');
              return setTimeout(function() {
                return _this.templateParameters = {
                  station: _this.equipment.model.station,
                  equipment: _this.equipment.model.equipment
                };
              }, 100);
            }) : void 0;
          });
          if ((_ref = _this.subscription) != null) {
            _ref.dispose();
          }
          return _this.subscription = _this.commonService.subscribeEventBus("navigateTo", function(msg) {
            var event;
            event = new MouseEvent("click", {
              bubbles: true,
              cancelable: true,
              view: window
            });
            event.isIonicTap = true;
            $("a[href='#history']")[0].dispatchEvent(event);
            return setTimeout(function() {
              return _this.commonService.publishEventBus("signalId", {
                stationId: msg.message.stationId,
                equipment: msg.message.equipmentId,
                signalId: msg.message.signalId
              });
            }, 10);
          });
        };
      })(this));
    };

    Ctrl.prototype.onTemplateLoad = function() {};

    Ctrl.prototype.goBack = function() {
      if (this.$routeParams.origin) {
        return this.$state.go('scan', {
          user: this.$routeParams.user,
          project: this.$routeParams.project,
          origin: this.$routeParams.origin
        });
      } else {
        return this.$state.go('tab.signal', {
          user: this.$routeParams.user,
          project: this.$routeParams.project,
          station: this.$routeParams.station
        });
      }
    };

    Ctrl.prototype.dispose = function() {
      var _ref;
      Ctrl.__super__.dispose.apply(this, arguments);
      return (_ref = this.subscription) != null ? _ref.dispose() : void 0;
    };

    return Ctrl;

  })(base.GraphicBaseController);
  return exports = {
    Ctrl: Ctrl
  };
});
