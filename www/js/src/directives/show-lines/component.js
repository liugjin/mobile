
/*
* File: show-lines-directive
* User: David
* Date: 2019/12/28
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "echarts"], function(base, css, view, _, echart) {
  var ShowLinesDirective, exports, option;
  option = {
    color: ["#00BFFF", "#2CD057"],
    grid: {
      right: 30,
      bottom: 30,
      left: 30
    },
    tooltip: {
      trigger: "axis",
      show: true,
      padding: [4, 8]
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
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
    yAxis: [
      {
        type: 'value',
        scale: true,
        max: 500,
        min: 0,
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
      }, {
        type: 'value',
        scale: true,
        max: 50,
        min: 0,
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
      }
    ],
    series: []
  };
  ShowLinesDirective = (function(_super) {
    __extends(ShowLinesDirective, _super);

    function ShowLinesDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "show-lines";
      ShowLinesDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    ShowLinesDirective.prototype.setScope = function() {};

    ShowLinesDirective.prototype.setCSS = function() {
      return css;
    };

    ShowLinesDirective.prototype.setTemplate = function() {
      return view;
    };

    ShowLinesDirective.prototype.show = function(scope, element, attrs) {
      var getSeries, map, nameMap;
      scope.lineChart = echart.init(element.find(".canvas-lines")[0]);
      map = [["#00BFFF", "#00bfffcc", "#00bfff1a"], ["#2CD057", "#2cd057cc", "#2cd0571a"]];
      nameMap = {};
      getSeries = (function(_this) {
        return function(d, i, count) {
          var series, _i, _results;
          nameMap[d.key] = d.name;
          series = {
            name: d.key,
            showSymbol: false,
            data: _.map((function() {
              _results = [];
              for (var _i = 1; 1 <= count ? _i <= count : _i >= count; 1 <= count ? _i++ : _i--){ _results.push(_i); }
              return _results;
            }).apply(this), function(d) {
              return 0;
            }),
            type: 'line',
            smooth: true,
            lineStyle: {
              color: map[i][0]
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: map[i][1]
                  }, {
                    offset: 1,
                    color: map[i][2]
                  }
                ],
                global: false
              }
            }
          };
          return series;
        };
      })(this);
      return scope.$watch("parameters", (function(_this) {
        return function(param) {
          var countMax, multiple, _data;
          if (!param) {
            return;
          }
          option.xAxis.data = param.date;
          option.series = _.map(param.series, function(d, i) {
            return getSeries(d, i, param.date.length);
          });
          _data = param.data;
          countMax = _.mapObject(_.groupBy(_data, function(d) {
            return d.key;
          }), function(n) {
            var max;
            max = _.max(n, function(m) {
              return m.val;
            }).val;
            if (max < 10) {
              return 10;
            }
            return Math.round(max / 100) * 100;
          });
          option.yAxis[0].max = countMax[option.series[0].name] ? countMax[option.series[0].name] : 500;
          option.yAxis[1].max = countMax[option.series[1].name] ? countMax[option.series[1].name] : 50;
          multiple = option.yAxis[0].max / option.yAxis[1].max;
          _.each(option.series, function(series, index) {
            return option.series[index].data = _.map(param.date, function(m) {
              var item;
              item = _.find(param.data, function(d) {
                return d.key === series.name && d.time === m;
              });
              if (item) {
                return item.val;
              } else {
                return 0;
              }
            });
          });
          option.tooltip.formatter = function(d) {
            var html;
            html = d[0].name + "<br />";
            _.each(d, function(n) {
              return html += n.marker + nameMap[n.seriesName] + ": " + n.data + "<br />";
            });
            return html;
          };
          return scope.lineChart.setOption(option);
        };
      })(this));
    };

    ShowLinesDirective.prototype.resize = function(scope) {
      return scope.lineChart.resize();
    };

    ShowLinesDirective.prototype.dispose = function(scope) {};

    return ShowLinesDirective;

  })(base.BaseDirective);
  return exports = {
    ShowLinesDirective: ShowLinesDirective
  };
});
