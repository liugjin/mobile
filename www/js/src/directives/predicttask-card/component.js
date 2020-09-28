
/*
* File: predicttask-card-directive
* User: David
* Date: 2020/01/02
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var PredicttaskCardDirective, exports;
  PredicttaskCardDirective = (function(_super) {
    __extends(PredicttaskCardDirective, _super);

    function PredicttaskCardDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "predicttask-card";
      PredicttaskCardDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    PredicttaskCardDirective.prototype.setscope = function() {};

    PredicttaskCardDirective.prototype.setCSS = function() {
      return css;
    };

    PredicttaskCardDirective.prototype.setTemplate = function() {
      return view;
    };

    PredicttaskCardDirective.prototype.show = function(scope, element, attrs) {
      scope.count = 0;
      scope.data = [];
      scope.rings = [
        {
          key: "一般告警",
          color: 'rgb(193, 201, 80)',
          val: 0
        }, {
          key: "严重告警",
          color: 'rgb(240, 156, 57)',
          val: 0
        }, {
          key: "紧急告警",
          color: 'rgb(200, 42, 29)',
          val: 0
        }
      ];
      scope.series = [
        {
          key: "task",
          name: "工单"
        }, {
          key: "equipment",
          name: "设备"
        }
      ];
      scope.transData = [
        {
          key: '待处理',
          val: 0
        }, {
          key: '进行中',
          val: 0
        }
      ];
      scope.equipData = [
        {
          key: "待处理工单",
          val: 0,
          max: 100
        }
      ];
      scope.date = [];
      return scope.$watch("parameters", (function(_this) {
        return function(param) {
          var count, list;
          if (!param) {
            return;
          }
          if (scope.date.length === 0) {
            scope.date = param.date;
          }
          if (scope.type !== param.type) {
            scope.type = param.type;
            scope.date = param.date;
          }
          list = _.map(param.data.equipment, function(equip) {
            return {
              key: 'equipment',
              val: equip.val,
              time: equip.time
            };
          });
          scope.data = list.concat(_.map(param.data.task, function(task) {
            return {
              key: 'task',
              val: task.val,
              time: task.time
            };
          }));
          count = 0;
          _.each(param.data.task, function(task) {
            return count += task.val;
          });
          if (scope.count !== count) {
            return scope.count = count;
          }
        };
      })(this));
    };

    PredicttaskCardDirective.prototype.resize = function(scope) {};

    PredicttaskCardDirective.prototype.dispose = function(scope) {};

    return PredicttaskCardDirective;

  })(base.BaseDirective);
  return exports = {
    PredicttaskCardDirective: PredicttaskCardDirective
  };
});
