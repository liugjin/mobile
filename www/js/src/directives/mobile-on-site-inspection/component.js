
/*
* File: mobile-on-site-inspection-directive
* User: David
* Date: 2020/03/09
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", "echarts"], function(base, css, view, _, moment, echarts) {
  var MobileOnSiteInspectionDirective, exports;
  MobileOnSiteInspectionDirective = (function(_super) {
    __extends(MobileOnSiteInspectionDirective, _super);

    function MobileOnSiteInspectionDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.createChartOption = __bind(this.createChartOption, this);
      this.show = __bind(this.show, this);
      this.id = "mobile-on-site-inspection";
      MobileOnSiteInspectionDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileOnSiteInspectionDirective.prototype.setScope = function() {};

    MobileOnSiteInspectionDirective.prototype.setCSS = function() {
      return css;
    };

    MobileOnSiteInspectionDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileOnSiteInspectionDirective.prototype.show = function(scope, element, attrs) {
      scope.workSeries = [
        {
          key: "bar",
          name: "工单",
          color: "rgb(85, 189, 255)"
        }, {
          key: "line",
          name: "巡检项",
          color: "rgb(200, 134, 147)"
        }
      ];
      scope.rignData = [
        {
          type: "allworkitems",
          title: "巡检项总数",
          val: 30,
          peresent: 0
        }, {
          type: "handling",
          title: "待处理工单数",
          val: 10,
          peresent: 0
        }, {
          type: "execepequips",
          title: "异常巡检点",
          val: 10,
          peresent: 0
        }
      ];
      scope.date = [];
      scope.workData = [];
      scope.type = "day";
      scope.count = 0;
      return scope.$watch("parameters", (function(_this) {
        return function(param) {
          var count, excepworkitem, excepworkitemCounts, handlecounts, list, ringItem, taskItem, workItem, workitemCounts, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
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
          list = _.map(param.data.workitems, function(workitem) {
            return {
              key: 'line',
              val: workitem.val,
              time: workitem.time
            };
          });
          scope.workData = list.concat(_.map(param.data.task, function(task) {
            return {
              key: 'bar',
              val: task.val,
              time: task.time
            };
          }));
          count = 0;
          handlecounts = 0;
          _ref = param.data.task;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            taskItem = _ref[_i];
            if (!(_.isEmpty(taskItem.phase))) {
              handlecounts += taskItem.val;
            }
            count += taskItem.val;
          }
          workitemCounts = 0;
          _ref1 = param.data.workitems;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            workItem = _ref1[_j];
            workitemCounts += workItem.val;
          }
          excepworkitemCounts = 0;
          _ref2 = param.data.excepworkitems;
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            excepworkitem = _ref2[_k];
            excepworkitemCounts += excepworkitem.val;
          }
          _ref3 = scope.rignData;
          for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
            ringItem = _ref3[_l];
            if (ringItem.type === "handling") {
              ringItem.val = handlecounts;
              ringItem.title += ": " + handlecounts;
            } else if (ringItem.type === "allworkitems") {
              ringItem.val = workitemCounts;
              ringItem.title += ": " + workitemCounts;
            } else if (ringItem.type === "execepequips") {
              ringItem.val = excepworkitemCounts;
              ringItem.title += ": " + excepworkitemCounts;
            }
          }
          if (scope.count !== count) {
            scope.count = count;
          }
          param = {
            series: scope.workSeries,
            data: scope.workData,
            date: scope.date
          };
          return _this.createChartOption(scope, element, param);
        };
      })(this));
    };

    MobileOnSiteInspectionDirective.prototype.createChartOption = function(scope, element, param) {
      var countMax, dates, e, getSeriesData, multiple, option, seriesData, _data;
      e = element.find('.echarts');
      scope.chart = echarts.init(e[0]);
      option = {
        tooltip: {
          trigger: "axis",
          padding: [4, 8]
        },
        legend: {
          selectedMode: false,
          data: [],
          right: 0,
          top: 0,
          textStyle: {
            color: "rgb(167, 182, 204)"
          }
        },
        grid: {
          top: "20%",
          bottom: "14%"
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {
            color: "#A6A6A6"
          },
          axisLine: {
            lineStyle: {
              color: "#F0F3F4"
            }
          },
          splitLine: {
            show: false
          }
        },
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
          }, {
            type: 'value',
            scale: true,
            min: 0,
            max: 50,
            axisLabel: {
              color: "#A6A6A6"
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
        series: []
      };
      multiple = 1;
      getSeriesData = (function(_this) {
        return function(data, dates, key) {
          var list, _i, _ref, _results;
          list = _.map((function() {
            _results = [];
            for (var _i = 1, _ref = dates.length; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--){ _results.push(_i); }
            return _results;
          }).apply(this), function(d) {
            return 0;
          });
          _.each(_.filter(data, function(d) {
            return d.key === key;
          }), function(d) {
            var index;
            index = dates.indexOf(d.time);
            if (index !== -1) {
              return list[index] = d.val;
            }
          });
          return list;
        };
      })(this);
      dates = param.date;
      option.tooltip.formatter = (function(_this) {
        return function(d) {
          var html;
          html = d[0].name + "<br />";
          _.each(d, function(n) {
            if (n.seriesName !== "background") {
              return html += n.marker + n.seriesName + ": " + n.data + "<br />";
            }
          });
          return html;
        };
      })(this);
      option.xAxis.data = dates;
      _data = param.data;
      countMax = _.mapObject(_.groupBy(_data, function(d) {
        return d.key;
      }), (function(_this) {
        return function(n) {
          var max;
          max = _.max(n, function(m) {
            return m.val;
          }).val;
          if (max < 10) {
            return 10;
          }
          return Math.ceil(max / 50) * 50;
        };
      })(this));
      option.yAxis[0].max = countMax.bar ? countMax.bar : 500;
      option.yAxis[0].interval = countMax.bar ? countMax.bar / 5 : 100;
      option.yAxis[1].max = countMax.line ? countMax.line : 50;
      option.yAxis[1].interval = countMax.bar ? countMax.line / 5 : 10;
      if (_.has(countMax, "bar") && _.has(countMax, "line") && (countMax != null ? countMax.line : void 0) > 0) {
        multiple = countMax.bar / countMax.line;
      } else {
        multiple = 1;
      }
      seriesData = _.map(param.series, (function(_this) {
        return function(s) {
          return {
            type: s.key,
            name: s.name,
            data: getSeriesData(_data, dates, s.key),
            color: s.color
          };
        };
      })(this));
      _.each(seriesData, (function(_this) {
        return function(item, index) {
          if (item.type === "bar") {
            seriesData[index].stack = 'bar';
            return seriesData.push({
              name: "background",
              type: 'bar',
              color: "rgba(120, 139, 221, 0.6)",
              stack: 'bar',
              data: _.map(item.data, function(d) {
                return countMax.bar - d;
              }),
              barWidth: "50%"
            });
          } else if (item.type === "line") {
            return seriesData[index].data = _.map(item.data, function(d) {
              return multiple * d;
            });
          }
        };
      })(this));
      option.series = seriesData;
      option.legend.data = _.map(param.series, function(d) {
        var item;
        item = {
          name: d.name,
          textStyle: {
            color: d.color
          }
        };
        if (d.key === "bar") {
          item.icon = "circle";
        }
        return item;
      });
      option.tooltip.formatter = (function(_this) {
        return function(d) {
          var html;
          html = d[0].name + "<br />";
          html += d[0].marker + d[0].seriesName + ":" + d[0].value + "<br />";
          html += d[1].marker + d[1].seriesName + ":" + d[1].value / multiple;
          return html;
        };
      })(this);
      return scope.chart.setOption(option);
    };

    MobileOnSiteInspectionDirective.prototype.resize = function(scope) {};

    MobileOnSiteInspectionDirective.prototype.dispose = function(scope) {};

    return MobileOnSiteInspectionDirective;

  })(base.BaseDirective);
  return exports = {
    MobileOnSiteInspectionDirective: MobileOnSiteInspectionDirective
  };
});
