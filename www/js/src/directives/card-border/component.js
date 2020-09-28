
/*
* File: card-border-directive
* User: David
* Date: 2019/12/26
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var CardBorderDirective, exports;
  CardBorderDirective = (function(_super) {
    __extends(CardBorderDirective, _super);

    function CardBorderDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "card-border";
      CardBorderDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    CardBorderDirective.prototype.setScope = function() {};

    CardBorderDirective.prototype.setCSS = function() {
      return css;
    };

    CardBorderDirective.prototype.setTemplate = function() {
      return view;
    };

    CardBorderDirective.prototype.show = function(scope, element, attrs) {
      scope.title = null;
      scope.buttonText = null;
      scope.desc = [];
      scope.options = [];
      scope.selectOption = (function(_this) {
        return function(option) {
          return console.log(option);
        };
      })(this);
      return scope.$watch("parameters", (function(_this) {
        return function(param) {
          if (!param) {
            return;
          }
          _.mapObject(param, function(d, i) {
            if (typeof d === "string" && scope[i] !== d) {
              return scope[i] = d;
            } else if (d instanceof Array) {
              return scope[i] = d;
            }
          });
          return scope.$applyAsync();
        };
      })(this));
    };

    CardBorderDirective.prototype.resize = function(scope) {};

    CardBorderDirective.prototype.dispose = function(scope) {};

    return CardBorderDirective;

  })(base.BaseDirective);
  return exports = {
    CardBorderDirective: CardBorderDirective
  };
});
