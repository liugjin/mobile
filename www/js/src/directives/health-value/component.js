
/*
* File: health-value-directive
* User: David
* Date: 2019/09/25
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var HealthValueDirective, exports;
  HealthValueDirective = (function(_super) {
    __extends(HealthValueDirective, _super);

    function HealthValueDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "health-value";
      HealthValueDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    HealthValueDirective.prototype.setScope = function() {};

    HealthValueDirective.prototype.setCSS = function() {
      return css;
    };

    HealthValueDirective.prototype.setTemplate = function() {
      return view;
    };

    HealthValueDirective.prototype.show = function(scope, element, attrs) {};

    HealthValueDirective.prototype.resize = function(scope) {};

    HealthValueDirective.prototype.dispose = function(scope) {};

    return HealthValueDirective;

  })(base.BaseDirective);
  return exports = {
    HealthValueDirective: HealthValueDirective
  };
});
