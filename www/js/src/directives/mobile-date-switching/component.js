
/*
* File: mobile-date-switching-directive
* User: David
* Date: 2020/03/09
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var MobileDateSwitchingDirective, exports;
  MobileDateSwitchingDirective = (function(_super) {
    __extends(MobileDateSwitchingDirective, _super);

    function MobileDateSwitchingDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "mobile-date-switching";
      MobileDateSwitchingDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileDateSwitchingDirective.prototype.setScope = function() {};

    MobileDateSwitchingDirective.prototype.setCSS = function() {
      return css;
    };

    MobileDateSwitchingDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileDateSwitchingDirective.prototype.show = function(scope, element, attrs) {
      var type;
      element.find('.dropdown-trigger').dropdown();
      type = "day";
      scope.typeList = [
        {
          name: '日',
          key: 'day'
        }, {
          name: '月',
          key: 'month'
        }, {
          name: '年',
          key: 'year'
        }
      ];
      return scope.selectStaticsType = (function(_this) {
        return function(type) {
          console.log("type", type);
          if (!type) {
            return;
          }
          if (type !== scope.staticsType) {
            scope.staticsType = type;
            return _this.commonService.publishEventBus("task-type", {
              type: type
            });
          }
        };
      })(this);
    };

    MobileDateSwitchingDirective.prototype.resize = function(scope) {};

    MobileDateSwitchingDirective.prototype.dispose = function(scope) {};

    return MobileDateSwitchingDirective;

  })(base.BaseDirective);
  return exports = {
    MobileDateSwitchingDirective: MobileDateSwitchingDirective
  };
});
