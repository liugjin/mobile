
/*
* File: bar-line-time-directive
* User: David
* Date: 2020/02/12
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", "echarts"], function(base, css, view, _, moment, echart) {
  var BarLineTimeDirective, exports;
  BarLineTimeDirective = (function(_super) {
    var option;

    __extends(BarLineTimeDirective, _super);

    option = {
      tooltip: {
        trigger: "axis",
        padding: [4, 8]
      },
      legend: {
        selectedMode: false,
        data: [],
        right: 0,
        textStyle: {
          color: "rgb(167, 182, 204)"
        }
      },
      grid: {
        right: 30,
        bottom: 30,
        left: 30
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
      yAxis: [
        {
          type: 'value',
          scale: true,
          min: 0,
          max: 200,
          axisLabel: {
            color: "rgb(162, 202, 248)",
            interval: 1
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
          min: 0,
          max: 50,
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

    function BarLineTimeDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "bar-line-time";
      BarLineTimeDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    BarLineTimeDirective.prototype.setScope = function() {};

    BarLineTimeDirective.prototype.setCSS = function() {
      return css;
    };

    BarLineTimeDirective.prototype.setTemplate = function() {
      return view;
    };

    BarLineTimeDirective.prototype.show = function(scope, element, attrs) {
      var getSeriesData, multiple, updateChart;
      if (!scope.firstload) {
        return;
      }
      multiple = 1;
      scope.chart = new echart.init(element.find(".bar-line-canvas")[0]);
      scope.chart.on('click', (function(_this) {
        return function(params) {
          console.info(params);
          if ((params != null ? params.seriesType : void 0) === "bar") {
            return _this.publishEventBus("showrings-plantask", {
              id: "allplantasks"
            });
          } else if ((params != null ? params.seriesType : void 0) === "line") {
            return _this.publishEventBus("showrings-plantask", {
              id: "allworkitems"
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
          var countMax, dates, seriesData, _data;
          dates = param.date;
          option.tooltip.formatter = function(d) {
            var html;
            html = d[0].name + "<br />";
            _.each(d, function(n) {
              if (n.seriesName !== "background") {
                return html += n.marker + n.seriesName + ": " + n.data + "<br />";
              }
            });
            return html;
          };
          option.xAxis.data = dates;
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
            return Math.ceil(max / 50) * 50;
          });
          option.yAxis[0].max = countMax.bar ? countMax.bar : 500;
          option.yAxis[0].interval = countMax.bar ? countMax.bar / 5 : 100;
          option.yAxis[1].max = countMax.line ? countMax.line : 50;
          option.yAxis[1].interval = countMax.bar ? countMax.line / 5 : 10;
          if (_.has(countMax, "bar") && _.has(countMax, "line") && (countMax != null ? countMax.line : void 0) > 0) {
            multiple = countMax.bar / countMax.line;
          } else {
            multiple = 1;
          }
          seriesData = _.map(param.series, function(s) {
            return {
              type: s.key,
              name: s.name,
              data: getSeriesData(_data, dates, s.key),
              color: s.color
            };
          });
          _.each(seriesData, function(item, index) {
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
          });
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
          option.tooltip.formatter = function(d) {
            var html;
            html = d[0].name + "<br />";
            html += d[0].marker + d[0].seriesName + ":" + d[0].value + "<br />";
            html += d[1].marker + d[1].seriesName + ":" + d[1].value / multiple;
            return html;
          };
          return scope.chart.setOption(option);
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

    BarLineTimeDirective.prototype.resize = function(scope) {
      return scope.chart.resize();
    };

    BarLineTimeDirective.prototype.dispose = function(scope) {};

    return BarLineTimeDirective;

  })(base.BaseDirective);
  return exports = {
    BarLineTimeDirective: BarLineTimeDirective
  };
});
