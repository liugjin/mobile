
/*
* File: signal-value-directive
* User: David
* Date: 2019/01/24
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var SignalValueDirective, exports;
  SignalValueDirective = (function(_super) {
    __extends(SignalValueDirective, _super);

    function SignalValueDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "signal-value";
      SignalValueDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    SignalValueDirective.prototype.setScope = function() {
      return {
        name: '=',
        image: '=',
        value: '='
      };
    };

    SignalValueDirective.prototype.setCSS = function() {
      return css;
    };

    SignalValueDirective.prototype.setTemplate = function() {
      return view;
    };

    SignalValueDirective.prototype.show = function(scope, element, attrs) {};

    SignalValueDirective.prototype.resize = function(scope) {};

    SignalValueDirective.prototype.dispose = function(scope) {};

    return SignalValueDirective;

  })(base.BaseDirective);
  return exports = {
    SignalValueDirective: SignalValueDirective
  };
});
