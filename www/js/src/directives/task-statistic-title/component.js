
/*
* File: task-statistic-title-directive
* User: David
* Date: 2019/12/31
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var TaskStatisticTitleDirective, exports;
  TaskStatisticTitleDirective = (function(_super) {
    __extends(TaskStatisticTitleDirective, _super);

    function TaskStatisticTitleDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "task-statistic-title";
      TaskStatisticTitleDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    TaskStatisticTitleDirective.prototype.setScope = function() {};

    TaskStatisticTitleDirective.prototype.setCSS = function() {
      return css;
    };

    TaskStatisticTitleDirective.prototype.setTemplate = function() {
      return view;
    };

    TaskStatisticTitleDirective.prototype.show = function(scope, element, attrs) {
      var dateMap;
      scope.currdate = moment().subtract(5, "day").format("L") + " ~ " + moment().format("L");
      scope.typeList = [];
      scope.staticsType = null;
      scope.typeName = "--";
      scope.title = "--";
      dateMap = {
        day: "YYYY-MM-DD",
        month: "YYYY-MM",
        year: "YYYY"
      };
      scope.selectStaticsType = (function(_this) {
        return function(type) {
          var exec;
          if (!type) {
            return;
          }
          if (type !== scope.staticsType) {
            scope.staticsType = type;
            exec = type === "year" ? 3 : 5;
            scope.currdate = moment().subtract(exec, type).format(dateMap[type]) + " ~ " + moment().format(dateMap[type]);
            return _this.commonService.publishEventBus("task-type", {
              type: type
            });
          }
        };
      })(this);
      return scope.$watch("parameters", (function(_this) {
        return function(param) {
          if (!param) {
            return;
          }
          if (_.isNull(scope.staticsType)) {
            scope.typeList = param.typeList;
            scope.typeName = param.typeName;
            scope.title = param.title;
            return scope.selectStaticsType(scope.typeList[0].key);
          }
        };
      })(this));
    };

    TaskStatisticTitleDirective.prototype.resize = function(scope) {};

    TaskStatisticTitleDirective.prototype.dispose = function(scope) {};

    return TaskStatisticTitleDirective;

  })(base.BaseDirective);
  return exports = {
    TaskStatisticTitleDirective: TaskStatisticTitleDirective
  };
});
