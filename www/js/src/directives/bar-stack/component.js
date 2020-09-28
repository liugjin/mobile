
/*
* File: bar-stack-directive
* User: David
* Date: 2019/12/31
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", "echarts"], function(base, css, view, _, moment, echart) {
  var BarStackDirective, exports;
  BarStackDirective = (function(_super) {
    __extends(BarStackDirective, _super);

    function BarStackDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "bar-stack";
      BarStackDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    BarStackDirective.prototype.setScope = function() {};

    BarStackDirective.prototype.setCSS = function() {
      return css;
    };

    BarStackDirective.prototype.setTemplate = function() {
      return view;
    };

    BarStackDirective.prototype.show = function(scope, element, attrs) {
      var colorArr, option, sumBy;
      if (!scope.firstload) {
        return;
      }
      option = {
        tooltip: {
          trigger: "axis",
          show: true
        },
        grid: {
          containLabel: true,
          left: 0,
          right: 15,
          bottom: 30
        },
        xAxis: {
          splitNumber: 5,
          interval: 20,
          max: 100,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        yAxis: [
          {
            data: ['待处理工单', '异常设备'],
            axisLabel: {
              fontSize: 16,
              color: '#fff'
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
          }, {
            show: false,
            data: ['待处理工单', '异常设备'],
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            type: 'bar',
            name: '',
            stack: '2',
            barWidth: 20,
            itemStyle: {
              normal: {
                color: '#7E47FF'
              },
              emphasis: {
                color: '#7E47FF'
              }
            },
            data: [0, 0]
          }, {
            type: 'bar',
            name: '',
            stack: '2',
            barWidth: 20,
            itemStyle: {
              normal: {
                color: '#FD5916'
              },
              emphasis: {
                color: '#FD5916'
              }
            },
            data: [0, 0]
          }, {
            type: 'bar',
            stack: '2',
            name: '',
            barWidth: 20,
            itemStyle: {
              normal: {
                color: '#01A4F7'
              },
              emphasis: {
                color: '#01A4F7'
              }
            },
            data: [0, 0]
          }
        ]
      };
      scope.echart = new echart.init(element.find(".bar-stack")[0]);
      scope.echart.on('click', (function(_this) {
        return function(params) {
          if (params.name === "待处理工单") {
            return _this.publishEventBus("component-totaltask-handingsheets", {
              id: "component-totaltask-handingsheets"
            });
          } else if (params.name === "异常设备") {
            return _this.publishEventBus("component-totaltask-excepequips", {
              id: "component-totaltask-excepequips"
            });
          }
        };
      })(this));
      colorArr = ['#7E47FF', '#FD5916', '#01A4F7'];
      sumBy = (function(_this) {
        return function(list, key) {
          var sum;
          sum = 0;
          _.each(list, function(d) {
            return sum += d[key];
          });
          return sum;
        };
      })(this);
      return scope.$watch("parameters.data", (function(_this) {
        return function(data) {
          var groups, height, max, width;
          width = $($(element).parent()[0]).innerWidth();
          height = $($(element).parent()[0]).innerHeight();
          scope.echart.resize({
            width: width,
            height: height
          });
          groups = _.map(_.groupBy(data, function(d) {
            return d.stack;
          }), function(d, stack) {
            return stack;
          });
          max = sumBy(data, "val");
          option.xAxis.max = max > 0 ? max : 1;
          option.yAxis[0].data = groups;
          option.yAxis[1].data = groups;
          option.series = _.map(_.groupBy(data, function(d) {
            return d.sort;
          }), function(g, index) {
            var _data;
            _data = _.map(_.sortBy(g, function(j) {
              return groups.indexOf(j.stack);
            }), function(i) {
              return i.val;
            });
            return {
              name: index,
              type: 'bar',
              stack: 'vertical',
              data: _data,
              barWidth: 20,
              itemStyle: {
                normal: {
                  color: colorArr[index]
                },
                emphasis: {
                  color: colorArr[index]
                }
              }
            };
          });
          option.tooltip.formatter = function(n) {
            var html;
            html = n[0].name;
            _.each(n, function(p) {
              var item;
              item = _.find(data, function(q) {
                return q.stack === n[0].name && p.seriesIndex === q.sort;
              });
              return html += "<br />" + p.marker + item.key + ": " + item.val;
            });
            return html;
          };
          return scope.echart.setOption(option);
        };
      })(this));
    };

    BarStackDirective.prototype.resize = function(scope) {
      var height, width;
      width = $($(scope.element).parent()[0]).innerWidth();
      height = $($(scope.element).parent()[0]).innerHeight();
      return scope.echart.resize({
        width: width,
        height: height
      });
    };

    BarStackDirective.prototype.dispose = function(scope) {};

    return BarStackDirective;

  })(base.BaseDirective);
  return exports = {
    BarStackDirective: BarStackDirective
  };
});
