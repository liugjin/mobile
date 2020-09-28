
/*
* File: bar-timeline-directive
* User: David
* Date: 2019/12/26
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", "echarts"], function(base, css, view, _, moment, echart) {
  var BarTimelineDirective, exports;
  BarTimelineDirective = (function(_super) {
    var option;

    __extends(BarTimelineDirective, _super);

    option = {
      grid: {
        right: 5,
        bottom: 30,
        left: 30
      },
      legend: {
        data: [],
        selectedMode: false,
        top: 10,
        right: 0,
        icon: "circle",
        textStyle: {
          color: "rgb(167, 182, 204)"
        }
      },
      tooltip: {
        trigger: "axis",
        padding: [4, 8]
      },
      xAxis: {
        type: 'category',
        data: [],
        axisLabel: {
          color: "rgb(162, 202, 248)"
        },
        axisLine: {
          lineStyle: {
            color: "rgba(0, 77, 160)"
          }
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        axisLabel: {
          color: "rgb(162, 202, 248)"
        },
        axisLine: {
          lineStyle: {
            color: "rgba(0, 77, 160)"
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ['rgba(0, 77, 160)'],
            width: 1,
            type: 'solid'
          }
        }
      },
      series: []
    };

    function BarTimelineDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "bar-timeline";
      BarTimelineDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    BarTimelineDirective.prototype.setScope = function() {};

    BarTimelineDirective.prototype.setCSS = function() {
      return css;
    };

    BarTimelineDirective.prototype.setTemplate = function() {
      return view;
    };

    BarTimelineDirective.prototype.show = function(scope, element, attrs) {
      var getSeriesData, updateChart;
      if (!scope.firstload) {
        return;
      }
      scope.barChart = new echart.init(element.find(".bar-canvas")[0]);
      scope.barChart.on('click', (function(_this) {
        return function(params) {
          if ((params != null ? params.seriesName : void 0) === "故障工单") {
            return _this.publishEventBus("bartimeline-defecttask", {
              id: "defecttaskinfos"
            });
          }
        };
      })(this));
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
      updateChart = (function(_this) {
        return function(option, param) {
          var dates;
          dates = param.date;
          option.xAxis.data = dates;
          scope.data = param.data;
          option.series = _.map(param.series, function(s) {
            return {
              type: 'bar',
              name: s.name,
              data: getSeriesData(scope.data, dates, s.key),
              color: s.color
            };
          });
          option.legend.data = _.map(param.series, function(d) {
            return d.name;
          });
          return scope.barChart.setOption(option);
        };
      })(this);
      return scope.$watch("parameters", (function(_this) {
        return function(param) {
          if (!param) {
            return;
          }
          return updateChart(option, param);
        };
      })(this));
    };

    BarTimelineDirective.prototype.resize = function(scope) {
      return scope.barChart.resize();
    };

    BarTimelineDirective.prototype.dispose = function(scope) {};

    return BarTimelineDirective;

  })(base.BaseDirective);
  return exports = {
    BarTimelineDirective: BarTimelineDirective
  };
});
