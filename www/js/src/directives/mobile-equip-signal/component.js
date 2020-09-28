
/*
* File: mobile-equip-signal-directive
* User: bingo
* Date: 2019/02/28
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var MobileEquipSignalDirective, exports;
  MobileEquipSignalDirective = (function(_super) {
    __extends(MobileEquipSignalDirective, _super);

    function MobileEquipSignalDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "mobile-equip-signal";
      MobileEquipSignalDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileEquipSignalDirective.prototype.setScope = function() {};

    MobileEquipSignalDirective.prototype.setCSS = function() {
      return css;
    };

    MobileEquipSignalDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileEquipSignalDirective.prototype.show = function(scope, element, attr) {
      var processSignalData, _ref;
      scope.communicationStatus = true;
      scope.equipment.loadProperties(null, (function(_this) {
        return function(err, properties) {
          var signals;
          signals = scope.equipment.getPropertyValue("_signals");
          if (!_.isEmpty(signals)) {
            return scope.items = _.map(JSON.parse(signals), function(item) {
              return item.signal;
            });
          }
        };
      })(this), true);
      if ((_ref = scope.subscribeEquipSignal) != null) {
        _ref.dispose();
      }
      scope.subscribeEquipSignal = this.commonService.subscribeEquipmentSignalValues(scope.equipment, (function(_this) {
        return function(signal) {
          if (signal) {
            if (signal.model.signal === "communication-status") {
              if (signal.data.value === 0) {
                return scope.communicationStatus = true;
              } else {
                return scope.communicationStatus = false;
              }
            }
          }
        };
      })(this));
      scope.getColorBySeverity = function(severity) {
        var item, _ref1, _ref2, _ref3;
        if (severity == null) {
          return '#bdbdbd';
        }
        item = (_ref1 = scope.project) != null ? (_ref2 = _ref1.typeModels.eventseverities.getItem(severity)) != null ? _ref2.model : void 0 : void 0;
        return (_ref3 = item != null ? item.color : void 0) != null ? _ref3 : "#0faa57";
      };
      scope.getNameBySeverity = function(severity) {
        var item, _ref1, _ref2, _ref3;
        if (severity == null) {
          return "信号无值";
        }
        item = (_ref1 = scope.project) != null ? (_ref2 = _ref1.typeModels.eventseverities.getItem(severity)) != null ? _ref2.model : void 0 : void 0;
        return (_ref3 = item != null ? item.name : void 0) != null ? _ref3 : "正常";
      };
      processSignalData = (function(_this) {
        return function(data) {
          var severity, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
          if (!data) {
            return;
          }
          severity = (_ref1 = scope.project) != null ? (_ref2 = _ref1.typeModels.eventseverities.getItem(data.severity)) != null ? _ref2.model : void 0 : void 0;
          data.color = (_ref3 = severity != null ? severity.color : void 0) != null ? _ref3 : '#0faa57';
          data.tooltip = (_ref4 = severity != null ? severity.name : void 0) != null ? _ref4 : '正常';
          data.eventSeverity = severity;
          data.unitName = (_ref5 = scope.project) != null ? (_ref6 = _ref5.typeModels.signaltypes.getItem(data.unit)) != null ? (_ref7 = _ref6.model) != null ? _ref7.unit : void 0 : void 0 : void 0;
          if (!data.value && !data.formatValue.toString()) {
            data.tooltip = '信号无值';
          }
          if (!data.value && !data.formatValue.toString()) {
            return data.color = '#bdbdbd';
          }
        };
      })(this);
      scope.selectSignal = (function(_this) {
        return function(signal) {
          if (!signal) {
            return;
          }
          return _this.publishEventBus('signalId', {
            stationId: signal.equipment.model.station,
            equipmentId: signal.equipment.model.equipment,
            signalId: signal.model.signal
          });
        };
      })(this);
      scope.navigate = (function(_this) {
        return function(signal) {
          if (signal.model.dataType === 'float') {
            _this.publishEventBus("navigateTo", {
              stationId: scope.equipment.model.station,
              equipmentId: scope.equipment.model.equipment,
              signalId: signal.model.signal
            });
          }
        };
      })(this);
      return scope.filterSignal = (function(_this) {
        return function() {
          return function(signal) {
            var _ref1;
            if (signal.model.visible === false) {
              return false;
            }
            if (scope.items && (_ref1 = signal.model.signal, __indexOf.call(scope.items, _ref1) < 0)) {
              return false;
            }
            return true;
          };
        };
      })(this);
    };

    MobileEquipSignalDirective.prototype.resize = function(scope) {};

    MobileEquipSignalDirective.prototype.dispose = function(scope) {
      var _ref;
      return (_ref = scope.subscribeEquipSignal) != null ? _ref.dispose() : void 0;
    };

    return MobileEquipSignalDirective;

  })(base.BaseDirective);
  return exports = {
    MobileEquipSignalDirective: MobileEquipSignalDirective
  };
});
