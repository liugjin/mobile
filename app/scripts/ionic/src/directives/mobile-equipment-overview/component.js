// Generated by IcedCoffeeScript 108.0.11

/*
* File: mobile-equipment-overview-directive
* User: David
* Date: 2019/01/19
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var MobileEquipmentOverviewDirective, exports;
  MobileEquipmentOverviewDirective = (function(_super) {
    __extends(MobileEquipmentOverviewDirective, _super);

    function MobileEquipmentOverviewDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "mobile-equipment-overview";
      MobileEquipmentOverviewDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileEquipmentOverviewDirective.prototype.setScope = function() {};

    MobileEquipmentOverviewDirective.prototype.setCSS = function() {
      return css;
    };

    MobileEquipmentOverviewDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileEquipmentOverviewDirective.prototype.show = function(scope, element, attrs) {
      var closeFullScreen, getShowSignal, getUnit;
      scope.setting = setting;
      scope.navigate = (function(_this) {
        return function(signal) {
          return _this.publishEventBus("navigateTo", {
            stationId: scope.equipment.model.station,
            equipmentId: scope.equipment.model.equipment,
            signalId: signal.model.signal
          });
        };
      })(this);
      closeFullScreen = function() {
        if (document.exitFullscreen) {
          return document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          return document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          return document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          return document.msExitFullscreen();
        }
      };
      scope.fullGraphic = (function(_this) {
        return function() {
          if (document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement) {
            return closeFullScreen();
          } else {
            return scope.controller.fullscreen("#graphic");
          }
        };
      })(this);
      scope.$watch("equipment", (function(_this) {
        return function(equipment) {
          var _ref;
          scope.equipmentStatus = 0;
          if ((_ref = scope.equipmentSubscription) != null) {
            _ref.dispose();
          }
          if (!equipment) {
            return;
          }
          scope.equipmentSubscription = _this.commonService.subscribeEquipmentSignalValues(equipment, function(signal) {
            if (signal.model.signal === "communication-status") {
              scope.equipmentStatus = signal.data.value;
            }
            _this.processSignalData(scope, signal.data);
            return scope.$applyAsync();
          });
          return getShowSignal(equipment, function(signalDatas) {
            scope.signalComponent = signalDatas;
            return _this.getProperty(scope, '_signals');
          });
        };
      })(this));
      scope.$watch('property', (function(_this) {
        return function(property) {
          var item, s, signals, _i, _len, _signals;
          if (!property) {
            return;
          }
          _signals = JSON.parse(property.value);
          signals = [];
          for (_i = 0, _len = _signals.length; _i < _len; _i++) {
            s = _signals[_i];
            item = _.find(scope.equipment.signals.items, function(item) {
              return item.model.signal === s.signal;
            });
            if (item) {
              signals.push(item);
            }
          }
          return scope.signalComponent = signals;
        };
      })(this));
      getShowSignal = (function(_this) {
        return function(equip, callback) {
          return equip.loadSignals(null, function(err, signals) {
            var signalList, unit;
            unit = getUnit();
            signalList = [];
            _.map(signals, function(a) {
              if (a.model.signal !== "communication-status") {
                return signalList.push(a);
              }
            });
            return typeof callback === "function" ? callback(signalList) : void 0;
          }, true);
        };
      })(this);
      return getUnit = function() {
        return scope.project.dictionary.units.items;
      };
    };

    MobileEquipmentOverviewDirective.prototype.processSignalData = function(scope, data) {
      var severity, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
      severity = (_ref = scope.project) != null ? (_ref1 = _ref.typeModels.eventseverities.getItem(data.severity)) != null ? _ref1.model : void 0 : void 0;
      data.color = (_ref2 = severity != null ? severity.color : void 0) != null ? _ref2 : '#0faa57';
      data.tooltip = (_ref3 = severity != null ? severity.name : void 0) != null ? _ref3 : '信号正常';
      data.eventSeverity = severity;
      data.unit = (_ref4 = scope.project) != null ? (_ref5 = _ref4.typeModels.signaltypes.getItem(data.unit)) != null ? (_ref6 = _ref5.model) != null ? _ref6.unit : void 0 : void 0 : void 0;
      if (severity && !data.isalarm && navigator.vibrate) {
        data.isalarm = true;
        return navigator.vibrate(200);
      }
    };

    MobileEquipmentOverviewDirective.prototype.resize = function(scope) {};

    MobileEquipmentOverviewDirective.prototype.dispose = function(scope) {
      var _ref;
      return (_ref = scope.equipmentSubscription) != null ? _ref.dispose() : void 0;
    };

    return MobileEquipmentOverviewDirective;

  })(base.BaseDirective);
  return exports = {
    MobileEquipmentOverviewDirective: MobileEquipmentOverviewDirective
  };
});
