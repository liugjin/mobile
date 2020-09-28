
/*
* File: mobile-focus-equip-directive
* User: David
* Date: 2019/07/19
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var MobileFocusEquipDirective, exports;
  MobileFocusEquipDirective = (function(_super) {
    __extends(MobileFocusEquipDirective, _super);

    function MobileFocusEquipDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.checkEquipFollow = __bind(this.checkEquipFollow, this);
      this.show = __bind(this.show, this);
      this.id = "mobile-focus-equip";
      MobileFocusEquipDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileFocusEquipDirective.prototype.setScope = function() {};

    MobileFocusEquipDirective.prototype.setCSS = function() {
      return css;
    };

    MobileFocusEquipDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileFocusEquipDirective.prototype.show = function(scope, element, attrs) {
      var station, stations, _i, _len, _results;
      scope.equips = [];
      scope.statusSubscription = {};
      scope.alarmSubscription = {};
      stations = this.commonService.loadStationChildren(scope.station, true);
      _results = [];
      for (_i = 0, _len = stations.length; _i < _len; _i++) {
        station = stations[_i];
        _results.push(station.loadEquipments(null, null, (function(_this) {
          return function(err, equips) {
            return _.each(equips, function(equip) {
              return _this.checkEquipFollow(scope, equip);
            });
          };
        })(this)));
      }
      return _results;
    };

    MobileFocusEquipDirective.prototype.checkEquipFollow = function(scope, equip) {
      if (this.filterType(scope, equip.model.type)) {
        return equip.loadProperties(null, (function(_this) {
          return function(err, properties) {
            var follow;
            follow = JSON.parse(equip.getPropertyValue("follow", "{}"));
            if (follow[_this.commonService.$rootScope.user.user]) {
              equip.loadSignals(null, function(err, signals) {
                var alarms, communication, _ref, _ref1;
                communication = _.find(signals, function(sig) {
                  return sig.model.signal === "communication-status";
                });
                if ((_ref = scope.statusSubscription[equip.key]) != null) {
                  _ref.dispose();
                }
                scope.statusSubscription[equip.key] = _this.commonService.subscribeSignalValue(communication);
                alarms = _.find(signals, function(sig) {
                  return sig.model.signal === "alarms";
                });
                if ((_ref1 = scope.alarmSubscription[equip.key]) != null) {
                  _ref1.dispose();
                }
                return scope.alarmSubscription[equip.key] = _this.commonService.subscribeSignalValue(alarms);
              });
              return scope.equips.push(equip);
            }
          };
        })(this));
      }
    };

    MobileFocusEquipDirective.prototype.filterType = function(scope, type) {
      var item, _ref;
      item = _.find(scope.project.dictionary.equipmenttypes.items, function(tp) {
        return tp.model.type === type;
      });
      if ((item != null ? (_ref = item.model) != null ? _ref.visible : void 0 : void 0) === false) {
        return false;
      }
      if (type.substr(0, 1) === "_") {
        return false;
      }
      return true;
    };

    MobileFocusEquipDirective.prototype.resize = function(scope) {};

    MobileFocusEquipDirective.prototype.dispose = function(scope) {
      var key, value, _ref, _ref1, _results;
      _ref = scope.statusSubscription;
      for (key in _ref) {
        value = _ref[key];
        if (value != null) {
          value.dispose();
        }
      }
      _ref1 = scope.alarmSubscription;
      _results = [];
      for (key in _ref1) {
        value = _ref1[key];
        _results.push(value != null ? value.dispose() : void 0);
      }
      return _results;
    };

    return MobileFocusEquipDirective;

  })(base.BaseDirective);
  return exports = {
    MobileFocusEquipDirective: MobileFocusEquipDirective
  };
});
