
/*
* File: defecttask-card-directive
* User: David
* Date: 2019/12/31
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var DefecttaskCardDirective, exports;
  DefecttaskCardDirective = (function(_super) {
    __extends(DefecttaskCardDirective, _super);

    function DefecttaskCardDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.getEquipDefectCount = __bind(this.getEquipDefectCount, this);
      this.show = __bind(this.show, this);
      this.id = "defecttask-card";
      DefecttaskCardDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    DefecttaskCardDirective.prototype.setScope = function() {};

    DefecttaskCardDirective.prototype.setCSS = function() {
      return css;
    };

    DefecttaskCardDirective.prototype.setTemplate = function() {
      return view;
    };

    DefecttaskCardDirective.prototype.show = function(scope, element, attrs) {
      var keyMap;
      scope.count = 0;
      scope.warnSeries = [
        {
          key: "common",
          name: "故障工单",
          color: 'rgb(193, 201, 80)'
        }
      ];
      scope.date = [];
      scope.warnData = [];
      scope.transData = [
        {
          key: "待处理",
          val: 0
        }, {
          key: "进行中",
          val: 0
        }
      ];
      scope.type = "day";
      keyMap = {
        day: ["本日待处理故障", "近五日前十故障设备"],
        month: ["本月待处理故障", "近五月前十故障设备"],
        year: ["今年待处理故障", "近三年前十故障设备"]
      };
      scope.equipData = [
        {
          key: "待处理故障",
          val: 0,
          max: 100
        }
      ];
      scope.rankData = [];
      scope.$watch("parameters", (function(_this) {
        return function(param) {
          var count, handleResult, tmpHandlingCounts;
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
          tmpHandlingCounts = 0;
          count = 0;
          scope.warnData = _.map(param.data.task, function(task) {
            if (!(_.isEmpty(task.phase))) {
              tmpHandlingCounts += task.val;
            }
            count += task.val;
            return {
              key: 'common',
              val: task.val,
              time: task.time
            };
          });
          scope.count = count;
          handleResult = _.find(scope.equipData, {
            key: "待处理故障"
          });
          handleResult.val = tmpHandlingCounts;
          return scope.$applyAsync();
        };
      })(this));
      return scope.$watch("parameters.type", (function(_this) {
        return function(type) {
          if (!scope.firstload) {
            scope.rankData = [
              {
                id: "task-defect",
                key: "故障工单",
                stack: "defect",
                val: 30,
                sort: 0
              }, {
                id: "task-plan",
                key: "巡检工单",
                stack: "defect",
                val: 30,
                sort: 1
              }, {
                id: "task-predict",
                key: "维保工单",
                stack: "defect",
                val: 30,
                sort: 2
              }
            ];
            _this.getEquipDefectCount(scope);
            return scope.$applyAsync();
          }
        };
      })(this));
    };

    DefecttaskCardDirective.prototype.getEquipDefectCount = function(scope) {
      var aggregateCons, execCount, filter, formatTypeMap, formatTypeMap2, groupObj, matchObj, type;
      aggregateCons = [];
      matchObj = {};
      groupObj = {};
      type = scope.parameters.type;
      execCount = scope.parameters.type === "year" ? 3 : 5;
      formatTypeMap = {
        day: "%Y-%m-%d",
        month: "%Y-%m",
        year: "%Y"
      };
      formatTypeMap2 = {
        day: "MM-DD",
        month: "YYYY-MM",
        year: "YYYY"
      };
      filter = scope.project.getIds();
      filter.type = "defect";
      filter.createtime = {
        $gte: moment().subtract(execCount, type).startOf(type),
        $lte: moment().endOf(type)
      };
      groupObj.$group = {
        _id: {
          station: "$source.station",
          equipment: "$source.equipment",
          stationName: "$source.stationName",
          equipmentName: "$source.equipmentName"
        },
        defects: {
          $sum: 1
        }
      };
      matchObj.$match = filter;
      aggregateCons.push(matchObj);
      aggregateCons.push(groupObj);
      aggregateCons.push({
        $sort: {
          defects: -1
        }
      });
      return this.commonService.reportingService.aggregateTasks({
        filter: scope.project.getIds(),
        pipeline: aggregateCons,
        options: {
          allowDiskUse: true
        }
      }, (function(_this) {
        return function(err, records) {
          var rec, recount, _i, _len;
          if (!records) {
            return;
          }
          scope.rankData = [];
          recount = 0;
          for (_i = 0, _len = records.length; _i < _len; _i++) {
            rec = records[_i];
            scope.rankData.push({
              id: rec._id.station + "." + rec._id.equipment,
              key: rec._id.stationName + "." + rec._id.equipmentName,
              stack: "故障数前十设备",
              val: rec.defects,
              sort: recount
            });
            recount++;
          }
          return console.info(scope.rankData);
        };
      })(this));
    };

    DefecttaskCardDirective.prototype.resize = function(scope) {};

    DefecttaskCardDirective.prototype.dispose = function(scope) {};

    return DefecttaskCardDirective;

  })(base.BaseDirective);
  return exports = {
    DefecttaskCardDirective: DefecttaskCardDirective
  };
});
