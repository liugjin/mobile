// Generated by IcedCoffeeScript 108.0.11

/*
* File: mobile-fault-yun-directive
* User: David
* Date: 2020/03/09
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", "echarts"], function(base, css, view, _, moment, echarts) {
  var MobileFaultYunDirective, exports;
  MobileFaultYunDirective = (function(_super) {
    __extends(MobileFaultYunDirective, _super);

    function MobileFaultYunDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.equipmentSort = __bind(this.equipmentSort, this);
      this.createChartOption = __bind(this.createChartOption, this);
      this.getEquipDefectCount = __bind(this.getEquipDefectCount, this);
      this.show = __bind(this.show, this);
      this.id = "mobile-fault-yun";
      MobileFaultYunDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileFaultYunDirective.prototype.setScope = function() {};

    MobileFaultYunDirective.prototype.setCSS = function() {
      return css;
    };

    MobileFaultYunDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileFaultYunDirective.prototype.show = function(scope, element, attrs) {
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
            _this.getEquipDefectCount(scope, element);
            return scope.$applyAsync();
          }
        };
      })(this));
    };

    MobileFaultYunDirective.prototype.getEquipDefectCount = function(scope, element) {
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
          var param, rec, recount, _i, _len;
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
              sort: recount,
              type: "bar"
            });
            recount++;
          }
          param = {
            data: scope.rankData
          };
          return _this.createChartOption(scope, element, param);
        };
      })(this));
    };

    MobileFaultYunDirective.prototype.createChartOption = function(scope, element, param) {
      var countMax, da, e, option, seriesData, xdata, _i, _len, _ref, _ref1;
      xdata = [];
      seriesData = [];
      param.data.sort(this.equipmentSort("val"));
      _ref = param.data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        da = _ref[_i];
        xdata.push(da.key);
        seriesData.push(da.val);
      }
      e = element.find('.echarts');
      if ((_ref1 = scope.chart) != null) {
        _ref1.dispose();
      }
      option = {
        color: ['#F1A700'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: "4%",
          bottom: "30%"
        },
        legend: {
          selectedMode: false,
          data: ["故障数前十"],
          icon: "circle",
          right: 0,
          top: 0,
          textStyle: {
            color: "#A6A6A6"
          }
        },
        xAxis: [
          {
            type: 'category',
            data: ["用气区域2#.1#燃气表", "水务区1#.1#水房"],
            nameLocation: 'end',
            axisLabel: {
              color: "#A6A6A6",
              interval: 0,
              formatter: (function(_this) {
                return function(params, index) {
                  if (index % 2 !== 0) {
                    return '\n\n' + params;
                  } else {
                    return params;
                  }
                };
              })(this)
            },
            axisLine: {
              lineStyle: {
                color: "#F0F3F4"
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            min: 0,
            max: 200,
            axisLabel: {
              color: "#A6A6A6",
              interval: 1
            },
            axisLine: {
              lineStyle: {
                color: "#F0F3F4"
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#F0F3F4'],
                width: 1,
                type: 'solid'
              }
            }
          }
        ],
        series: [
          {
            name: '故障数前10排名',
            type: 'bar',
            barWidth: '60%',
            data: seriesData
          }
        ]
      };
      countMax = _.mapObject(_.groupBy(param.data, function(d) {
        return d.type;
      }), (function(_this) {
        return function(n) {
          var max;
          max = _.max(n, function(m) {
            return m.val;
          }).val;
          if (max < 10) {
            return 10;
          }
          return Math.ceil(max / 30) * 30;
        };
      })(this));
      option.yAxis[0].max = countMax.bar ? countMax.bar : 500;
      option.yAxis[0].interval = countMax.bar ? countMax.bar / 5 : 100;
      scope.chart = echarts.init(e[0]);
      return scope.chart.setOption(option);
    };

    MobileFaultYunDirective.prototype.equipmentSort = function(key) {
      return (function(_this) {
        return function(a, b) {
          var value1, value2;
          value1 = a[key];
          value2 = b[key];
          return value2 - value1;
        };
      })(this);
    };

    MobileFaultYunDirective.prototype.resize = function(scope) {};

    MobileFaultYunDirective.prototype.dispose = function(scope) {};

    return MobileFaultYunDirective;

  })(base.BaseDirective);
  return exports = {
    MobileFaultYunDirective: MobileFaultYunDirective
  };
});
