
/*
* File: mobile-signal-card-directive
* User: David
* Date: 2019/01/19
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var MobileSignalCardDirective, exports;
  MobileSignalCardDirective = (function(_super) {
    __extends(MobileSignalCardDirective, _super);

    function MobileSignalCardDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "mobile-signal-card";
      MobileSignalCardDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileSignalCardDirective.prototype.setScope = function() {};

    MobileSignalCardDirective.prototype.setCSS = function() {
      return css;
    };

    MobileSignalCardDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileSignalCardDirective.prototype.show = function(scope, element, attrs) {
      return scope.navigate = (function(_this) {
        return function() {
          return _this.publishEventBus("navigateTo", {
            stationId: scope.equipment.model.station,
            equipmentId: scope.equipment.model.equipment,
            signalId: scope.signal.model.signal
          });
        };
      })(this);
    };

    MobileSignalCardDirective.prototype.resize = function(scope) {};

    MobileSignalCardDirective.prototype.dispose = function(scope) {};

    return MobileSignalCardDirective;

  })(base.BaseDirective);
  return exports = {
    MobileSignalCardDirective: MobileSignalCardDirective
  };
});
