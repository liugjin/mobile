
/*
* File: mobile-signal-value-directive
* User: bingo
* Date: 2019/02/18
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var MobileSignalValueDirective, exports;
  MobileSignalValueDirective = (function(_super) {
    __extends(MobileSignalValueDirective, _super);

    function MobileSignalValueDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "mobile-signal-value";
      MobileSignalValueDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileSignalValueDirective.prototype.setScope = function() {};

    MobileSignalValueDirective.prototype.setCSS = function() {
      return css;
    };

    MobileSignalValueDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileSignalValueDirective.prototype.show = function($scope, element, attrs) {
      $scope.moreImg = this.getComponentPath('image/more.svg');
      $scope.$watch('station', (function(_this) {
        return function(station) {
          var _ref;
          if (!station) {
            return;
          }
          return _this.getEquipment($scope, (_ref = $scope.parameters.equipment) != null ? _ref : '_station_management');
        };
      })(this));
      $scope.$watch('equipment', (function(_this) {
        return function(equipment) {
          var _ref;
          if (!equipment) {
            return;
          }
          return _this.getSignal($scope, (_ref = $scope.parameters.signal) != null ? _ref : '');
        };
      })(this));
      return $scope.$watch('signal', (function(_this) {
        return function(signal) {
          var filter;
          if (!signal) {
            return;
          }
          filter = {
            user: signal.model.user,
            project: signal.model.project,
            station: signal.equipment.model.station,
            equipment: signal.equipment.model.equipment,
            signal: signal.model.signal
          };
          return $scope.signalSubscrip = _this.commonService.signalLiveSession.subscribeValues(filter, function(err, d) {
            if (!d) {
              return;
            }
            return signal.setValue(d.message);
          });
        };
      })(this));
    };

    MobileSignalValueDirective.prototype.resize = function($scope) {};

    MobileSignalValueDirective.prototype.dispose = function($scope) {
      return $scope.signalSubscrip.dispose();
    };

    return MobileSignalValueDirective;

  })(base.BaseDirective);
  return exports = {
    MobileSignalValueDirective: MobileSignalValueDirective
  };
});
