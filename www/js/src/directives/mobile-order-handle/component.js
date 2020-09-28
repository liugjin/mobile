
/*
* File: mobile-order-handle-directive
* User: David
* Date: 2019/07/30
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var MobileOrderHandleDirective, exports;
  MobileOrderHandleDirective = (function(_super) {
    __extends(MobileOrderHandleDirective, _super);

    function MobileOrderHandleDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "mobile-order-handle";
      MobileOrderHandleDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileOrderHandleDirective.prototype.setScope = function() {};

    MobileOrderHandleDirective.prototype.setCSS = function() {
      return css;
    };

    MobileOrderHandleDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileOrderHandleDirective.prototype.show = function(scope, element, attrs) {
      element.find('.collapsible').collapsible();
      scope.focus = 1;
      return scope.selectEquipType = (function(_this) {
        return function(i) {
          scope.focus = i;
          return console.log("123", scope.focus);
        };
      })(this);
    };

    MobileOrderHandleDirective.prototype.resize = function(scope) {};

    MobileOrderHandleDirective.prototype.dispose = function(scope) {};

    return MobileOrderHandleDirective;

  })(base.BaseDirective);
  return exports = {
    MobileOrderHandleDirective: MobileOrderHandleDirective
  };
});
