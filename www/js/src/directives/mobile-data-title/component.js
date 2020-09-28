
/*
* File: mobile-data-title-directive
* User: David
* Date: 2020/03/09
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var MobileDataTitleDirective, exports;
  MobileDataTitleDirective = (function(_super) {
    __extends(MobileDataTitleDirective, _super);

    function MobileDataTitleDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "mobile-data-title";
      MobileDataTitleDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileDataTitleDirective.prototype.setScope = function() {};

    MobileDataTitleDirective.prototype.setCSS = function() {
      return css;
    };

    MobileDataTitleDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileDataTitleDirective.prototype.show = function(scope, element, attrs) {
      var dateMap, _ref;
      dateMap = {
        day: "YYYY-MM-DD",
        month: "YYYY-MM",
        year: "YYYY"
      };
      scope.currdate = moment().subtract(5, "day").format(dateMap["day"]) + " ~ " + moment().format(dateMap["day"]);
      if ((_ref = this.subscription) != null) {
        _ref.dispose();
      }
      return this.subscription = this.commonService.subscribeEventBus("task-type", (function(_this) {
        return function(msg) {
          var exec, type;
          if (msg && msg.message) {
            type = msg.message.type;
            exec = type === "year" ? 3 : 5;
            return scope.currdate = moment().subtract(exec, type).format(dateMap[type]) + " ~ " + moment().format(dateMap[type]);
          }
        };
      })(this));
    };

    MobileDataTitleDirective.prototype.resize = function(scope) {};

    MobileDataTitleDirective.prototype.dispose = function(scope) {
      var _ref;
      return (_ref = this.subscription) != null ? _ref.dispose() : void 0;
    };

    return MobileDataTitleDirective;

  })(base.BaseDirective);
  return exports = {
    MobileDataTitleDirective: MobileDataTitleDirective
  };
});
